import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import EmpleoView from '@/components/empleos/views'

export default async function EmpleosPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/sign-in')

  return <EmpleoView />
}
