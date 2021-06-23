import { ISettings } from '@interfaces/settings.interface';
import { get as env } from 'env-var';

export class Environment {
  static getSettings(): ISettings {
    return {
      nodeEnv: env('NODE_ENV').asString(),
      dbUrl: env('DB_URL').asString(),
      dbName: env('DB_NAME').asString(),
      userDefault: env('USER_DEFAULT').asString(),
      passDefault: env('PASS_DEFAULT').asString()
    };
  }
}
