import { IsMongoId, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateRoleInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  name!: string
}

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id!: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(200)
  name?: string
}
