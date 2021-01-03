import { Document } from 'mongoose'
import { Field, Float, ID, ObjectType } from 'type-graphql'

@ObjectType()
class Location {
  @Field()
  type: String

  @Field(() => [Float])
  coordinates: number[]
}

@ObjectType()
export class Shop extends Document {
  @Field(() => ID)
  _id?: string

  @Field()
  name!: string

  @Field()
  category!: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  image?: string

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
