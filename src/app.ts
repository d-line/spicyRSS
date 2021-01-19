import express, { Application } from 'express';
import dotenv from 'dotenv';
import log4js, { Logger } from 'log4js';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../src/swagger/openapi.json';
import { useExpressServer } from 'routing-controllers';

class App {
    public app: Application
    public port: number
    public logger: Logger;

    constructor (controllers: any, middleware: any) {
      this.getEnvVariables();
      this.app = express();

      this.app.use(bodyParser.json());
      this.app.use(httpContext.middleware);
      this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

      useExpressServer(this.app, {
        controllers: controllers,
        middlewares: middleware,
        defaultErrorHandler: false
      });
    }

    private getEnvVariables () {
      dotenv.config();
      this.port = parseInt(process.env.PORT);
      this.logger = log4js.getLogger();
      this.logger.level = process.env.LOG_LEVEL;
    }

    public listen () {
      this.app.listen(this.port, () => {
        this.logger.info(`Running on port ${this.port}`);
      });
    }
}

export default App;
