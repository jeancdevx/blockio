import { cache } from 'react'

import { unstable_cache } from 'next/cache'

import { eq, sql } from 'drizzle-orm'

import { db } from '.'
import { area, jobOffer } from './schema'

export const getAreas = unstable_cache(
  async () => {
    const data = await db.query.area.findMany({
      offset: 0,
      limit: 20
    })

    return data
  },
  ['areas'],
  {
    revalidate: 3600
  }
)

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

export const getActiveJobOffersByArea = unstable_cache(
  async () => {
    const data = await db
      .select({
        areaId: area.id,
        areaName: area.name,
        activeOffers: sql<number>`CAST(COALESCE(COUNT(CASE WHEN ${jobOffer.status} = 'activa' THEN 1 END), 0) AS INTEGER)`
      })
      .from(area)
      .leftJoin(jobOffer, eq(area.id, jobOffer.areaId))
      .where(eq(jobOffer.status, 'activa'))
      .groupBy(area.id, area.name)
      .having(
        sql`COUNT(CASE WHEN ${jobOffer.status} = 'activa' THEN 1 END) > 0`
      )
      .orderBy(area.name)

    const totalActiveOffers = data.reduce(
      (acc, item) => acc + Number(item.activeOffers),
      0
    )

    const areasWithPercentage = data.map(item => ({
      ...item,
      percentage:
        totalActiveOffers > 0
          ? Number(
              ((Number(item.activeOffers) / totalActiveOffers) * 100).toFixed(2)
            )
          : 0
    }))

    return {
      areas: areasWithPercentage,
      total: totalActiveOffers
    }
  },
  ['active-job-offers-by-area'],
  {
    revalidate: 3600
  }
)

export const getAllTypesOfJobOffersByArea = unstable_cache(
  async () => {
    const data = await db
      .select({
        areaId: area.id,
        areaName: area.name,
        activeOffers: sql<number>`CAST(COALESCE(COUNT(CASE WHEN ${jobOffer.status} = 'activa' THEN 1 END), 0) AS INTEGER)`,
        expiredOffers: sql<number>`CAST(COALESCE(COUNT(CASE WHEN ${jobOffer.status} = 'vencida' THEN 1 END), 0) AS INTEGER)`,
        cancelledOffers: sql<number>`CAST(COALESCE(COUNT(CASE WHEN ${jobOffer.status} = 'cancelada' THEN 1 END), 0) AS INTEGER)`,
        finishedOffers: sql<number>`CAST(COALESCE(COUNT(CASE WHEN ${jobOffer.status} = 'finalizada' THEN 1 END), 0) AS INTEGER)`
      })
      .from(area)
      .leftJoin(jobOffer, eq(area.id, jobOffer.areaId))
      .groupBy(area.id, area.name)
      .orderBy(area.name)
    const totalOffers = data.reduce(
      (acc, item) =>
        acc +
        Number(item.activeOffers) +
        Number(item.expiredOffers) +
        Number(item.cancelledOffers) +
        Number(item.finishedOffers),
      0
    )
    const areasWithPercentage = data.map(item => ({
      ...item,
      activePercentage:
        totalOffers > 0
          ? Number(((Number(item.activeOffers) / totalOffers) * 100).toFixed(2))
          : 0,
      expiredPercentage:
        totalOffers > 0
          ? Number(
              ((Number(item.expiredOffers) / totalOffers) * 100).toFixed(2)
            )
          : 0,
      cancelledPercentage:
        totalOffers > 0
          ? Number(
              ((Number(item.cancelledOffers) / totalOffers) * 100).toFixed(2)
            )
          : 0,
      finishedPercentage:
        totalOffers > 0
          ? Number(
              ((Number(item.finishedOffers) / totalOffers) * 100).toFixed(2)
            )
          : 0
    }))
    return {
      areas: areasWithPercentage,
      total: totalOffers
    }
  },
  ['all-types-of-job-offers-by-area'],
  {
    revalidate: 3600
  }
)
