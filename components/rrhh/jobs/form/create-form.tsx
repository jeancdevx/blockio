'use client'

import { use, useState, useTransition } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CalendarIcon, ChevronsUpDown, Plus, Trash2, X } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { area } from '@/db/schema'
import { cn } from '@/lib/utils'
import { createJobOffer } from '@/actions/job-offer'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface CreateFormProps {
  allAreas: Promise<Array<typeof area.$inferSelect>>
}

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  salary: z.string().min(1, 'El salario es requerido'),
  location: z.string().min(1, 'La ubicación es requerida'),
  workType: z.enum([
    'tiempo_completo',
    'medio_tiempo',
    'contrato',
    'practicas'
  ]),
  maxSelectedCandidates: z.coerce.number().min(1),
  areaId: z.string().min(1, 'El área es requerida'),
  expiresAt: z.coerce.date(),
  requirements: z
    .array(z.string())
    .min(1, 'Debe agregar al menos un requisito'),
  benefits: z.array(z.string()).min(1, 'Debe agregar al menos un beneficio'),
  evaluations: z
    .array(
      z.object({
        type: z.enum(['fisica', 'psicologica', 'aptitud']),
        weight: z.number()
      })
    )
    .optional()
})

const CreateForm = ({ allAreas }: CreateFormProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const areas = use(allAreas)

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      salary: '',
      location: '',
      workType: 'tiempo_completo',
      maxSelectedCandidates: 1,
      areaId: '',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      requirements: [],
      benefits: [],
      evaluations: []
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('salary', data.salary)
        formData.append('location', data.location)
        formData.append('workType', data.workType)
        formData.append(
          'maxSelectedCandidates',
          data.maxSelectedCandidates.toString()
        )
        formData.append('areaId', data.areaId)
        formData.append('expiresAt', data.expiresAt.toISOString())
        formData.append('requirements', JSON.stringify(data.requirements))
        formData.append('benefits', JSON.stringify(data.benefits))
        if (data.evaluations && data.evaluations.length > 0) {
          formData.append('evaluations', JSON.stringify(data.evaluations))
        }

        const response = await createJobOffer(formData)

        if (response?.success) {
          toast.success(response.message)
          form.reset()
          router.push('/job-offer')
        } else {
          toast.error(response?.message || 'Error al crear la oferta laboral')

          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              const fieldPath = field as keyof z.infer<typeof formSchema>

              if (fieldPath in form.formState.defaultValues!) {
                form.setError(fieldPath, {
                  type: 'manual',
                  message: messages.join(', ')
                })
              }
            })
          }
        }
      })
    } catch (error) {
      console.error('Error al crear la oferta laboral:', error)
      toast.error('Error al procesar la solicitud')
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-4 md:grid-cols-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Título de la Oferta Laboral</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='ej. Ingeniero de Mantenimiento, Jefe de Obra, Gerente de Proyectos, etc.'
                      autoFocus
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='salary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salario</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='ej. 1500, 2000, 2500, etc.'
                      type='number'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción de la Oferta Laboral</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder='ej. Descripción detallada de la oferta laboral, incluyendo responsabilidades, etc.'
                    disabled={isPending}
                    className='h-32 resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid gap-4 md:grid-cols-3'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Ubicación</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='ej. Ciudad, País'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='maxSelectedCandidates'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Número Máximo de Candidatos Seleccionados
                  </FormLabel>

                  <FormControl>
                    <Input
                      type='number'
                      placeholder='ej. 1, 2, 3, etc.'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <FormField
              control={form.control}
              name='workType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Trabajo</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecciona un tipo de trabajo' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipos de Trabajo</SelectLabel>
                        <SelectItem value='tiempo_completo'>
                          Tiempo Completo
                        </SelectItem>
                        <SelectItem value='medio_tiempo'>
                          Medio Tiempo
                        </SelectItem>
                        <SelectItem value='contrato'>Contrato</SelectItem>
                        <SelectItem value='practicas'>Prácticas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='areaId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de la Oferta Laboral</FormLabel>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isPending}
                        >
                          {field.value
                            ? areas.find(area => area.id === field.value)?.name
                            : 'Selecciona un área'}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className='w-[300px] p-0' align='start'>
                      <Command>
                        <CommandInput placeholder='Buscar área...' />
                        <CommandList>
                          <CommandEmpty>No se encontraron áreas</CommandEmpty>
                          <CommandGroup>
                            {areas.map(area => (
                              <CommandItem
                                key={area.id}
                                value={area.id}
                                onSelect={() => {
                                  field.onChange(area.id)
                                  setOpen(false)
                                }}
                              >
                                {area.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='expiresAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Expiración</FormLabel>

                  <Popover
                    open={openDatePicker}
                    onOpenChange={setOpenDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isPending}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={date => {
                          field.onChange(date)
                          setOpenDatePicker(false)
                        }}
                        disabled={date => {
                          const today = new Date()
                          const maxDate = new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate() + 30
                          )
                          return date < today || date > maxDate
                        }}
                        captionLayout='dropdown'
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='requirements'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requisitos</FormLabel>
                <div className='space-y-2'>
                  {field.value.length > 0 ? (
                    field.value.map((requirement, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <Input
                          value={requirement}
                          onChange={e => {
                            const newRequirements = [...field.value]
                            newRequirements[index] = e.target.value
                            field.onChange(newRequirements)
                          }}
                          placeholder='Escribe un requisito'
                          disabled={isPending}
                        />
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          onClick={() => {
                            const newRequirements = field.value.filter(
                              (_, i) => i !== index
                            )
                            field.onChange(newRequirements)
                          }}
                          disabled={isPending}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className='text-muted-foreground text-sm'>
                      No se han agregado requisitos. Debe agregar al menos uno.
                    </div>
                  )}
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      field.onChange([...field.value, ''])
                    }}
                    disabled={isPending}
                    className='w-full'
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar Requisito
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='benefits'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beneficios</FormLabel>
                <div className='space-y-2'>
                  {field.value.length > 0 ? (
                    field.value.map((benefit, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <Input
                          value={benefit}
                          onChange={e => {
                            const newBenefits = [...field.value]
                            newBenefits[index] = e.target.value
                            field.onChange(newBenefits)
                          }}
                          placeholder='Escribe un beneficio'
                          disabled={isPending}
                        />
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          onClick={() => {
                            const newBenefits = field.value.filter(
                              (_, i) => i !== index
                            )
                            field.onChange(newBenefits)
                          }}
                          disabled={isPending}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className='text-muted-foreground text-sm'>
                      No se han agregado beneficios. Debe agregar al menos uno.
                    </div>
                  )}
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      field.onChange([...field.value, ''])
                    }}
                    disabled={isPending}
                    className='w-full'
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar Beneficio
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='evaluations'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evaluaciones (Opcional)</FormLabel>
                <div className='space-y-3'>
                  {field.value && field.value.length > 0 ? (
                    <>
                      {field.value.map((evaluation, index) => (
                        <Card key={index}>
                          <CardHeader className='pb-3'>
                            <div className='flex items-center justify-between'>
                              <CardTitle className='text-sm'>
                                Evaluación {index + 1} -{' '}
                                {evaluation.type === 'fisica'
                                  ? 'Física'
                                  : evaluation.type === 'psicologica'
                                    ? 'Psicológica'
                                    : 'Aptitud'}
                              </CardTitle>
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={() => {
                                  const newEvaluations =
                                    field.value?.filter(
                                      (_, i) => i !== index
                                    ) || []
                                  field.onChange(newEvaluations)
                                }}
                                disabled={isPending}
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className='space-y-3'>
                            <div className='grid gap-3 md:grid-cols-2'>
                              <div>
                                <label className='text-sm font-medium'>
                                  Tipo
                                </label>
                                <Select
                                  value={evaluation.type}
                                  onValueChange={value => {
                                    const newEvaluations = [
                                      ...(field.value || [])
                                    ]
                                    newEvaluations[index] = {
                                      ...evaluation,
                                      type: value as
                                        | 'fisica'
                                        | 'psicologica'
                                        | 'aptitud'
                                    }
                                    field.onChange(newEvaluations)
                                  }}
                                  disabled={isPending}
                                >
                                  <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Selecciona tipo' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value='fisica'>
                                      Física
                                    </SelectItem>
                                    <SelectItem value='psicologica'>
                                      Psicológica
                                    </SelectItem>
                                    <SelectItem value='aptitud'>
                                      Aptitud
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className='text-sm font-medium'>
                                  Peso (%)
                                </label>
                                <Input
                                  type='number'
                                  min='1'
                                  max='100'
                                  value={evaluation.weight}
                                  onChange={e => {
                                    const newEvaluations = [
                                      ...(field.value || [])
                                    ]
                                    newEvaluations[index] = {
                                      ...evaluation,
                                      weight: parseInt(e.target.value) || 0
                                    }
                                    field.onChange(newEvaluations)
                                  }}
                                  placeholder='Peso de la evaluación'
                                  disabled={isPending}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Mostrar peso total */}
                      <div className='bg-muted/50 flex items-center justify-between rounded-lg p-3'>
                        <div className='text-sm font-medium'>
                          Peso total de evaluaciones:
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            field.value.reduce(
                              (sum, ev) => sum + (ev.weight || 0),
                              0
                            ) === 100
                              ? 'text-green-600'
                              : 'text-red-500'
                          }`}
                        >
                          {field.value.reduce(
                            (sum, ev) => sum + (ev.weight || 0),
                            0
                          )}
                          %
                          {field.value.reduce(
                            (sum, ev) => sum + (ev.weight || 0),
                            0
                          ) !== 100 && (
                            <span className='ml-2 text-xs'>
                              (Debe sumar 100%)
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className='text-muted-foreground text-sm'>
                      No se han agregado evaluaciones. Puedes agregar
                      evaluaciones físicas, psicológicas o de aptitud.
                    </div>
                  )}

                  <div className='grid gap-2 sm:grid-cols-3'>
                    {['fisica', 'psicologica', 'aptitud'].map(type => {
                      const existingTypes =
                        field.value?.map(ev => ev.type) || []
                      const isDisabled = existingTypes.includes(
                        type as 'fisica' | 'psicologica' | 'aptitud'
                      )

                      return (
                        <Button
                          key={type}
                          type='button'
                          variant='outline'
                          onClick={() => {
                            const remainingWeight =
                              100 -
                              (field.value?.reduce(
                                (sum, ev) => sum + (ev.weight || 0),
                                0
                              ) || 0)
                            const newEvaluation = {
                              type: type as
                                | 'fisica'
                                | 'psicologica'
                                | 'aptitud',
                              weight: Math.max(1, remainingWeight)
                            }
                            field.onChange([
                              ...(field.value || []),
                              newEvaluation
                            ])
                          }}
                          disabled={isPending || isDisabled}
                          className='w-full'
                        >
                          <Plus className='mr-2 h-4 w-4' />
                          {type === 'fisica'
                            ? 'Física'
                            : type === 'psicologica'
                              ? 'Psicológica'
                              : 'Aptitud'}
                        </Button>
                      )
                    })}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid gap-4 md:grid-cols-2'>
            <Button
              type='submit'
              className='w-full md:w-auto'
              disabled={isPending}
            >
              {isPending ? 'Creando...' : 'Crear Oferta Laboral'}
            </Button>

            <Link href='/job-offer' className='w-full' passHref>
              <Button variant='outline' className='w-full' asChild>
                <span>Cancelar</span>
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CreateForm
