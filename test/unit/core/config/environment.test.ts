import { Environment } from '@config/environment';

describe('Environment', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'NODE_ENV';
    process.env.DB_NAME = 'DB_NAME';
    process.env.DB_URL = 'DB_URL';
    process.env.USER_DEFAULT = 'admin';
    process.env.PASS_DEFAULT = 'admin';
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.DB_NAME;
    delete process.env.DB_URL;
    delete process.env.USER_DEFAULT;
    delete process.env.PASS_DEFAULT;
  });
  it('getSettings: should return environments', () => {
    const result = Environment.getSettings();
    expect(result).toEqual({
      nodeEnv: 'NODE_ENV',
      dbUrl: 'DB_URL',
      dbName: 'DB_NAME',
      userDefault: 'admin',
      passDefault: 'admin'
    });
  });
});
