import { cache } from 'react'

import { eq } from 'drizzle-orm'

import { db } from '.'
import { area } from './schema'

export const getAreas = cache(async () => {
  const data = await db.select().from(area)

  return data
})

export const getAreaById = cache(async (id: string) => {
  const data = await db.select().from(area).where(eq(area.id, id))

  if (data.length === 0) {
    throw new Error(`Area with id ${id} not found`)
  }

  return data[0]
})
