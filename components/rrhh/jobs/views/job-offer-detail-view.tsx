'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CalendarDays, Clock, Edit, MapPin, Trash2, Users } from 'lucide-react'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'

import { deleteJobOffer } from '@/actions/job-offer'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface JobOfferDetailViewProps {
  jobOffer: {
    id: string
    title: string
    description: string
    salary: string
    location: string
    workType: 'tiempo_completo' | 'medio_tiempo' | 'contrato' | 'practicas'
    maxSelectedCandidates: number
    status: 'activa' | 'vencida' | 'cancelada' | 'finalizada'
    requirements: string[]
    benefits: string[]
    expiresAt: Date
    createdAt: Date
    area: {
      id: string
      name: string
    }
    evaluations: Array<{
      id: string
      type: 'fisica' | 'psicologica' | 'aptitud'
      weight: string
    }>
  }
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

const statusColors = {
  activa: 'bg-green-100 text-green-800',
  vencida: 'bg-red-100 text-red-800',
  cancelada: 'bg-gray-100 text-gray-800',
  finalizada: 'bg-blue-100 text-blue-800'
}

const evaluationTypeLabels = {
  fisica: 'Física',
  psicologica: 'Psicológica',
  aptitud: 'Aptitud'
}

const JobOfferDetailView = ({ jobOffer }: JobOfferDetailViewProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteJobOffer(jobOffer.id)

        if (response?.success) {
          toast.success(response.message)
          router.push('/job-offer')
        } else {
          toast.error(
            response?.message || 'Error al eliminar la oferta laboral'
          )
        }
      } catch (error) {
        console.error('Error al eliminar la oferta laboral:', error)
        toast.error('Error al procesar la solicitud')
      } finally {
        setOpen(false)
      }
    })
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-semibold md:text-5xl'>
            {jobOffer.title}
          </h1>
          <p className='text-muted-foreground text-sm'>
            Área: {jobOffer.area.name}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Badge className={statusColors[jobOffer.status]}>
            {statusLabels[jobOffer.status]}
          </Badge>
          <Button asChild variant='outline' size='sm'>
            <Link href={`/job-offer/${jobOffer.id}/edit`}>
              <Edit className='mr-2 h-4 w-4' />
              Editar
            </Link>
          </Button>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' size='sm'>
                <Trash2 className='mr-2 h-4 w-4' />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará
                  permanentemente la oferta laboral &quot;{jobOffer.title}&quot;
                  y todos los datos asociados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isPending}
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                >
                  {isPending ? 'Eliminando...' : 'Eliminar'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Información básica */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-2'>
              <MapPin className='text-muted-foreground h-4 w-4' />
              <span className='text-sm font-medium'>Ubicación:</span>
              <span className='text-sm'>{jobOffer.location}</span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='text-muted-foreground h-4 w-4' />
              <span className='text-sm font-medium'>Tipo:</span>
              <span className='text-sm'>
                {workTypeLabels[jobOffer.workType]}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='text-muted-foreground h-4 w-4' />
              <span className='text-sm font-medium'>Máximo candidatos:</span>
              <span className='text-sm'>{jobOffer.maxSelectedCandidates}</span>
            </div>

            <div className='flex items-center gap-2'>
              <CalendarDays className='text-muted-foreground h-4 w-4' />
              <span className='text-sm font-medium'>Expira:</span>
              <span className='text-sm'>
                {format(new Date(jobOffer.expiresAt), "d 'de' MMMM 'de' yyyy", {
                  locale: es
                })}
              </span>
            </div>

            <div>
              <span className='text-sm font-medium'>Salario:</span>
              <p className='mt-1 text-sm'>{jobOffer.salary}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm whitespace-pre-wrap'>
              {jobOffer.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Requisitos */}
      <Card>
        <CardHeader>
          <CardTitle>Requisitos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {jobOffer.requirements.map((requirement, index) => (
              <li key={index} className='flex items-start gap-2 text-sm'>
                <span className='bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full' />
                {requirement}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Beneficios */}
      <Card>
        <CardHeader>
          <CardTitle>Beneficios</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {jobOffer.benefits.map((benefit, index) => (
              <li key={index} className='flex items-start gap-2 text-sm'>
                <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500' />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Evaluaciones */}
      {jobOffer.evaluations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Evaluaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-3'>
              {jobOffer.evaluations.map(evaluation => (
                <div key={evaluation.id} className='rounded-lg border p-4'>
                  <h4 className='text-sm font-medium'>
                    {evaluationTypeLabels[evaluation.type]}
                  </h4>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    Peso: {evaluation.weight}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>
            Creada el{' '}
            {format(
              new Date(jobOffer.createdAt),
              "d 'de' MMMM 'de' yyyy 'a las' HH:mm",
              { locale: es }
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default JobOfferDetailView
