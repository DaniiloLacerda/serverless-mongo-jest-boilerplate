import { JWTHelper } from '@utils/jwtHelper';

const payload = { userName: 'Danilo Lacerda', _id: 'userId' };
const tokens = {
  expired:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiRGFuaWxvIExhY2VyZGEiLCJhZ2UiOjI4fSwiZXhwIjoxNjIyNTUzNjMwLCJpYXQiOjE2MjI1NDI4MzB9.bpbxCmLZAuiO6H4JiCA9MdvrfEHSPOU_VOoK4b8I4Sc',
  valid:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiRGFuaWxvIExhY2VyZGEiLCJfaWQiOiJ1c2VySWQifSwiZXhwIjoxNjIyODEyODMwLCJpYXQiOjE2MjI4MDIwMzB9.POWHAr0rPo-kkWN_PXJYrMCkfBFv_nenavJ2b761akg',
  invalid:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiRGFuaWxvIExhY2VyZGEiLCJhZ2UiOjI4fSwiZXhwIjoxNjIyODEyODMwLCJpYXQiOjE2MjI4MDIwMzB9.jT_vDu41Jy3FA_7cxgClmZnY3vYB8uHX4sXgD2FyZ4o'
};

const realDate = Date.now;

describe('JWT Helper', () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-06-04T10:20:30Z').getTime());
    process.env.USER_DEFAULT = 'admin';
    process.env.PASS_DEFAULT = 'admin';
  });

  afterAll(() => {
    global.Date.now = realDate;
    delete process.env.USER_DEFAULT;
    delete process.env.PASS_DEFAULT;
  });

  it('encode JWT: should return token', () => {
    const { token } = JWTHelper.encode(payload);
    expect(token).toEqual(tokens.valid);
  });

  it('decode JWT', () => {
    const { data } = JWTHelper.decode(tokens.valid) as any;
    expect(data).toEqual(payload);
  });

  it('isValid: Check Token isValid = true', () => {
    const isValid = JWTHelper.isValid(tokens.valid);
    expect(isValid).toBeTruthy();
  });

  it('isValid: Token isValid = false', () => {
    const isValid = JWTHelper.isValid(tokens.expired);
    expect(isValid).toBeFalsy();
  });

  it('isValid: Invalid Token', () => {
    const isValid = JWTHelper.isValid(tokens.invalid);
    expect(isValid).toBeFalsy();
  });

  it('getUserId', () => {
    const event = {
      headers: {
        Authorization: tokens.valid
      }
    };
    const result = JWTHelper.getUserId(event);
    expect(result).toEqual('userId');
  });

  it('isUserDefault', () => {
    const result = JWTHelper.isUserDefault('admin', 'admin');
    expect(result).toBeTruthy();
  });
});
