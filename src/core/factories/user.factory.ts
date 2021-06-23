import { UserRepository } from '@repositories/user.repository';
import { UserService } from '@services/user.service';

export class UserFactory {
  static createInstance() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    return service;
  }
}
