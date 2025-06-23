'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createArea } from '@/actions/area'

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

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del área es obligatorio')
    .max(100, 'El nombre del área no puede exceder los 100 caracteres')
})

const CreateForm = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData()
        formData.append('name', data.name)

        const response = await createArea(formData)

        if (response?.success) {
          toast.success('Área creada correctamente')
          router.push('/area')
        } else {
          toast.error(response?.message || 'Error al crear el área')

          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              if (field === 'name') {
                form.setError('name', {
                  type: 'manual',
                  message: messages.join(', ')
                })
              }
            })
          }
        }
      })
    } catch (error) {
      console.error('Error al crear el área:', error)
      toast.error('Error al procesar la solicitud')
    }
  }

  return (
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
                  placeholder='ej. Recursos Humanos, Ingenieria, Electronica...'
                  disabled={isPending}
                  autoFocus
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-x-4'>
          <Button type='submit' variant='primary' disabled={isPending}>
            {isPending ? 'Creando...' : 'Crear área'}
          </Button>

          <Button
            variant='outline'
            type='button'
            disabled={isPending}
            onClick={() => router.push('/area')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateForm
