import "dotenv/config";
import * as mongoose from "mongoose";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import * as expressLogging from "express-logging";
import * as logger from "logops";
import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;
  

  constructor(controllers: Controller[]) {
    this.app = express();
    
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(expressLogging(logger));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen():void {
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
