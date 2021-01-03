import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/'
const DB_NAME = process.env.DB_NAME
const isDev = process.env.NODE_ENV === 'development'
export async function dbConfig() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      dbName: DB_NAME,
    })
    if (isDev) {
      mongoose.set('debug', true)
    }
  } catch (error) {
    console.error(error)
  }
}
