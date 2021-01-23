import 'dotenv/config';
import App from './app';
import { FeedsController } from './controllers/feeds.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  // AuthenticationController,
  FeedsController
]);

app.listen();
