import { paramCase } from 'change-case'
import mongoose, { Schema } from 'mongoose'
import { Role } from './Role'

const RoleSchema: Schema = new Schema(
  {
    name: String,
    slug: String,
  },
  {
    timestamps: true,
  }
)
RoleSchema.index({ name: 1, slug: 1 })
RoleSchema.pre<Role>('save', async function (next) {
  this.slug = paramCase(this.name)
  next()
})
const RoleModel = mongoose.model<Role>('Role', RoleSchema)

export default RoleModel
