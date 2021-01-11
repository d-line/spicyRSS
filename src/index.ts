import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import httpContext from 'express-http-context';
import log4js from 'log4js';
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';

dotenv.config();
const port = process.env.PORT;

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);

useExpressServer(app, {
  controllers: [UserController]
});

app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
});

app.listen(port, () => logger.info(`Running on port ${port}`));
