import { Suspense } from 'react'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Loader } from 'lucide-react'

import { getAreas } from '@/db/queries'
import { auth } from '@/lib/auth'

import CreateForm from '@/components/rrhh/jobs/form/create-form'

export default async function JobOfferCreatePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const areas = getAreas()

  if (!session) redirect('/empleos')

  return (
    <>
      <div className='space-y-1'>
        <h1 className='text-3xl font-semibold md:text-4xl'>
          Crear Oferta Laboral
        </h1>
        <p className='text-muted-foreground text-sm'>
          Completa el siguiente formulario para crear una nueva oferta laboral.
        </p>
      </div>

      <Suspense
        fallback={
          <div className='text-muted-foreground flex h-96 items-center justify-center text-lg'>
            <Loader className='size-4 animate-spin' />
          </div>
        }
      >
        <CreateForm allAreas={areas} />
      </Suspense>
    </>
  )
}
