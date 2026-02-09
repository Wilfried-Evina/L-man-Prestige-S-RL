import { MongoClient, Db, Collection } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToMongo(uri: string, dbName: string) {
  if (cachedDb) return cachedDb
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  cachedDb = cachedClient.db(dbName)
  return cachedDb
}

export async function getCollection<T = any>(name: string) {
  const uri = process.env.MONGO_URI
  if (!uri) throw new Error('MONGO_URI not configured')
  const defaultDb = process.env.MONGO_DB || 'leman_prestige'
  const db = await connectToMongo(uri, defaultDb)
  return db.collection<T>(name)
}

export async function closeMongo() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}

export default { connectToMongo, getCollection, closeMongo }
