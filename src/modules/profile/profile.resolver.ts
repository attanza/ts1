import { User } from '@modules/users/user'
import { MyContext } from '@utils/interfaces/MyContext.interface'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'

@Resolver()
class ProfileResolver {
  @Authorized()
  @Query(() => User)
  me(@Ctx() ctx: MyContext): User {
    const user = ctx.req.user
    return user
  }
}
export default ProfileResolver
