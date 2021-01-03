import { GraphQLResolveInfo } from 'graphql'
import { Model } from 'mongoose'
import graphqlFields from 'graphql-fields'
import { ESortMode, PaginationArgs } from '@modules/shared/pagination.args'

type Props = {
  dbModel: Model<any>
  paginationArgs: PaginationArgs
  info: GraphQLResolveInfo
  searchableFields?: string[]
}

export default async (ctx: Props) => {
  const { dbModel, paginationArgs, info, searchableFields } = ctx
  const { page = 1, limit = 10, search, sortBy = '_id', sortMode = ESortMode.DESC } = paginationArgs
  const total = await ctx.dbModel.countDocuments()
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(total / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  const prevPage = page === 1 ? undefined : page - 1
  const nextPage = page >= totalPages ? undefined : page + 1

  const fieldsWithSubFieldsArgs = graphqlFields(info, {}, { processArguments: true })
  const selections = fieldsWithSubFieldsArgs['docs']
  const mongooseSelection = Object.keys(selections).reduce((a, b) => ({ ...a, [b]: 1 }), {})

  const docs = await dbModel
    .find({})
    .select(mongooseSelection)
    .sort({ [sortBy]: sortMode })
    .skip(skip)
    .limit(limit)
  return { page, limit, docs, total, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage }
}
