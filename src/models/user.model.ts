import { Document, Schema, model } from 'mongoose'

export interface IUserSchema extends Document {
  name: string
  beetleId: string
  MAC: string // MAC address
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    beetleId: {
      type: String,
      required: true,
      unique: true,
    },
    MAC: {
      // MAC address
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false },
)

export default model<IUserSchema>('User', UserSchema)
