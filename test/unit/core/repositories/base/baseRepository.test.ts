import { User } from '@repositories/schemas/userSchema';
import { UserRepository } from '@repositories/user.repository';

describe('Base Repository', () => {
  const { model } = new User();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Find', () => {
    jest.spyOn(model, 'find').mockReturnValue('findReturn' as any);
    const repository = new UserRepository();
    const result = repository.find('condition');

    expect(result).toBe('findReturn');
    expect(model.find).toHaveBeenCalledTimes(1);
    expect(model.find).toHaveBeenCalledWith('condition');
  });

  it('FindOne', () => {
    jest.spyOn(model, 'findOne').mockReturnValue('findOneReturn' as any);
    const repository = new UserRepository();
    const result = repository.findOne('condition');

    expect(result).toBe('findOneReturn');
    expect(model.findOne).toHaveBeenCalledTimes(1);
    expect(model.findOne).toHaveBeenCalledWith('condition');
  });

  it('GetAll', () => {
    jest.spyOn(model, 'find').mockReturnValue('findReturn' as any);
    const repository = new UserRepository();
    const result = repository.getAll('condition');

    expect(result).toBe('findReturn');
    expect(model.find).toHaveBeenCalledTimes(1);
    expect(model.find).toHaveBeenCalledWith('condition');
  });

  it('Create', () => {
    jest.spyOn(model, 'create').mockReturnValue('createReturn' as any);
    const repository = new UserRepository();
    const result = repository.create('item');

    expect(result).toBe('createReturn');
    expect(model.create).toHaveBeenCalledTimes(1);
    expect(model.create).toHaveBeenCalledWith('item');
  });

  it('CreateMany', () => {
    jest.spyOn(model, 'insertMany').mockReturnValue('insertManyReturn' as any);
    const repository = new UserRepository();
    const result = repository.createMany('item');

    expect(result).toBe('insertManyReturn');
    expect(model.insertMany).toHaveBeenCalledTimes(1);
    expect(model.insertMany).toHaveBeenCalledWith('item');
  });

  it('UpdateById', () => {
    jest.spyOn(model, 'updateOne').mockReturnValue('updateOneReturn' as any);
    const repository = new UserRepository();
    const result = repository.updateById('id', 'item');

    expect(result).toBe('updateOneReturn');
    expect(model.updateOne).toHaveBeenCalledTimes(1);
    expect(model.updateOne).toHaveBeenCalledWith({ _id: 'id' }, 'item', { new: true });
  });

  it('Deactivate', () => {
    jest.spyOn(model, 'updateOne').mockReturnValue('updateOneReturn' as any);
    const repository = new UserRepository();
    const result = repository.deactivate('id', 'item');

    expect(result).toBe('updateOneReturn');
    expect(model.updateOne).toHaveBeenCalledTimes(1);
    expect(model.updateOne).toHaveBeenCalledWith({ _id: 'id' }, 'item', { new: true });
  });

  it('DeleteMany', () => {
    jest.spyOn(model, 'deleteMany').mockReturnValue('deleteManyReturn' as any);
    const repository = new UserRepository();
    const result = repository.deleteMany(['id', 'id']);

    expect(result).toBe('deleteManyReturn');
    expect(model.deleteMany).toHaveBeenCalledTimes(1);
    expect(model.deleteMany).toHaveBeenCalledWith({ _id: { $in: ['id', 'id'] } as any });
  });
});
