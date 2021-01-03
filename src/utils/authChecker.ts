import { AuthChecker } from 'type-graphql'
import { IRequest, MyContext } from './interfaces/MyContext.interface'

export const myAuthChecker: AuthChecker<MyContext> = ({ context }) => {
  const req = context.req as IRequest
  const user = req.user
  if (!user) return false
  if (!user.isActive) return false
  return true
}
