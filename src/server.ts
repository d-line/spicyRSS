import AuthenticationController from "./authentication/authentication.controller";
import App from "./app";
import FeedsController from "./feeds/feeds.controller";
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
    new AuthenticationController(),
    new FeedsController()
]);
app.listen();

