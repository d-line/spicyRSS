import express from 'express';
import dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

const app = express();
const port = process.env.PORT;

app.get('/', (request, response) => {
  response.send('Hello world!');
});

logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');

app.listen(port, () => logger.info(`Running on port ${port}`));
