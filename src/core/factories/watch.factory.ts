import { WatchRepository } from '@repositories/watch.repository';
import { WatchService } from '@services/watch.service';

export class WatchFactory {
  static createInstance() {
    const repository = new WatchRepository();
    const service = new WatchService(repository);
    return service;
  }
}
