import 'dotenv/config'

import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from '@/db/schema'

export const db = drizzle(process.env.DATABASE_URL!, { schema: { ...schema } })

const main = async () => {
  try {
    console.log('Resetting database...')

    await db.delete(schema.user)
    await db.delete(schema.account)
    await db.delete(schema.session)
    await db.delete(schema.verification)
    await db.delete(schema.cv)
    await db.delete(schema.area)
    await db.delete(schema.jobOffer)
    await db.delete(schema.requirement)
    await db.delete(schema.interview)
    await db.delete(schema.evaluation)

    console.log('Database reset successfully.')
  } catch (error) {
    console.error('Error resetting database:', error)

    throw new Error('Database reset failed')
  }
}

main()
