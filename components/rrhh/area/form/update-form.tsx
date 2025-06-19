'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { Trash } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { area } from '@/db/schema'
import { deleteArea, updateArea } from '@/actions/area'

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
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface UpdateFormProps {
  initialData: typeof area.$inferSelect
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del área es obligatorio')
    .max(100, 'El nombre del área no puede exceder los 100 caracteres')
})

const UpdateForm = ({ initialData }: UpdateFormProps) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name
    }
  })

  if (!initialData || !initialData.id) return null

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData()
        formData.append('name', data.name)

        const response = await updateArea(initialData.id, formData)

        if (response?.success) {
          toast.success('Área actualizada correctamente')
          router.push('/area')
        } else {
          toast.error(response?.message || 'Error al actualizar el área')

          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              form.setError(field as keyof typeof formSchema.shape, {
                type: 'manual',
                message: messages.join(', ')
              })
            })
          }
        }
      })
    } catch (error) {
      console.error('Error al actualizar el área:', error)
      toast.error('Error al actualizar el área. Por favor, inténtalo de nuevo.')
    }
  }

  const handleDelete = async () => {
    try {
      startTransition(async () => {
        const response = await deleteArea(initialData.id)

        if (response?.success) {
          toast.success('Área eliminada correctamente')
          router.push('/area')
        } else {
          toast.error(response?.message || 'Error al eliminar el área')
        }
      })
    } catch (error) {
      console.error('Error al eliminar el área:', error)
      toast.error('Error al eliminar el área. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-semibold md:text-4xl'>
            Actualizar area: {initialData.name}
          </h1>
          <p className='text-muted-foreground text-sm'>
            Aquí puedes actualizar los detalles del área seleccionada.
          </p>
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant='destructive'
              className='bg-red-50 text-red-600 hover:bg-red-100'
              disabled={isPending}
            >
              <Trash className='size-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará el área y no se podrá deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isPending}
                className='bg-red-600 hover:bg-red-700'
              >
                {isPending ? 'Eliminando...' : 'Eliminar área'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del área</FormLabel>

                <FormControl>
                  <Input
                    placeholder='Nombre del área'
                    {...field}
                    disabled={isPending}
                    autoFocus
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-x-4'>
            <Button type='submit' variant='primary' disabled={isPending}>
              {isPending ? 'Actualizando...' : 'Actualizar área'}
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push('/area')}
              disabled={isPending}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default UpdateForm
