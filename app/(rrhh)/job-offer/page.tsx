import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getJobOffers } from '@/db/queries'
import { auth } from '@/lib/auth'

import { JobOfferListView } from '@/components/rrhh/jobs/views'

export default async function JobOfferPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const jobOffers = await getJobOffers()

  if (!session) redirect('/sign-in')

  return <JobOfferListView jobOffers={jobOffers} />
}
