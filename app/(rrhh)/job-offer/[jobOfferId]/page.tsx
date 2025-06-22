import { notFound } from 'next/navigation'

import { getAreas, getJobOfferById } from '@/db/queries'

import { EditForm } from '@/components/rrhh/jobs/form'

interface JobOfferDetailPageProps {
  params: { jobOfferId: string }
}

export default async function JobOfferEditPage({
  params
}: JobOfferDetailPageProps) {
  const { jobOfferId } = await params

  const allAreas = getAreas()
  const jobOffer = getJobOfferById(jobOfferId)

  const [areas, jobOfferData] = await Promise.all([allAreas, jobOffer])

  if (!jobOfferData) notFound()

  console.log('jobOfferData', jobOfferData)

  return (
    <>
      <div className='space-y-1'>
        <h1 className='text-3xl font-semibold md:text-4xl'>
          Editar oferta laboral
        </h1>
        <p className='text-muted-foreground text-sm'>
          Modifica los datos de la oferta laboral &quot;{jobOfferData.title}
          &quot;.
        </p>
      </div>

      <EditForm jobOffer={jobOfferData} areas={areas} />
    </>
  )
}
