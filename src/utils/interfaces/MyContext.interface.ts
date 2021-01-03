import { User } from '@modules/users/user'
import { createRoleLoader } from '@utils/loaders/createRoleLoader'
import { Request } from 'express'

export interface IRequest extends Request {
  user: User
}

export interface MyContext {
  req: IRequest
  roleLoader: ReturnType<typeof createRoleLoader>
}
