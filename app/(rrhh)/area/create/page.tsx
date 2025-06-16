import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { isRRHHUser } from '@/lib/utils'

import CreateForm from '@/components/rrhh/area/form/create-form'

export default async function AreaCreatePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/sign-in')

  if (!isRRHHUser(session.user.email)) redirect('/empleos')

  return <CreateForm />
}
