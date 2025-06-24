import { cache } from 'react'

import { eq } from 'drizzle-orm'

import { db } from '.'
import { area, jobOffer } from './schema'

export const getAreas = cache(async () => {
  const data = await db.query.area.findMany({
    offset: 0,
    limit: 20
  })

  return data
})

export const getAreaById = cache(async (id: string) => {
  const data = await db.query.area.findFirst({
    where: eq(area.id, id)
  })

  return data
})

export const getJobOffers = cache(async () => {
  const data = await db.query.jobOffer.findMany({
    with: {
      area: true
    }
  })

  return data
})

export const getJobOfferById = cache(async (id: string) => {
  const data = await db.query.jobOffer.findFirst({
    where: eq(jobOffer.id, id),
    with: {
      area: true,
      evaluations: true
    }
  })

  return data
})
