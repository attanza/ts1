import { PaginationArgs } from '@modules/shared/pagination.args'
import PaginatedResponse from '@utils/interfaces/PaginatedResponse'
import paginator from '@utils/paginator'
import { GraphQLResolveInfo } from 'graphql'
import { Arg, Args, Authorized, Info, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Shop } from './shop'
import { CreateShopInput, UpdateShopInput } from './shop.input'
import ShopModel from './shop.schema'

@ObjectType()
class PaginatedShopResponse extends PaginatedResponse(Shop) {}

@Resolver(() => Shop)
class ShopResolver {
  @Query(() => PaginatedShopResponse)
  async shops(
    @Args() paginationArgs: PaginationArgs,
    @Info() info: GraphQLResolveInfo
  ): Promise<PaginatedShopResponse | undefined> {
    const searchableFields = ['slug']
    return paginator({ paginationArgs, info, searchableFields, dbModel: ShopModel })
  }

  @Authorized()
  @Query(() => Shop)
  async shop(@Arg('id') id: string): Promise<Shop | null> {
    return ShopModel.findById(id)
  }

  @Authorized()
  @Mutation(() => Shop)
  async shopCreate(@Arg('input') input: CreateShopInput): Promise<Shop> {
    const Shop = new ShopModel(input)
    await Shop.save()
    return Shop
  }

  @Authorized()
  @Mutation(() => Shop)
  async shopUpdate(@Arg('input') input: UpdateShopInput): Promise<Shop | null> {
    await ShopModel.findOneAndUpdate({ _id: input.id }, { ...input })
    return ShopModel.findById(input.id)
  }

  @Authorized()
  @Mutation(() => Shop)
  async shopDelete(@Arg('id') id: string): Promise<Shop | null> {
    return ShopModel.findOneAndRemove({ _id: id })
  }
}
export default ShopResolver
