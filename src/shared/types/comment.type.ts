import { ScoreType } from './score-type.enum.js';
import { User } from './user.type.js';

export type Comment = {
  text: string;
  publishDate: string;
  rating: ScoreType;
  author: User;
};
