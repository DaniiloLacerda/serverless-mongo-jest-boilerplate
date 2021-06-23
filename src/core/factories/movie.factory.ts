import { MovieRepository } from '@repositories/movie.repository';
import { MovieService } from '@services/movie.service';

export class MovieFactory {
  static createInstance() {
    const repository = new MovieRepository();
    const service = new MovieService(repository);
    return service;
  }
}
