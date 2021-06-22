import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  active?: boolean;
  name: string;
  username: string;
  password: string;
}

export interface UserModel extends Model<IUser> {}
