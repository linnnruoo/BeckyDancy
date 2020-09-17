import express, { Application } from 'express'
import mongoose from 'mongoose'

import { MONGO_URI } from 'config/keys'
import indexRouter from 'routes'
import apiRouter from 'routes/api'
import { errorHandlingMiddleware } from 'utilities/httpError'

class App {
  public app: Application
  public mongoUrl: string = MONGO_URI

  constructor() {
    this.app = express()
    this.setup()
    this.mongoSetup()
  }

  private setup(): void {
    // support application/json type post data
    this.app.use(express.json())
    // Support application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: false }))
    // Initialise http request to index and api routers '/' & '/api'
    this.app.use('/', indexRouter)
    this.app.use('/api', apiRouter)
    // centralised error handler
    this.app.use(errorHandlingMiddleware)

    // Listen to port 5000
    this.app.listen('5000', () =>
      console.log('Becky started listening on port 5000'),
    )
  }

  private mongoSetup(): void {
    try {
      mongoose.connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
export default new App().app
