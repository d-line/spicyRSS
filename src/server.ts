import App from './app'
import AuthenticationController from './controllers/authentication.controller'
import FeedsController from './controllers/feeds.controller'
import 'dotenv/config'
import validateEnv from './utils/validateEnv'

validateEnv()

const app = new App([
  new AuthenticationController(),
  new FeedsController()
])

app.listen()
