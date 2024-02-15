import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { CityType, HousingType, AmenityType, Location } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public publishDate!: Date;

  @prop({ required: true, type: () => String, enum: CityType })
  public city: CityType;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ required: true, type: () => String, enum: HousingType })
  public type: HousingType;

  @prop({ required: true })
  public roomsCount: number;

  @prop({ required: true })
  public maxGuests: number;

  @prop({ required: true })
  public price: number;

  @prop({ required: true, type: () => [String], enum: AmenityType })
  public amenities: AmenityType[];

  @prop({ ref: UserEntity, required: true })
  public hostId!: Ref<UserEntity>;

  @prop({ required: true })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
