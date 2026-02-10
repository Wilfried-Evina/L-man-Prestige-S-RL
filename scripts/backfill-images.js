#!/usr/bin/env node
const { MongoClient } = require('mongodb')
const fs = require('fs')
const path = require('path')

async function run() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.error('Set MONGO_URI env var before running this script')
    process.exit(1)
  }
  const dbName = process.env.MONGO_DB || 'leman_prestige'
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  const coll = db.collection('properties')

  // Update Mongo docs: if `image` exists and `images` missing, set images = [image]
  const res = await coll.updateMany({ image: { $exists: true }, images: { $exists: false } }, [
    { $set: { images: ['$image'] } },
    { $unset: 'image' }
  ]).catch(() => null)
  console.log('Mongo updateMany result:', res && res.modifiedCount)

  // Update local JSON file as fallback
  const dataPath = path.join(process.cwd(), 'src', 'data', 'properties.json')
  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const items = JSON.parse(raw)
    let changed = false
    for (const it of items) {
      if (it.image && !it.images) {
        it.images = [it.image]
        delete it.image
        changed = true
      }
    }
    if (changed) fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf-8')
    console.log('Updated local JSON fallback')
  }

  await client.close()
  console.log('Backfill complete')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
