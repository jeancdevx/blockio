import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import JobView from '@/components/rrhh/jobs'

export default async function JobOfferPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('sign-in')

  return <JobView />
}
