import { getUserFromToken } from './getUserFromToken'
import { MyContext } from './interfaces/MyContext.interface'
import { createRoleLoader } from './loaders/createRoleLoader'

export async function setContext({ req }: MyContext) {
  const token = req.headers.authorization || ''
  req.user = await getUserFromToken(token)
  const roleLoader = createRoleLoader()

  return { req, roleLoader }
}
