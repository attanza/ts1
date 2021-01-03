import { ArgsType, Field, Int, registerEnumType } from 'type-graphql'

export enum ESortMode {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(ESortMode, {
  name: 'SortMode', // this one is mandatory
  description: 'The basic database sorting directions', // this one is optional
})

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  page: number

  @Field(() => Int, { nullable: true })
  limit: number

  @Field({ nullable: true })
  sortBy: string

  @Field(() => ESortMode, { nullable: true })
  sortMode: ESortMode

  @Field({ nullable: true })
  search: string
}
