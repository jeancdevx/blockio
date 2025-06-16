'use client'

import Link from 'next/link'

import { Edit } from 'lucide-react'

import { area } from '@/db/schema'
import { formatDate } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

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

        <Link href='/area/create' passHref>
          <Button asChild>
            <span>Crear area</span>
          </Button>
        </Link>
      </div>

      <Table>
        <TableCaption>
          {areas.length > 0
            ? `Total de áreas: ${areas.length}`
            : 'No hay áreas registradas.'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Nombre</TableHead>
            {/* <TableHead className='font-semibold'>Ofertas Laborales</TableHead> */}
            <TableHead className='font-semibold'>Creado</TableHead>
            <TableHead className='font-semibold'>Actualizado</TableHead>
            <TableHead className='font-semibold'>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {areas.map(area => (
            <TableRow key={area.id}>
              <TableCell>{area.name}</TableCell>
              {/* <TableCell>{area}</TableCell> */}
              <TableCell>{formatDate(area.createdAt)}</TableCell>
              <TableCell>{formatDate(area.updatedAt)}</TableCell>
              <TableCell className='flex items-center gap-x-2'>
                <Link href={`/area/${area.id}`}>
                  <Button variant='outline'>
                    <Edit />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter />
      </Table>
    </>
  )
}

export default AreaView
