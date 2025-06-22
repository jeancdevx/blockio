'use client'

import Link from 'next/link'

import { Edit, Eye } from 'lucide-react'

import { formatDate } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
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

interface JobOfferListViewProps {
  jobOffers: Array<{
    id: string
    title: string
    description: string
    salary: string | null
    location: string
    workType: 'tiempo_completo' | 'medio_tiempo' | 'contrato' | 'practicas'
    status: 'activa' | 'vencida' | 'cancelada' | 'finalizada'
    expiresAt: Date
    maxSelectedCandidates: number
    requirements: string[]
    benefits: string[]
    createdAt: Date
    updatedAt: Date
    areaId: string
    area: {
      id: string
      name: string
    } | null
  }>
}

const workTypeLabels = {
  tiempo_completo: 'Tiempo Completo',
  medio_tiempo: 'Medio Tiempo',
  contrato: 'Contrato',
  practicas: 'Prácticas'
}

const statusLabels = {
  activa: 'Activa',
  vencida: 'Vencida',
  cancelada: 'Cancelada',
  finalizada: 'Finalizada'
}

const statusVariants = {
  activa: 'default',
  vencida: 'destructive',
  cancelada: 'secondary',
  finalizada: 'outline'
} as const

const JobOfferListView = ({ jobOffers }: JobOfferListViewProps) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-3xl font-semibold'>Lista de ofertas laborales</h1>
          <p className='text-muted-foreground text-sm'>
            Aquí puedes ver todas las ofertas laborales registradas en el
            sistema.
          </p>
        </div>

        <Link href='/job-offer/create' passHref>
          <Button asChild>
            <span>Crear oferta laboral</span>
          </Button>
        </Link>
      </div>

      <Table>
        <TableCaption>
          {jobOffers.length > 0
            ? `Total de ofertas laborales: ${jobOffers.length}`
            : 'No hay ofertas laborales registradas.'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Título</TableHead>
            <TableHead className='font-semibold'>Área</TableHead>
            <TableHead className='font-semibold'>Ubicación</TableHead>
            <TableHead className='font-semibold'>Tipo</TableHead>
            <TableHead className='font-semibold'>Estado</TableHead>
            <TableHead className='font-semibold'>Salario</TableHead>
            <TableHead className='font-semibold'>Vence</TableHead>
            <TableHead className='font-semibold'>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobOffers.map(jobOffer => (
            <TableRow key={jobOffer.id}>
              <TableCell className='font-medium'>{jobOffer.title}</TableCell>
              <TableCell>{jobOffer.area?.name || 'Sin área'}</TableCell>
              <TableCell>{jobOffer.location}</TableCell>
              <TableCell>{workTypeLabels[jobOffer.workType]}</TableCell>
              <TableCell>
                <Badge variant={statusVariants[jobOffer.status]}>
                  {statusLabels[jobOffer.status]}
                </Badge>
              </TableCell>
              <TableCell>
                {jobOffer.salary ? `$${jobOffer.salary}` : 'No especificado'}
              </TableCell>
              <TableCell>{formatDate(jobOffer.expiresAt)}</TableCell>
              <TableCell className='flex items-center gap-x-2'>
                <Link href={`/job-offer/${jobOffer.id}`}>
                  <Button variant='outline' size='sm'>
                    <Eye className='h-4 w-4' />
                  </Button>
                </Link>
                <Link href={`/job-offer/${jobOffer.id}/edit`}>
                  <Button variant='outline' size='sm'>
                    <Edit className='h-4 w-4' />
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

export default JobOfferListView
