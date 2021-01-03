import { Role } from '@modules/roles/Role'
import { PaginationArgs } from '@modules/shared/pagination.args'
import { MyContext } from '@utils/interfaces/MyContext.interface'
import PaginatedResponse from '@utils/interfaces/PaginatedResponse'
import paginator from '@utils/paginator'
import { ApolloError } from 'apollo-server-express'
import { GraphQLResolveInfo } from 'graphql'
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Info,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { User } from './user'
import { CreateUserInput, UpdateUserInput } from './user.input'
import UserModel from './user.schema'

@ObjectType()
class PaginatedUserResponse extends PaginatedResponse(User) {}

@Resolver(() => User)
class UserResolver {
  // @Authorized()
  @Query(() => PaginatedUserResponse)
  async users(
    @Args() paginationArgs: PaginationArgs,
    @Info() info: GraphQLResolveInfo
  ): Promise<PaginatedUserResponse | undefined> {
    const searchableFields = ['name', 'email']
    return paginator({ paginationArgs, info, searchableFields, dbModel: UserModel })
  }

  @Authorized()
  @Query(() => User)
  async user(@Arg('id') id: string): Promise<User | null> {
    return UserModel.findById(id)
  }

  @Authorized()
  @Mutation(() => User)
  async userCreate(@Arg('input') input: CreateUserInput): Promise<User> {
    const exists = await UserModel.findOne({ email: input.email }).lean()
    if (exists) {
      throw new ApolloError('Email already exists')
    }
    const user = new UserModel(input)
    await user.save()
    return user
  }

  @Authorized()
  @Mutation(() => User)
  async userUpdate(@Arg('input') input: UpdateUserInput): Promise<User | null> {
    const exists = await UserModel.findOne({ email: input.email }).lean()
    if (exists && exists._id !== input.id) {
      throw new ApolloError('Email already exists')
    }
    await UserModel.findOneAndUpdate({ _id: input.id }, { ...input })
    return UserModel.findById(input.id)
  }

  @Authorized()
  @Mutation(() => User)
  async userDelete(@Arg('id') id: string): Promise<User | null> {
    return UserModel.findOneAndRemove({ _id: id })
  }

  @FieldResolver(() => Role)
  async role(@Root() root: any, @Ctx() { roleLoader }: MyContext): Promise<Role> {
    return roleLoader.load(root.role)
  }
}
export default UserResolver
