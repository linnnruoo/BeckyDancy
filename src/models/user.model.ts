import { Document, Schema, model } from 'mongoose'

export interface IUserSchema extends Document {
  name: string
  beetleId: string
  MAC: string // MAC address
  url: string // profile url
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
    url: {
      // profile url
      type: String,
      required: true,
    },
  },
  { versionKey: false },
)

export default model<IUserSchema>('User', UserSchema)
