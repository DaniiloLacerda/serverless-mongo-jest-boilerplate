import { Database } from '@config/db';
import { MovieFactory } from '@factories/movie.factory';
import { create, destroy, find, index, update } from '@functions/movie.functions';
import { IHandlerReturn } from '@interfaces/responses/handlerSuccess.interface';
import { indexFakeEvent, showFakeEvent } from '@test/helpers/mocks';
import { ITEM_DELETED, ITEM_UPDATED } from '@utils/constants';
import { JWTHelper } from '@utils/jwtHelper';
import { StatusCodes } from 'http-status-codes';

const createConnectionMock = jest.fn().mockReturnValue('ok');
jest.mock('@config/db', () => {
  return {
    Database: jest.fn().mockImplementation(() => {
      return {
        createConnection: createConnectionMock
      };
    })
  };
});

jest.spyOn(JWTHelper, 'getUserId').mockReturnValue('userId');

const productsList = {
  name: 'name',
  gender: 'gender',
  producer: 'producer'
};

describe('Movie Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('create: should create a new movie ', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      create: jest.fn().mockResolvedValue({})
    } as any);

    const createEvent = {
      ...indexFakeEvent,
      body: productsList[0]
    };

    const database = new Database();
    const service = MovieFactory.createInstance();
    const result = (await create(createEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(createEvent);
    expect(result.statusCode).toEqual(StatusCodes.CREATED);
  });

  it('create: should throw new error', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      create: jest.fn().mockRejectedValueOnce('throw error')
    } as any);

    const createEvent = {
      ...indexFakeEvent,
      body: productsList
    };

    const database = new Database();
    const service = MovieFactory.createInstance();
    const result = (await create(createEvent as any, {} as any)) as IHandlerReturn;

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(String(result.body))).toEqual('throw error');
    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('index: should find all movies', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      find: jest.fn().mockResolvedValue({})
    } as any);

    const database = new Database();
    const service = MovieFactory.createInstance();
    const result = (await index(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.find).toHaveBeenCalledTimes(1);
    expect(service.find).toHaveBeenCalledWith({
      active: true,
      userId: 'userId'
    });
    expect(result.statusCode).toEqual(StatusCodes.OK);
  });

  it('index: should throw new error', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      find: jest.fn().mockRejectedValueOnce('throw error')
    } as any);

    const database = new Database();
    const service = MovieFactory.createInstance();
    const result = (await index(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(String(result.body))).toEqual('throw error');
    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.find).toHaveBeenCalledTimes(1);
  });

  it('destroy: should delete a movie', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      deactivate: jest.fn().mockResolvedValue('')
    } as any);

    const service = MovieFactory.createInstance();
    const database = new Database();
    const result = (await destroy(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.deactivate).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(JSON.parse(String(result.body))).toEqual({ message: ITEM_DELETED });
  });

  it('destroy: should throw a error', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      deactivate: jest.fn().mockRejectedValueOnce('throw error')
    } as any);

    const service = MovieFactory.createInstance();
    const database = new Database();
    const result = (await destroy(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.deactivate).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(String(result.body))).toEqual('throw error');
  });

  it('update: should update a movie', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      updateById: jest.fn().mockResolvedValue('')
    } as any);

    const service = MovieFactory.createInstance();
    const database = new Database();
    const result = (await update(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.updateById).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(JSON.parse(String(result.body))).toEqual({ message: ITEM_UPDATED });
  });

  it('update: should throw a error', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      updateById: jest.fn().mockRejectedValueOnce('throw error')
    } as any);

    const service = MovieFactory.createInstance();
    const database = new Database();
    const result = (await update(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.updateById).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(String(result.body))).toEqual('throw error');
  });

  it('find: should find some movies', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      findOne: jest.fn().mockResolvedValue({})
    } as any);

    const database = new Database();
    const service = MovieFactory.createInstance();
    const result = (await find(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith({
      active: true,
      userId: 'userId',
      _id: '60830b1184b8f20008c6d3fc'
    });
    expect(result.statusCode).toEqual(StatusCodes.OK);
  });

  it('find: should throw new error', async () => {
    jest.spyOn(MovieFactory, 'createInstance').mockReturnValue({
      findOne: jest.fn().mockRejectedValueOnce('throw error')
    } as any);

    const database = new Database();
    const service = MovieFactory.createInstance();
    const result = (await find(showFakeEvent as any, {} as any)) as IHandlerReturn;

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(String(result.body))).toEqual('throw error');
    expect(database.createConnection).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });
});
