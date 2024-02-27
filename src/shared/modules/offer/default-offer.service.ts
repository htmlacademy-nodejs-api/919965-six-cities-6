import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import {
  CreateOfferDto,
  UpdateOfferDto,
  OfferEntity,
  OfferService,
  DEFAULT_OFFER_COUNT,
  MAX_PREMIUM_OFFERS_COUNT,
} from './index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(count = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
              { $project: { _id: 1 } },
            ],
            as: 'comments',
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
            commentsAmount: { $size: '$comments' },
          },
        },
        {
          $unset: 'comments',
        },
        {
          $limit: count,
        },
      ])
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).populate('authorId').exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentsAmount: 1,
        },
      })
      .exec();
  }


  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async findPremium(cityId: string, count = MAX_PREMIUM_OFFERS_COUNT): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ isPremium: true, cityId }).limit(count).sort({ publishDate: SortType.Down }).exec();
  }
}
