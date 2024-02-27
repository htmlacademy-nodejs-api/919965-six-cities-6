import { AmenityType, CityType, HousingType, Location } from '../../../types/index.js';

export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public city?: CityType;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: HousingType;
  public roomsCount?: number;
  public maxGuests?: number;
  public price?: number;
  public amenities?: AmenityType[];
  public hostId?: string;
  public location?: Location;
}
