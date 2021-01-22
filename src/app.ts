import * as bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import log4js from 'log4js'
import errorMiddleware from './middleware/error.middleware'

class App {
  public app: express.Application;
  public logger: log4js.Logger;

  constructor (controller) {
    this.app = express()

    this.setLogger()
    this.connectToTheDatabase()
    this.initializeMiddleware()
    this.initializeController(controller)
    this.initializeErrorHandling()
  }

  private connectToTheDatabase () {
    const { MONGO_URL } = process.env
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(() => {
      this.logger.info('MongoDB connected')
    })
  }

  private initializeMiddleware () {
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
  }

  private initializeErrorHandling () {
    this.app.use(errorMiddleware)
  }

  private initializeController (controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private setLogger () {
    this.logger = log4js.getLogger()
    this.logger.level = process.env.LOG_LEVEL
  }

  public listen () {
    this.app.listen(process.env.PORT, () => {
      this.logger.info(`App listening on the port ${process.env.PORT}`)
    })
  }
}

export default App
