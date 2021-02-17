import AuthenticationController from "./authentication/authentication.controller";
import App from "./app";
import FeedsController from "./feeds/feeds.controller";
import validateEnv from './utils/validateEnv';
import StoriesController from "./stories/stories.controller";

validateEnv();

const app = new App([
    new AuthenticationController(),
    new FeedsController(),
    new StoriesController()
]);
app.listen();

