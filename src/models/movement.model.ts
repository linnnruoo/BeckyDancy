/**
 * Model for a Movement session
 */
import { Document, Schema, model } from 'mongoose'

import Move, { getMoves } from '../common/moves'
import { IDanceSchema } from './dance.model'

interface IMovementSchema extends Document {
  danceId: IDanceSchema['_id']
  move: Move
  position: number[] // e.g [1,2,3]
  date: Date
}

const MovementSchema = new Schema(
  {
    danceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    move: {
      type: Number,
      enum: getMoves(),
      required: true,
    },
    position: {
      type: [Number],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false },
)

export default model<IMovementSchema>('Movement', MovementSchema)
