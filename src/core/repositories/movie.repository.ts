import { IMovie } from '@interfaces/models/movie.interface';
import { BaseRepository } from './base/base.repository';
import { Movie } from './schemas/movieSchema';

export class MovieRepository extends BaseRepository<IMovie> {
  constructor() {
    const user = new Movie();
    super(user.model);
  }
}
