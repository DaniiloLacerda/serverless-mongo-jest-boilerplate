import { Schema, model, Model, models } from 'mongoose';
import { IUser } from 'src/core/interfaces/models/user.interface';

export class User {
  private _model: Model<IUser>;

  private userSchema = new Schema(
    {
      active: {
        type: Boolean,
        required: false,
        default: true
      },
      name: {
        type: String,
        required: false,
        unique: false
      },
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        unique: false
      }
    },
    {
      timestamps: true
    }
  );

  constructor() {
    this._model = models.User || model<IUser>('User', this.userSchema);
  }

  public get model(): Model<IUser> {
    return this._model;
  }
}
