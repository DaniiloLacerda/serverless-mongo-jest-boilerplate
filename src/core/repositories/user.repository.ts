import { IUser } from '@interfaces/models/user.interface';
import { BaseRepository } from './base/base.repository';
import { User } from './schemas/userSchema';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    const user = new User();
    super(user.model);
  }
}
