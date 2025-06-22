import { notFound } from 'next/navigation'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { jobOffer } from '@/db/schema'

import { EditForm } from '@/components/rrhh/jobs/form'

interface EditJobOfferPageProps {
  params: { jobOfferId: string }
}

const EditJobOfferPage = async ({ params }: EditJobOfferPageProps) => {
  const { jobOfferId } = params

  const [jobOfferData, areas] = await Promise.all([
    db.query.jobOffer.findFirst({
      where: eq(jobOffer.id, jobOfferId),
      with: {
        area: true,
        evaluations: true
      }
    }),
    db.query.area.findMany()
  ])

  if (!jobOfferData) {
    notFound()
  }

  return (
    <EditForm
      jobOffer={{
        ...jobOfferData,
        salary: jobOfferData.salary ?? '',
        evaluations: jobOfferData.evaluations.map(evalu => ({
          id: evalu.id,
          type: evalu.type,
          weight: evalu.weight ?? ''
        }))
      }}
      areas={areas}
    />
  )
}

export default EditJobOfferPage
