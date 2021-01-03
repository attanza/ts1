import { ESortMode, PaginationArgs } from '@modules/shared/pagination.args'
import { GraphQLResolveInfo } from 'graphql'
import graphqlFields from 'graphql-fields'

type GeneratePaginationOptions = {
  paginationArgs: PaginationArgs
  info: GraphQLResolveInfo
  searchableFields?: string[]
}
export const generatePaginationOptions = ({
  paginationArgs,
  info,
  searchableFields,
}: GeneratePaginationOptions) => {
  const sortBy = paginationArgs.sortBy || 'createdAt'
  const sortMode = paginationArgs.sortMode || ESortMode.DESC

  const fieldsWithSubFieldsArgs = graphqlFields(info, {}, { processArguments: true })
  const selections = fieldsWithSubFieldsArgs['docs']

  const mongooseSelection = Object.keys(selections).reduce((a, b) => ({ ...a, [b]: 1 }), {})

  let query: any = {}
  if (paginationArgs.search && searchableFields && searchableFields.length > 0) {
    const or: { [key: string]: any } = []
    searchableFields.map((key) => {
      or.push({ [key]: { $regex: paginationArgs.search, $options: 'i' } })
    })
    query['$or'] = or
  }

  const limit = Math.min(50, paginationArgs.limit)

  return {
    query,
    select: mongooseSelection,
    sort: { [sortBy]: sortMode },
    populate: '',
    limit,
    page: paginationArgs.page || 1,
  }
}
