import UserModel from '@modules/users/user.schema'
import { ApolloError } from 'apollo-server-express'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { LoginOutput } from './auth'
import { LoginInput } from './auth.input'

@Resolver()
class AuthResolver {
  @Mutation(() => LoginOutput)
  async login(@Arg('input') input: LoginInput): Promise<LoginOutput> {
    const user = await UserModel.findOne({ email: input.email }).lean()
    if (!user) {
      throw new ApolloError('Login Failed')
    }
    if (!user.isActive) {
      throw new ApolloError('Login Failed')
    }
    const compared = await compare(input.password, user.password)
    if (!compared) {
      throw new ApolloError('Login Failed')
    }
    const token = await this.generateToken({ uid: user._id })
    const refreshToken = await this.generateToken({ uid: user._id }, '7d')
    return { token, refreshToken }
  }

  private async generateToken(data: any, exp = '1h'): Promise<string> {
    const SECRET = process.env.APP_SECRET as string
    return jwt.sign(data, SECRET, { expiresIn: exp })
  }
}

export default AuthResolver
