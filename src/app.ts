import * as bodyParser from 'body-parser';
import * as express from "express";
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;

  constructor(controller) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddleware();
    this.initializeController(controller);
    this.initializeErrorHandling();
  }

  private connectToTheDatabase() {
    const MONGO_URL = process.env.MONGO_URL;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeController(controllers) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    })
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;