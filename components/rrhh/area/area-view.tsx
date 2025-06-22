'use client'

import { use } from 'react'

import { area } from '@/db/schema'

import { columns } from './table/columns'
import DataTable from './table/data-table'

interface AreaViewProps {
  areas: Promise<Array<typeof area.$inferSelect>>
}

const AreaView = ({ areas }: AreaViewProps) => {
  const allAreas = use(areas)

  return <DataTable columns={columns} data={allAreas} />
}

export default AreaView
