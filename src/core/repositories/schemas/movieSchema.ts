import { IMovie, MovieTypeEnum } from '@interfaces/models/movie.interface';
import { model, Model, models, Schema } from 'mongoose';

export class Movie {
  private _model: Model<IMovie>;

  private movieSchema = new Schema(
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
        enum: [MovieTypeEnum.MOVIE, MovieTypeEnum.SERIE],
        default: MovieTypeEnum.MOVIE
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
    this._model = models.Movie || model<IMovie>('Movie', this.movieSchema);
  }

  public get model(): Model<IMovie> {
    return this._model;
  }
}
