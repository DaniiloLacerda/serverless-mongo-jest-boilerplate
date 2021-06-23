import { Password } from '@utils/password';
import md5 from 'md5';

jest.mock('md5', () => jest.fn(() => 'passwordWithDecode'));

describe('Password', () => {
  it('encode: should return password encode', () => {
    const result = Password.encode('password');
    expect(result).toEqual('passwordWithDecode');
    expect(md5).toHaveBeenCalledTimes(1);
  });
});
