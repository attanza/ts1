import AuthResolver from '@modules/auth/auth.resolver'
import ProfileResolver from '@modules/profile/profile.resolver'
import RoleResolver from '@modules/roles/role.resolver'
import ShopResolver from '@modules/shops/shop.resolver'
import UserResolver from '@modules/users/user.resolver'
import { buildSchema } from 'type-graphql'
import { myAuthChecker } from './authChecker'

export const mainSchema = async () => {
  return buildSchema({
    resolvers: [UserResolver, RoleResolver, AuthResolver, ProfileResolver, ShopResolver],
    dateScalarMode: 'isoDate',
    authChecker: myAuthChecker,
  })
}
// resolvers: [path.join(__dirname, '../**/**/*.resolver.ts')],
