import 'dotenv/config'

import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from '@/db/schema'

export const db = drizzle(process.env.DATABASE_URL!, { schema: { ...schema } })

const main = async () => {
  try {
    console.log('Seeding database...')

    // categories
    console.log('Seeding categories...')
    await db
      .insert(schema.area)
      .values([
        { name: 'Ingenieria' },
        { name: 'RRHH' },
        { name: 'Electronica' },
        { name: 'Calidad' },
        { name: 'Mercadotecnia' }
      ])

    console.log('Categories seeded successfully.')
  } catch (error) {
    console.error('Error seeding database:', error)

    throw new Error('Database seeding failed')
  }
}

main()
