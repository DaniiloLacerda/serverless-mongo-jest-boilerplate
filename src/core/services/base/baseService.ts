import { BaseRepository } from '@repositories/base/base.repository';
import { StatusCodes } from 'http-status-codes';
import { Document } from 'mongoose';
import { CONTENT_TYPE_JSON, VALUE_NOT_FOUND } from '../../utils/constants';

export abstract class BaseService<T extends Document> {
  repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  find(condition) {
    return this.repository.find(condition);
  }

  findOne(condition) {
    return this.repository.findOne(condition);
  }

  create(item) {
    return this.repository.create(item);
  }

  createMany(item) {
    return this.repository.createMany(item);
  }

  getAll(event) {
    return this.repository.getAll({ active: true });
  }

  async updateById(id, item) {
    if (!(await this.repository.findOne({ _id: id }))) {
      throw {
        statusCode: StatusCodes.BAD_REQUEST,
        data: { errorMessage: VALUE_NOT_FOUND('Entidade') },
        contentType: CONTENT_TYPE_JSON
      };
    }
    return this.repository.updateById(id, item);
  }

  async deactivate(id) {
    if (!(await this.repository.findOne({ _id: id }))) {
      throw {
        statusCode: StatusCodes.BAD_REQUEST,
        data: { errorMessage: VALUE_NOT_FOUND('Entidade') },
        contentType: CONTENT_TYPE_JSON
      };
    }
    const item = { active: false };
    return this.repository.deactivate(id, item);
  }

  async deleteMany(ids: string[]) {
    return this.repository.deleteMany(ids);
  }
}
