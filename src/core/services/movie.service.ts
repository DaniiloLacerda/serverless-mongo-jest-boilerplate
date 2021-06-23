import { IMovie } from '@interfaces/models/movie.interface';
import { MovieRepository } from '@repositories/movie.repository';
import { JWTHelper } from '@utils/jwtHelper';
import { BaseService } from './base/baseService';

export class MovieService extends BaseService<IMovie> {
  constructor(repository: MovieRepository) {
    super(repository);
  }

  async create(event) {
    const movie: IMovie = event.body;
    movie.userId = JWTHelper.getUserId(event);

    return super.create(movie);
  }
}
