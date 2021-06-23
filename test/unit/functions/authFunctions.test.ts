import { Database } from '@config/db';
import { Password } from '@utils/password';
import { JWTHelper } from '@utils/jwtHelper';
import { Policy } from '@utils/policy';
import { APIGatewayAuthorizerResult } from 'aws-lambda';
import { UserFactory } from '@factories/user.factory';
import { IHandlerReturn } from '@interfaces/responses/handlerSuccess.interface';
import { token, validate } from '@functions/auth.functions';

jest.mock('@utils/password');
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

const event = {
  body: {
    username: 'username',
    password: 'password'
  }
};

const tokens = {
  valid:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjdGl2ZSI6dHJ1ZSwibmFtZSI6IkRhbmlsbyBMYWNlcmRhIiwidXNlcm5hbWUiOiJkYW5pbG8iLCJjb21wYW55SWQiOiI1ZmRkNjcyMDhkN2EzYTRkY2EwZTAzODciLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTE5VDIyOjMwOjQ2LjY0NFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTE5VDIyOjMwOjQ2LjY0NFoiLCJpZCI6IjYwNTUyNjE2NDBjNWFhMDAwODM5MjE1NSJ9LCJleHAiOjE2MjA2NzAwNDMsImlhdCI6MTYyMDY1OTI0M30.OufB18y5mSpwrubrHfr4URnK1rieBXHIwIH6yUx9Ix0',
  invalid:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjdGl2ZSI6dHJ1ZSwibmFtZSI6IkRhbmlsbyBMYWNlcmRhIiwidXNlcm5hbWUiOiJkYW5pbG8iLCJjb21wYW55SWQiOiI1ZmRkNjcyMDhkN2EzYTRkY2EwZTAzODciLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTE5VDIyOjMwOjQ2LjY0NFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTE5VDIyOjMwOjQ2LjY0NFoiLCJpZCI6IjYwNTUyNjE2NDBjNWFhMDAwODM5MjE1NSJ9LCJleHAiOjE2MjA2MTAwMDAsImlhdCI6MTYyMDY1OTI0M30.91j7vZNg3iVI7tQqw1C7qVQ12ymiDam8OPgBSno8lRAeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvdW50IjoxLCJibG9ja2VkIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJpZCI6IjY5MjJlM2Q1LWE5MWEtNDkzZS1iMTk2LTQwZjY0ZDExZWFmYSIsIm5hbWUiOiJ0ZXN0IiwidXNlck5hbWUiOiJ0ZXN0Iiwic2NvcGVzIjpbImNhbmNlbFJlYXNvbjpyZWFkIiwiY2FuY2VsUmVhc29uOndyaXRlIiwiY2xpZW50OnJlYWQiLCJjbGllbnQ6d3JpdGUiLCJvZmZlcjpyZWFkIiwib2ZmZXI6d3JpdGUiLCJwcm9kdWN0OnJlYWQiLCJwcm9kdWN0OndyaXRlIiwicmVzdHJpY3Rpb246cmVhZCIsInJlc3RyaWN0aW9uOndyaXRlIiwic3Vic2NyaXB0aW9uOnJlYWQiLCJzdWJzY3JpcHRpb246d3JpdGUiLCJ1c2VyOnJlYWQiLCJ1c2VyOndyaXRlIl19LCJleHAiOjE1OTQwNDc5OTUsImlhdCI6MTU5NDA0NDM5NX0.kojR2s_R-fgKfC_-JLNSG6h23EWhcGKKg-S0wNo53Tc'
};

