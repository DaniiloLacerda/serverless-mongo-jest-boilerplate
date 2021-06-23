import { MovieFactory } from '@factories/movie.factory';

describe('Category Factory', () => {
  it('Create Instance ', () => {
    const service = MovieFactory.createInstance();
    expect(service).toBeDefined();
  });
});
