'use client'

import { area } from '@/db/schema'

import { columns } from './table/columns'
import DataTable from './table/data-table'

interface AreaViewProps {
  areas: Array<typeof area.$inferSelect>
}

const AreaView = ({ areas }: AreaViewProps) => {
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

      <DataTable columns={columns} data={areas} />
    </>
  )
}

export default AreaView
