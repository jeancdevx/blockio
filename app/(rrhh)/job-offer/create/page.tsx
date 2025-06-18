import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAreas } from '@/db/queries'
import { auth } from '@/lib/auth'

import CreateForm from '@/components/rrhh/jobs/form/create-form'

export default async function JobOfferCreatePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const areas = await getAreas()

  if (!session) redirect('/empleos')

  return <CreateForm areas={areas} />
}
