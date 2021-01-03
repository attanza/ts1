import UserModel from '@modules/users/user.schema'
import jwt from 'jsonwebtoken'

interface TokenData {
  uid: string
}

export const getUserFromToken = async (token: string) => {
  if (!token) return null

  if (token.split(' ')[0] !== 'Bearer') return null
  const tokenSplit = token.split(' ')[1]
  if (!tokenSplit) return null
  const SECRET = process.env.APP_SECRET as string
  try {
    const { uid } = (await jwt.verify(token.split(' ')[1], SECRET)) as TokenData
    const user = await UserModel.findById(uid).lean()
    return user
  } catch (error) {
    return null
  }
}
