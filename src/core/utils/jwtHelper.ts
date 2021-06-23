import { Environment } from '@config/environment';
import { TokenDecode } from '@interfaces/requests/token-decode-interface';
import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from './constants';

export class JWTHelper {
  private static getConfigs() {
    return {
      secret: JWT_SECRET,
      exp: Math.floor(Date.now() / 1000) + 180 * 60
    };
  }

  static decode(token: string): TokenDecode {
    try {
      const { secret } = JWTHelper.getConfigs();

      return verify(token, secret) as TokenDecode;
    } catch (e) {
      return null;
    }
  }

  static encode(payload: any) {
    const { secret, exp } = JWTHelper.getConfigs();

    const token = sign({ data: payload, exp }, secret);

    return { token, exp };
  }

  static isValid(token: any) {
    const data = JWTHelper.decode(token) as any;

    if (!data) return false;

    const now = Date.now() / 1000;
    return data.exp > now;
  }

  static getUserId(event) {
    const { data } = this.decode(event.headers.Authorization) as any;

    return data._id;
  }

  static isUserDefault(username: string, password: string): boolean {
    return (
      Environment.getSettings().userDefault === username &&
      Environment.getSettings().passDefault === password
    );
  }
}
