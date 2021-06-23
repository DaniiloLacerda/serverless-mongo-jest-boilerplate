import { UserRepository } from '@repositories/user.repository';
import { UserService } from '@services/user.service';
import { JWTHelper } from '@utils/jwtHelper';
import { Password } from '@utils/password';
import { StatusCodes } from 'http-status-codes';

jest.spyOn(JWTHelper, 'getUserId').mockReturnValue('userId');
jest.spyOn(Password, 'encode').mockReturnValue('passwordEncoded');

describe('User Service', () => {
  let repository: UserRepository;

  beforeAll(() => {
    repository = new UserRepository();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('create', async () => {
    jest.spyOn(repository, 'create').mockReturnValue('createReturn' as any);
    const event = {
      body: {
        name: 'fooName'
      }
    };
    const service = new UserService(repository);

    const result = await service.create(event);
    expect(result).toEqual('createReturn');
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({
      name: 'fooName',
      password: 'passwordEncoded'
    });
  });

  it('changePassword', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue({
      password: 'passwordEncoded'
    } as any);

    jest.spyOn(repository, 'updateById').mockReturnValue('updateByIdReturn' as any);

    const service = new UserService(repository);
    const result = await service.changePassword('id', 'oldPassword', 'newPassword');

    expect(result).toEqual('updateByIdReturn');
    expect(repository.findOne).toHaveBeenCalledTimes(2);
    expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
    expect(repository.updateById).toHaveBeenCalledTimes(1);
    expect(repository.updateById).toHaveBeenCalledWith('id', { password: 'passwordEncoded' });
  });

  it('changePassword: when did not found user on database', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(undefined);
    jest.spyOn(repository, 'updateById').mockReturnValue('updateByIdReturn' as any);

    const service = new UserService(repository);
    try {
      await service.changePassword('id', 'oldPassword', 'newPassword');
    } catch (error) {
      expect(error).toEqual({
        contentType: 'application/json',
        data: { errorMessage: 'Usuário não encontrada(o).' },
        statusCode: StatusCodes.NOT_FOUND
      });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
      expect(repository.updateById).toHaveBeenCalledTimes(0);
    }
  });

  it('changePassword: when password is wrong', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue({
      password: 'passwordWrong'
    } as any);

    jest.spyOn(repository, 'updateById').mockReturnValue('updateByIdReturn' as any);

    const service = new UserService(repository);
    try {
      await service.changePassword('id', 'oldPassword', 'newPassword');
    } catch (error) {
      expect(error).toEqual({
        contentType: 'application/json',
        data: { errorMessage: 'senha antiga incorreta' },
        statusCode: StatusCodes.NOT_ACCEPTABLE
      });

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({ _id: 'id' });
      expect(repository.updateById).toHaveBeenCalledTimes(0);
    }
  });
});
