import { IsMongoId, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateShopInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  name!: string

  @Field()
  @IsNotEmpty()
  category: string

  @Field({ nullable: true })
  @IsOptional()
  address: string
}

@InputType()
export class UpdateShopInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id!: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  name!: string

  @Field({ nullable: true })
  @IsOptional()
  category: string

  @Field({ nullable: true })
  @IsOptional()
  address: string
}
