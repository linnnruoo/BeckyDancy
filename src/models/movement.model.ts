/**
 * Model for a Movement session
 */
import { Document, Schema, model } from 'mongoose'

import Move from '../common/moves'

export interface IMovementSchema extends Document {
  move: Move
  position: number[] // e.g [1,2,3]
  correctPosition: number[]
  syncDelay: number
  date: Date
}

const MovementSchema = new Schema(
  {
    // predicted
    move: {
      type: Number,
      required: true,
    },
    moves: {
      type: [Number],
      required: true,
    },
    // predicted
    position: {
      type: String,
      required: true,
    },
    // from eval server
    correctPosition: {
      type: String,
      required: true,
    },
    syncDelay: {
      type: Number,
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
