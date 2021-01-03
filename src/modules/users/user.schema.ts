import { hash } from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import { User } from './user'

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    isActive: Boolean,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    avatar: String,
  },
  { timestamps: true }
)
UserSchema.index({ email: 1 })
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await hash(this.password, 12)
  next()
})
const UserModel = mongoose.model<User>('User', UserSchema)

export default UserModel
