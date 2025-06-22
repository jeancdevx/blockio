import { Suspense } from 'react'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Loader } from 'lucide-react'

import { getAreas } from '@/db/queries'
import { auth } from '@/lib/auth'

import AreaView from '@/components/rrhh/area'

export default async function AreaPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const areas = getAreas()

  if (!session) redirect('/sign-in')

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-3xl font-semibold'>Lista de areas</h1>
          <p className='text-muted-foreground text-sm'>
            Aquí puedes ver todas las áreas registradas en el sistema.
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className='text-muted-foreground flex h-96 items-center justify-center text-lg'>
            <Loader className='size-4 animate-spin' />
          </div>
        }
      >
        <AreaView areas={areas} />
      </Suspense>
    </>
  )
}
