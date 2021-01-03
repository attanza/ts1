import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class LoginOutput {
  @Field()
  token: string

  @Field()
  refreshToken: string
}
