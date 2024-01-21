import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';
import { CityType } from './city-type.enum.js';
import { AmenityType } from './amenity-type.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  name: string;
  description: string;
  publishDate: Date;
  city: CityType;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  roomsCount: number;
  maxGuests: number;
  price: number;
  amenities: AmenityType[];
  host: User;
  commentsCount: number;
  location: Location;
};
