import { AmenityType, CityType, HousingType, Offer, User } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    publishDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCount,
    maxGuests,
    price,
    amenities,
    hostName,
    email,
    avatarPath,
    password,
    userType,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  return {
    name,
    description,
    publishDate: new Date(publishDate),
    city: city as CityType,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    type: type as HousingType,
    roomsCount: Number(roomsCount),
    maxGuests: Number(maxGuests),
    price: Number(price),
    amenities: amenities.split(';') as AmenityType[],
    host: { name: hostName, email, avatarPath, password, type: userType } as User,
    commentsCount: Number(commentsCount),
    location: { latitude: Number(latitude), longitude: Number(longitude) },
  };
}
