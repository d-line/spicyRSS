import * as mongoose from 'mongoose';
import App from './app';
import FeedsController from './controllers/feeds.controller';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
    new FeedsController(),
  ]);

app.listen();