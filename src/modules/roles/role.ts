import { Document } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Role extends Document {
  @Field(() => ID)
  _id?: string

  @Field()
  name!: string

  @Field()
  slug!: string

  @Field(() => Date)
  createdAt?: Date

  @Field(() => Date)
  updatedAt?: Date
}
