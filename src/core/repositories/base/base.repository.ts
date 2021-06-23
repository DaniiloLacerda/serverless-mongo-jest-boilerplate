import { Model, Document, Collection } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  schema: Model<T>;

  public _collection: Collection;

  constructor(schema: Model<T>) {
    this.schema = schema;
  }

  find(condition) {
    return this.schema.find(condition);
  }

  findOne(condition) {
    return this.schema.findOne(condition);
  }

  getAll(condition) {
    return this.schema.find(condition);
  }

  create(item): Promise<T> {
    return this.schema.create(item);
  }

  createMany(item) {
    return this.schema.insertMany(item);
  }

  updateById(id, item) {
    return this.schema.updateOne({ _id: id }, item, { new: true });
  }

  deactivate(id, item) {
    return this.schema.updateOne({ _id: id }, item, { new: true });
  }

  deleteMany(ids: string[]) {
    return this.schema.deleteMany({ _id: { $in: ids } as any });
  }
}
