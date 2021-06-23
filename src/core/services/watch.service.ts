import { IWatch } from '@interfaces/models/watch.interface';
import { WatchRepository } from '@repositories/watch.repository';
import { JWTHelper } from '@utils/jwtHelper';
import { BaseService } from './base/baseService';

export class WatchService extends BaseService<IWatch> {
  constructor(repository: WatchRepository) {
    super(repository);
  }

  async create(event) {
    const watch: IWatch = event.body;
    watch.userId = JWTHelper.getUserId(event);

    return super.create(watch);
  }
}
