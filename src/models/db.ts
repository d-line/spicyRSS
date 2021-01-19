import { Logger } from 'log4js';
import mongoose from 'mongoose';

class DB {
  private connectionString: string;
  private logger: Logger;

  constructor (logger: Logger) {
    this.logger = logger;
    this.connectionString = process.env.MONGO_PATH;
  }

  public connect () {
    mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
      this.logger.info(`Mongoose connected to ${this.connectionString}`);
    });
    mongoose.connection.on('error', (err) => {
      this.logger.info('Mongoose connection error:', err);
    });
  }
}

export default DB;
