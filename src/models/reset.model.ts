import { Document, Schema, model } from 'mongoose'

export interface IResetSchema extends Document {
  packetType: number
  date: Date
}

const ResetSchema = new Schema(
  {
    packetType: {
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

export default model<IResetSchema>('Reset', ResetSchema)
