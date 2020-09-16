/**
 * Model for a PredictedMovement session
 */
import { Document, Schema, model } from 'mongoose'

import Move, { getMoves } from '../common/moves'

interface IPredictedMovementSchema extends Document {
  move: Move
  position: number[] // e.g [1,2,3]
  syncDelay: number
  date: Date
}

const PredictedMovementSchema = new Schema(
  {
    move: {
      type: Number,
      enum: getMoves(),
      required: true,
    },
    position: {
      type: [Number],
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

export default model<IPredictedMovementSchema>(
  'PredictedPredictedMovement',
  PredictedMovementSchema,
)