describe('Token: should return ok', () => {
  beforeAll(() => {
    process.env.USER_DEFAULT = 'admin';
    process.env.PASS_DEFAULT = 'admin';
  });

  afterAll(() => {
    createConnectionMock.mockClear();
    delete process.env.USER_DEFAULT;
    delete process.env.PASS_DEFAULT;
  });

  it('token: success login', async () => {
    jest.spyOn(UserFactory, 'createInstance').mockReturnValue({
      findOne: jest.fn().mockResolvedValue({
        toJSON: () => {
          return {
            active: true,
            name: 'Name user',
            username: 'username',
            password: 'password',
            companyId: 'companyId'
          };
        }
      })
    } as any);

    jest.spyOn(Password, 'encode').mockReturnValueOnce('passwordEncrypt');

    const service = UserFactory.createInstance();
    const database = new Database();

    const result = (await token(event as any, {} as any)) as IHandlerReturn;
    expect(result.statusCode).toEqual(200);
    expect(database.createConnection).toBeCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith({
      active: true,
      password: 'passwordEncrypt',
      username: 'username'
    });
  });

  it('token: access unauthorized', async () => {
    jest.spyOn(UserFactory, 'createInstance').mockReturnValue({
      findOne: jest.fn().mockResolvedValue(undefined)
    } as any);

    const service = UserFactory.createInstance();
    const database = new Database();
    jest.spyOn(Password, 'encode').mockReturnValueOnce('passwordEncrypt');

    const result = (await token(event as any, {} as any)) as IHandlerReturn;
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual('"Dados de login inválidos"');
    expect(database.createConnection).toBeCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith({
      active: true,
      password: 'passwordEncrypt',
      username: 'username'
    });
  });

  it('token: return throw error', async () => {
    jest.spyOn(UserFactory, 'createInstance').mockReturnValue({
      findOne: jest.fn(() => {
        throw new Error('');
      })
    } as any);

    const service = UserFactory.createInstance();
    const database = new Database();

    const result = (await token(event as any, {} as any)) as IHandlerReturn;
    expect(result.statusCode).toEqual(500);
    expect(database.createConnection).toBeCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });

  it('token: access with user default', async () => {
    jest.spyOn(UserFactory, 'createInstance').mockReturnValue({
      findOne: jest.fn().mockResolvedValue(undefined),
      create: jest.fn().mockResolvedValue(true)
    } as any);

    jest.spyOn(JWTHelper, 'isUserDefault').mockReturnValueOnce(true);
    jest.spyOn(Password, 'encode').mockReturnValueOnce('passwordEncrypt');

    const service = UserFactory.createInstance();
    const database = new Database();

    const event = { body: { username: 'admin', password: 'admin' } };

    const result = (await token(event as any, {} as any)) as IHandlerReturn;
    expect(result.statusCode).toEqual(200);
    expect(database.createConnection).toBeCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith({
      active: true,
      password: 'passwordEncrypt',
      username: 'admin'
    });
  });

  it('validate: return is valid', async () => {
    jest.spyOn(JWTHelper, 'isValid').mockReturnValue(true);
    jest.spyOn(JWTHelper, 'decode').mockReturnValue({ data: 'some return' } as any);
    const policy = {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: 'resource'
          }
        ]
      },
      context: {}
    };

    const event = { authorizationToken: tokens.valid };
    jest.spyOn(Policy, 'generate').mockReturnValue(policy as APIGatewayAuthorizerResult);

    const result = await validate(event as any);
    expect(result).toEqual(policy);
    expect(JWTHelper.isValid).toHaveBeenCalledTimes(1);
    expect(JWTHelper.isValid).toHaveBeenCalledWith(event.authorizationToken);
    expect(JWTHelper.decode).toHaveBeenCalledTimes(1);
    expect(JWTHelper.decode).toHaveBeenCalledWith(event.authorizationToken);
  });

  it('validate: return is invalid', async () => {
    jest.spyOn(JWTHelper, 'isValid').mockReturnValue(false);
    jest.spyOn(JWTHelper, 'decode').mockReturnValue({ data: 'some return' } as any);
    const policy = {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: 'resource'
          }
        ]
      },
      context: {}
    };

    jest.spyOn(Policy, 'generate').mockReturnValue(policy as APIGatewayAuthorizerResult);
    const event = { authorizationToken: tokens.valid };
    const result = await validate(event as any);

    expect(result).toEqual(policy);
    expect(JWTHelper.isValid).toHaveBeenCalledTimes(1);
    expect(JWTHelper.isValid).toHaveBeenCalledWith(event.authorizationToken);
    expect(JWTHelper.decode).toHaveBeenCalledTimes(1);
    expect(JWTHelper.decode).toHaveBeenCalledWith(event.authorizationToken);
  });

  it('validate: return is invalid without data', async () => {
    jest.spyOn(JWTHelper, 'isValid').mockReturnValue(false);
    jest.spyOn(JWTHelper, 'decode').mockReturnValue('' as any);
    const policy = {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: 'resource'
          }
        ]
      },
      context: {}
    };

    jest.spyOn(Policy, 'generate').mockReturnValue(policy as APIGatewayAuthorizerResult);
    const event = { authorizationToken: tokens.valid };
    const result = await validate(event as any);

    expect(result).toEqual(policy);
    expect(JWTHelper.isValid).toHaveBeenCalledTimes(1);
    expect(JWTHelper.isValid).toHaveBeenCalledWith(event.authorizationToken);
    expect(JWTHelper.decode).toHaveBeenCalledTimes(1);
    expect(JWTHelper.decode).toHaveBeenCalledWith(event.authorizationToken);
  });
});
