import { AmenityType, CityType, HousingType, Location } from '../../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public publishDate: Date;
  public city: CityType;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: HousingType;
  public roomsCount: number;
  public maxGuests: number;
  public price: number;
  public amenities: AmenityType[];
  public hostId: string;
  public commentsCount: number;
  public location: Location;
}
