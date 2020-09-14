import express, { Application } from 'express'
import mongoose from 'mongoose'

import indexRouter from './routes'

const app: Application = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require('./config/keys').MONGO_URI

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.log(err))

// Initialise http request to index router '/'
app.use('/', indexRouter)

app.listen('5000', () => console.log('Becky started listening on port 5000'))

module.exports = app
