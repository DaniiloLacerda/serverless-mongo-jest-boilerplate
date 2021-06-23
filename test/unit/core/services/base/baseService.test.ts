import { MovieRepository } from '@repositories/movie.repository';
import { MovieService } from '@services/movie.service';
import { JWTHelper } from '@utils/jwtHelper';
import { StatusCodes } from 'http-status-codes';

jest.spyOn(JWTHelper, 'getUserId').mockReturnValue('userId');

describe('Base Service', () => {
  let repository: MovieRepository;

  beforeAll(() => {
    repository = new MovieRepository();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('find', () => {
    jest.spyOn(repository, 'find').mockReturnValue('findReturn' as any);

    const service = new MovieService(repository);
    const result = service.find('condition');

    expect(result).toEqual('findReturn');
    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(repository.find).toHaveBeenCalledWith('condition');
  });

  it('findOne', () => {
    jest.spyOn(repository, 'findOne').mockReturnValue('findOne' as any);

    const service = new MovieService(repository);
    const result = service.findOne('condition');

    expect(result).toEqual('findOne');
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith('condition');
  });

  it('create', () => {
    jest.spyOn(repository, 'create').mockReturnValue('createReturn' as any);

    const service = new MovieService(repository);
    service.create({ body: { foo: 'foo' } });

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({ foo: 'foo', userId: 'userId' });
  });

  it('createMany', () => {
    jest.spyOn(repository, 'createMany').mockReturnValue('createManyReturn' as any);

    const service = new MovieService(repository);
    const result = service.createMany('condition');

    expect(result).toEqual('createManyReturn');
    expect(repository.createMany).toHaveBeenCalledTimes(1);
    expect(repository.createMany).toHaveBeenCalledWith('condition');
  });

  it('getAll', () => {
    jest.spyOn(repository, 'getAll').mockReturnValue('getAllReturn' as any);

    const service = new MovieService(repository);
    const result = service.getAll('event');

    expect(result).toEqual('getAllReturn');
    expect(repository.getAll).toHaveBeenCalledTimes(1);
    expect(repository.getAll).toHaveBeenCalledWith({ active: true });
  });

  it('updateById', async () => {
    jest.spyOn(repository, 'updateById').mockReturnValue('updateByIdReturn' as any);
    jest.spyOn(repository, 'findOne').mockResolvedValue('findOneReturn' as any);

    const service = new MovieService(repository);
    const result = await service.updateById('id', 'item');

    expect(result).toEqual('updateByIdReturn');
    expect(repository.updateById).toHaveBeenCalledTimes(1);
    expect(repository.updateById).toHaveBeenCalledWith('id', 'item');
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
  });

  it('updateById: when do not find some data to do update', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(repository, 'updateById').mockReturnValue('updateByIdReturn' as any);

    const service = new MovieService(repository);
    try {
      await service.updateById('id', 'item');
    } catch (error) {
      expect(error).toEqual({
        contentType: 'application/json',
        data: { errorMessage: 'Entidade não encontrada(o).' },
        statusCode: StatusCodes.BAD_REQUEST
      });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
      expect(repository.updateById).toHaveBeenCalledTimes(0);
    }
  });

  it('deactivate', async () => {
    jest.spyOn(repository, 'deactivate').mockReturnValue('deactivateReturn' as any);
    jest.spyOn(repository, 'findOne').mockResolvedValue('findOneReturn' as any);

    const service = new MovieService(repository);
    const result = await service.deactivate('id');

    expect(result).toEqual('deactivateReturn');
    expect(repository.deactivate).toHaveBeenCalledTimes(1);
    expect(repository.deactivate).toHaveBeenCalledWith('id', { active: false });
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
  });

  it('deactivate: when do not find some data to do update', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(repository, 'deactivate').mockReturnValue('deactivateReturn' as any);

    const service = new MovieService(repository);
    try {
      await service.deactivate('id');
    } catch (error) {
      expect(error).toEqual({
        contentType: 'application/json',
        data: { errorMessage: 'Entidade não encontrada(o).' },
        statusCode: StatusCodes.BAD_REQUEST
      });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
      expect(repository.updateById).toHaveBeenCalledTimes(0);
    }
  });

  it('deleteMany', async () => {
    jest.spyOn(repository, 'deleteMany').mockReturnValue('deleteManyReturn' as any);

    const service = new MovieService(repository);
    const result = await service.deleteMany(['id01', 'id02']);

    expect(result).toEqual('deleteManyReturn');
    expect(repository.deleteMany).toHaveBeenCalledTimes(1);
    expect(repository.deleteMany).toHaveBeenCalledWith(['id01', 'id02']);
  });
});
