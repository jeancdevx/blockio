import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import { SignInView } from '@/components/auth/views'

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!!session) redirect('/empleos')

  return <SignInView />
}
