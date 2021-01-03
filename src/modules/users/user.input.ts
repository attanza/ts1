import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password!: string

  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  role?: string
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id!: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(200)
  name?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  role?: string
}
