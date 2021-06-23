import { UserRepository } from '@repositories/user.repository';
import { CONTENT_TYPE_JSON, VALUE_NOT_FOUND } from '@utils/constants';
import { Password } from '@utils/password';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../interfaces/models/user.interface';
import { BaseService } from './base/baseService';

export class UserService extends BaseService<IUser> {
  constructor(public repository: UserRepository) {
    super(repository);
  }

  async create(event) {
    const item = event.body;
    item.password = Password.encode(item.password);
    return super.create(item);
  }

  async changePassword(id, oldPassword, newPassword) {
    const user: IUser = await this.findOne({ _id: id });

    if (!user) {
      throw {
        statusCode: StatusCodes.NOT_FOUND,
        contentType: CONTENT_TYPE_JSON,
        data: { errorMessage: VALUE_NOT_FOUND('Usuário') }
      };
    }

    if (user.password !== Password.encode(oldPassword)) {
      throw {
        statusCode: StatusCodes.NOT_ACCEPTABLE,
        contentType: CONTENT_TYPE_JSON,
        data: { errorMessage: 'senha antiga incorreta' }
      };
    }

    user.password = Password.encode(newPassword);
    return await this.updateById(id, user);
  }
}
