/**
 * Model for a dance session
 */
import { Document, Schema, model } from 'mongoose'

import { IUserSchema } from './user.model'

interface IDancerSchema {
  dancerNo: string
  userId: IUserSchema['_id']
}

interface IDanceSchema extends Document {
  dancers: Array<IDancerSchema>
  date: Date
}

const DancerSchema = new Schema({
  dancerNo: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

const DanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  dancers: [DancerSchema],
})

export default model<IDanceSchema>('Dance', DanceSchema)
