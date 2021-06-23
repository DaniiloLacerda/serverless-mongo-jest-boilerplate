import { Document, Model } from 'mongoose';

export interface IWatch extends Document {
  active?: boolean;
  name: string;
  gender: string;
  producer: string;
  type: WatchTypeEnum;
  userId: string;
}

export enum WatchTypeEnum {
  MOVIE,
  SERIE
}

export interface WatchModel extends Model<IWatch> {}
