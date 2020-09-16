/**
 * Model for a dance session
 */
import { Document, Schema, model } from 'mongoose'

import { IUserSchema } from './user.model'

enum Status {
  Idle = 0,
  Active = 1,
}

interface IDancerSchema {
  dancerNo: string
  userId: IUserSchema['_id']
}

interface IDanceSchema extends Document {
  dancers: Array<IDancerSchema>
  status: Status
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

const DanceSchema = new Schema(
  {
    dancers: [DancerSchema],
    status: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false },
)

export default model<IDanceSchema>('Dance', DanceSchema)
