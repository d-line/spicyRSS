import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import log4js from 'log4js';
import { useExpressServer } from 'routing-controllers';
import { GlobalErrorHandler } from './middleware/error.middleware';

class App {
  public app: express.Application;
  public logger: log4js.Logger;

  constructor (controllers) {
    this.app = express();

    this.initializeMiddleware();
    this.initializeController(controllers);
    this.setLogger();
    this.connectToTheDatabase();
  }

  private connectToTheDatabase () {
    const { MONGO_URL } = process.env;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
      useFindAndModify: false
    }).then(() => {
      this.logger.info('MongoDB connected');
    }).catch(err => {
      this.logger.error(`MongoDB Error ${err}`);
    });
  }

  private initializeMiddleware () {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeController (controllers) {
    useExpressServer(this.app, {
      controllers,
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false
    });
  }

  private setLogger () {
    this.logger = log4js.getLogger();
    this.logger.level = process.env.LOG_LEVEL;
  }

  public listen () {
    this.app.listen(process.env.PORT, () => {
      this.logger.info(`App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
