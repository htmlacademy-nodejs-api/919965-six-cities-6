import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { AmenityType, CityType, HousingType, Offer, User } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter(row => row.trim().length)
      .map(line => line.split('\t'))
      .map(
        ([
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
        ]) => ({
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
        })
      );
  }
}
