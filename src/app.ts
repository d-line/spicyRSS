import * as bodyParser from 'body-parser';
import * as express from "express";

class App {
  public app: express.Application;
  public port: number;

  constructor(controller, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeController(controller);
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
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;