import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import CreateForm from '@/components/rrhh/area/form/create-form'

export default async function AreaCreatePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/sign-in')

  return (
    <>
      <div className='space-y-1'>
        <h1 className='text-3xl font-semibold md:text-5xl'>Crear nueva área</h1>
        <p className='text-muted-foreground text-sm'>
          Crea una nueva area para asignarle ofertas de trabajo.
        </p>
      </div>

      <CreateForm />
    </>
  )
}
