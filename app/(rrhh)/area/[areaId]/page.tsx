import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { getAreaById } from '@/db/queries'
import { auth } from '@/lib/auth'

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

  if (!session) redirect('/sign-in')

  if (
    !areaId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      areaId
    )
  )
    notFound()

  const area = await getAreaById(areaId)

  if (!area) notFound()

  return <UpdateForm initialData={area} />
}
