import "dotenv/config";
import * as mongoose from "mongoose";
import * as express from "express";
import * as bodyParser from "body-parser";

class App {
  public app: express.Application;

  constructor(controllers) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private connectToTheDatabase() {
    const { MONGO_URI } = process.env;
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((e) => {
        console.error(`MongoDB Error => ${e}`);
        process.exit(0);
      });
  }
}

export default App;
