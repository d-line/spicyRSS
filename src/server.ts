import App from './app';
import { FeedsController } from './controller/feeds.controller';
import { StoriesController } from './controller/stories.controller';
import { GlobalErrorHandler } from './middleware/global-error-handler';
const app = new App([
  FeedsController, StoriesController
], [GlobalErrorHandler]);
app.listen();
