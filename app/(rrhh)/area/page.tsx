import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAreas } from '@/db/queries'
import { auth } from '@/lib/auth'
import { isRRHHUser } from '@/lib/utils'

import AreaView from '@/components/rrhh/area'

export default async function AreaPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const areas = await getAreas()

  if (!session) redirect('/sign-in')

  if (!isRRHHUser(session.user.email)) redirect('/empleos')

  return <AreaView areas={areas} />
}
