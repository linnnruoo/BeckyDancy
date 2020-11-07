/**
 * Model for a dance session
 */
import { Document, Schema, model } from 'mongoose'

import { IUserSchema } from './user.model'

export enum Status {
  Idle = 0,
  Active = 1,
}

interface IDancerSchema {
  dancerNo: number
  userId: IUserSchema['_id']
  beetleId: IUserSchema['beetleId']
}

export interface IDanceSchema extends Document {
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
  beetleId: {
    type: Schema.Types.String,
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
