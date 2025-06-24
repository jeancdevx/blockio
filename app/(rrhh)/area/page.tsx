import { Suspense } from 'react'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAreas } from '@/db/queries'
import { auth } from '@/lib/auth'

import AreaView from '@/components/rrhh/area'
import DataTableSkeleton from '@/components/rrhh/area/table/data-table-skeleton'

export default async function AreaPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/sign-in')

  const areas = getAreas()

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

      <Suspense fallback={<DataTableSkeleton />}>
        <AreaView areas={areas} />
      </Suspense>
    </>
  )
}
