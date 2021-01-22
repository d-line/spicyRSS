import * as bodyParser from 'body-parser';
import * as express from "express";
import * as mongoose from 'mongoose';

class App {
  public app: express.Application;

  constructor(controller) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddleware();
    this.initializeController(controller);
  }

  private connectToTheDatabase() {
    const MONGO_URL = process.env.MONGO_URL;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
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