import { Document, Schema, model } from 'mongoose'

interface ISensorReadingSchema {
  x: number
  y: number
  z: number
}

interface ISensorSchema extends Document {
  dancerNo: string
  accelerometer: ISensorReadingSchema
  gyroscope: ISensorReadingSchema
  date: Date
}

const SensorReadingSchema = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
    required: true,
  },
})

const SensorSchema = new Schema({
  dancerNo: {
    type: String,
    required: true,
  },
  accelerometer: SensorReadingSchema,
  gyroscope: SensorReadingSchema,
  date: {
    type: Date,
    required: true,
  },
})

export default model<ISensorSchema>('Sensor', SensorSchema)
