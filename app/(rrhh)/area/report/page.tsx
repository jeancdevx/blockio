import { Suspense } from 'react'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import JobOfferByArea from '@/components/rrhh/area/job-offer-by-area'

export default async function ReportPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('sign-in')

  return (
    <div className='mx-auto space-y-8 py-8'>
      <div className='flex flex-col items-center justify-center space-y-2 text-center'>
        <h1 className='text-sidebar-primary text-3xl font-bold md:text-4xl'>
          Reportes de Área
        </h1>
        <p className='text-sidebar-ring max-w-2xl text-sm'>
          Análisis detallado de las ofertas laborales por área. Visualiza la
          evolución temporal y el resumen total de ofertas creadas en cada área
          de la organización.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Suspense fallback={<div>Cargando gráfico...</div>}>
          <JobOfferByArea />
        </Suspense>
      </div>
    </div>
  )
}
