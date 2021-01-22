import App from './app';
import FeedsController from './controllers/feeds.controller';

const app = new App(
  [
    new FeedsController(),
  ], 5000
)

app.listen();