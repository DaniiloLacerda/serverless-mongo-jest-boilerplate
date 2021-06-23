import { Document, Model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IMovie extends Document {
  active?: boolean;
  name: string;
  gender: string;
  producer: string;
  type: MovieTypeEnum;
  userId: ObjectId;
}

export enum MovieTypeEnum {
  MOVIE,
  SERIE
}

export interface MovieModel extends Model<IMovie> {}
