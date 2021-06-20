import mongoose from 'mongoose';
import { Environment } from './environment';

export class Database {
  private isConnect: number;

  async createConnection() {
    if (!this.isConnect) {
      const db = await mongoose.connect(Environment.getSettings().dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: Environment.getSettings().dbName
      });

      this.isConnect = db.connections[0].readyState;
    }
  }
}
