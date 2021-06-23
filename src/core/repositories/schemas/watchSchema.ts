import { IWatch, WatchTypeEnum } from '@interfaces/models/watch.interface';
import { model, Model, models, Schema } from 'mongoose';

export class Watch {
  private _model: Model<IWatch>;

  private watchSchema = new Schema(
    {
      active: {
        type: Boolean,
        required: false,
        default: true
      },
      name: {
        type: String,
        required: true,
        unique: false
      },
      gender: {
        type: String,
        required: true,
        unique: false
      },
      producer: {
        type: String,
        required: true,
        unique: false
      },
      type: {
        type: String,
        required: false,
        enum: [WatchTypeEnum.MOVIE, WatchTypeEnum.SERIE],
        default: WatchTypeEnum.MOVIE
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  constructor() {
    this._model = models.Watch || model<IWatch>('Watch', this.watchSchema);
  }

  public get model(): Model<IWatch> {
    return this._model;
  }
}
