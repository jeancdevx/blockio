import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAreaById } from '@/db/queries'
import { auth } from '@/lib/auth'
import { isRRHHUser } from '@/lib/utils'

import UpdateForm from '@/components/rrhh/area/form/update-form'

interface AreaPageProps {
  params: {
    areaId: string
  }
}

export default async function AreaIdPage({ params }: AreaPageProps) {
  const { areaId } = await params

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const area = await getAreaById(areaId)

  if (!session) redirect('/sign-in')

  if (!isRRHHUser(session.user.email)) redirect('/empleos')

  return <UpdateForm initialData={area} />
}
