import { Database } from '@config/db';
import mongoose from 'mongoose';

jest
  .spyOn(mongoose, 'connect')
  .mockResolvedValue({ connections: [{ readyState: true }] } as any);

describe('Database', () => {
  beforeEach(() => {
    process.env.DB_NAME = 'DB_NAME';
    process.env.DB_URL = 'DB_URL';
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.DB_NAME;
    delete process.env.DB_URL;
  });

  it('createConnection: should create connection', async () => {
    const database = new Database();
    await database.createConnection();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenLastCalledWith('DB_URL', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'DB_NAME'
    });
  });

  it('createConnection: should return a connection', async () => {
    const database = new Database();
    await database.createConnection();
    await database.createConnection();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenLastCalledWith('DB_URL', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'DB_NAME'
    });
  });
});
