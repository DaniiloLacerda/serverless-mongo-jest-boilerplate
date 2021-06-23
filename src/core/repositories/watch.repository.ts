import { IWatch } from '@interfaces/models/watch.interface';
import { BaseRepository } from './base/base.repository';
import { Watch } from './schemas/watchSchema';

export class WatchRepository extends BaseRepository<IWatch> {
  constructor() {
    const user = new Watch();
    super(user.model);
  }
}
