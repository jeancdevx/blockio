import { cache } from 'react'

import { asc, eq } from 'drizzle-orm'

import { db } from '.'
import { area, jobOffer } from './schema'

export const getAreas = cache(async () => {
  const data = await db.select().from(area).orderBy(asc(area.name))

  return data
})

export const getAreaById = cache(async (id: string) => {
  const data = await db.query.area.findFirst({
    where: eq(area.id, id)
  })

  return data
})

export const getJobOffers = cache(async () => {
  const data = await db
    .select({
      id: jobOffer.id,
      title: jobOffer.title,
      description: jobOffer.description,
      salary: jobOffer.salary,
      location: jobOffer.location,
      workType: jobOffer.workType,
      status: jobOffer.status,
      expiresAt: jobOffer.expiresAt,
      maxSelectedCandidates: jobOffer.maxSelectedCandidates,
      requirements: jobOffer.requirements,
      benefits: jobOffer.benefits,
      createdAt: jobOffer.createdAt,
      updatedAt: jobOffer.updatedAt,
      areaId: jobOffer.areaId,
      area: {
        id: area.id,
        name: area.name
      }
    })
    .from(jobOffer)
    .leftJoin(area, eq(jobOffer.areaId, area.id))

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
