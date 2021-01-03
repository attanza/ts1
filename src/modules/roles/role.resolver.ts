import { PaginationArgs } from '@modules/shared/pagination.args'
import PaginatedResponse from '@utils/interfaces/PaginatedResponse'
import paginator from '@utils/paginator'
import { GraphQLResolveInfo } from 'graphql'
import { Arg, Args, Authorized, Info, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Role } from './Role'
import { CreateRoleInput, UpdateRoleInput } from './role.input'
import RoleModel from './role.schema'

@ObjectType()
class PaginatedRoleResponse extends PaginatedResponse(Role) {}

@Resolver(() => Role)
class RoleResolver {
  @Authorized()
  @Query(() => PaginatedRoleResponse)
  async roles(
    @Args() paginationArgs: PaginationArgs,
    @Info() info: GraphQLResolveInfo
  ): Promise<PaginatedRoleResponse | undefined> {
    const searchableFields = ['slug']
    return paginator({ paginationArgs, info, searchableFields, dbModel: RoleModel })
  }

  @Authorized()
  @Query(() => Role)
  async role(@Arg('id') id: string): Promise<Role | null> {
    return RoleModel.findById(id)
  }

  @Authorized()
  @Mutation(() => Role)
  async roleCreate(@Arg('input') input: CreateRoleInput): Promise<Role> {
    const Role = new RoleModel(input)
    await Role.save()
    return Role
  }

  @Authorized()
  @Mutation(() => Role)
  async roleUpdate(@Arg('input') input: UpdateRoleInput): Promise<Role | null> {
    await RoleModel.findOneAndUpdate({ _id: input.id }, { ...input })
    return RoleModel.findById(input.id)
  }

  @Authorized()
  @Mutation(() => Role)
  async roleDelete(@Arg('id') id: string): Promise<Role | null> {
    return RoleModel.findOneAndRemove({ _id: id })
  }
}
export default RoleResolver
