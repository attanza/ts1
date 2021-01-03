import { ClassType, Field, Int, ObjectType } from 'type-graphql'

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => Int, { nullable: true })
    total?: number | undefined
    @Field(() => Int, { nullable: true })
    limit?: number | undefined = 0
    @Field(() => Int, { nullable: true })
    totalPages?: number | undefined
    @Field(() => Int, { nullable: true })
    page?: number | undefined
    @Field(() => Boolean, { nullable: true })
    hasPrevPage?: Boolean | undefined = false
    @Field(() => Boolean, { nullable: true })
    hasNextPage?: Boolean | undefined = false
    @Field(() => Int, { nullable: true })
    prevPage?: number | undefined
    @Field(() => Int, { nullable: true })
    nextPage?: number | undefined
    @Field(() => Int, { nullable: true })
    hasMore?: Boolean | undefined = false
    @Field(() => [TItemClass], { nullable: true })
    docs: TItem[] = []
  }
  return PaginatedResponseClass
}
