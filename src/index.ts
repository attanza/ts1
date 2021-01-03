import 'dotenv/config'
import 'reflect-metadata'
import 'module-alias/register'

import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { dbConfig } from './utils/dbConfig'
import { MyContext } from './utils/interfaces/MyContext.interface'
import { mainSchema } from './utils/mainSchema'
import { seeder } from './utils/seeder'
import { setContext } from './utils/setContext'

const Bootstrap = async () => {
  await dbConfig()

  // await seeder()

  const server = new ApolloServer({
    schema: await mainSchema(),
    context: (ctx: MyContext) => setContext(ctx),
  })

  const app = express()
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  )
  app.use(cors())
  app.get('/seeder', async (req, res) => {
    await seeder()
    return res.status(200).send('Seeding completed')
  })
  server.applyMiddleware({ app })

  const port = process.env.PORT || 4000

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  )
}
Bootstrap()
