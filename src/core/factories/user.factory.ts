import { UserRepository } from '@repositories/userRepository';
import { UserService } from '@services/user.service';

export class UserFactory {
  static createInstance() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    return service;
  }
}
