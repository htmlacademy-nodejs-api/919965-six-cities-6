import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateCommentDto, CommentEntity, CommentService, DEFAULT_COMMENTS_COUNT } from './index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`Новый комментарий создан: ${dto.text}`);
    return result.populate('authorId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    const result = await this.commentModel
      .find({ offerId })
      .limit(DEFAULT_COMMENTS_COUNT)
      .sort({ createdAt: SortType.Down })
      .populate('authorId')
      .exec();

    this.logger.info(`Комментариев найдено: ${result.length}`);
    return result;
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    this.logger.info(`Комментариев удалено: ${result.deletedCount}`);
    return result.deletedCount;
  }
}
