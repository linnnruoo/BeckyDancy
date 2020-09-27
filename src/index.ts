import express, { Application } from 'express'
import mongoose from 'mongoose'
import ioServer, { Socket } from 'socket.io'
import http from 'http'

import { MONGO_URI } from 'config/keys'
import indexRouter from 'routes'
import apiRouter from 'routes/api'
import * as streams from 'streams'
import { errorHandlingMiddleware } from 'utilities/httpError'

class App {
  public static readonly PORT: number = 5000

  public app: Application
  public mongoUrl: string = MONGO_URI
  private server: http.Server
  private io: SocketIO.Server

  constructor() {
    this.app = express()
    this.setup()
    this.mongoSetup()
    this.server = http.createServer(this.app)
    this.io = ioServer(this.server)
    this.socketSetup()
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

  private socketSetup(): void {
    // Server listen to port 5000
    this.server.listen(5000, () => {
      console.log('Becky started listening on port 5000')
    })

    // https://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
    this.io.on('connection', (socket: Socket) => {
      console.log('user joined')
      // begin listening and emitting on all stream events changes
      streams.onAllEventsChange(this.io)
      socket.on('disconnect', function () {
        console.log('user disconnected')
      })
    })
  }
}
export default new App().app
