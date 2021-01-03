import { Role } from '@modules/roles/Role'
import { Document } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User extends Document {
  @Field(() => ID)
  _id?: string

  @Field()
  name!: string

  @Field()
  email!: string

  password?: string

  @Field(() => Boolean)
  isActive!: boolean

  @Field()
  avatar!: string

  @Field(() => Role)
  role!: Role | string

  @Field(() => Date)
  createdAt!: Date

  @Field(() => Date)
  updatedAt!: Date
}
