import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, CityType, HousingType, AmenityType, RoleType } from '../../types/index.js';
import { getRandomItem, getRandomItems, generateRandomValue } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const IMAGES_COUNT = 6;
const MIN_RATE = 1;
const MAX_RATE = 5;
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;
const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(Object.keys(CityType));
    const previewImage = getRandomItem(this.mockData.images);
    const images = Array.from({ length: IMAGES_COUNT })
      .map(() => getRandomItem(this.mockData.images))
      .join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATE, MAX_RATE);
    const type = getRandomItem(Object.keys(HousingType));
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT);
    const maxGuests = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems(Object.keys(AmenityType)).join(';');
    const host = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const hostType = getRandomItem(Object.keys(RoleType));
    const longitude = generateRandomValue(0, 100, 10);
    const latitude = generateRandomValue(0, 100, 10);

    return [
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
      host,
      email,
      avatarPath,
      password,
      hostType,
      longitude,
      latitude,
    ].join('\t');
  }
}
