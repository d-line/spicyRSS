import dotenv from 'dotenv';
import log4js from 'log4js';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';

dotenv.config();
const port = process.env.PORT;

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const app = createExpressServer({
  controllers: [UserController]
});

app.listen(port, () => logger.info(`Running on port ${port}`));
