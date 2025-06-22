'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CalendarIcon, ChevronsUpDown, Plus, Trash2, X } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { area, evaluation, jobOffer } from '@/db/schema'
import { cn } from '@/lib/utils'
import { updateJobOffer } from '@/actions/job-offer'

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

interface EditFormProps {
  jobOffer: typeof jobOffer.$inferSelect & {
    area: typeof area.$inferSelect
    evaluations?: Array<typeof evaluation.$inferSelect>
  }
  areas: Array<typeof area.$inferSelect>
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
  status: z.enum(['activa', 'vencida', 'cancelada', 'finalizada']),
  evaluations: z
    .array(
      z.object({
        type: z.enum(['fisica', 'psicologica', 'aptitud']),
        weight: z.number()
      })
    )
    .optional()
})

const EditForm = ({ jobOffer, areas }: EditFormProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const [isPending, startTransition] = useTransition()
  const evaluationsForForm = (jobOffer.evaluations || []).map(evaluation => ({
    type: evaluation.type,
    weight: parseFloat(evaluation.weight || '0')
  }))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: jobOffer.title,
      description: jobOffer.description,
      salary: jobOffer.salary || '',
      location: jobOffer.location,
      workType: jobOffer.workType,
      maxSelectedCandidates: jobOffer.maxSelectedCandidates,
      areaId: jobOffer.area.id,
      expiresAt: new Date(jobOffer.expiresAt),
      requirements: [...(jobOffer.requirements || [])],
      benefits: [...(jobOffer.benefits || [])],
      status: jobOffer.status,
      evaluations:
        evaluationsForForm.length > 0 ? evaluationsForForm : undefined
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
        formData.append('status', data.status)
        formData.append('evaluations', JSON.stringify(data.evaluations || []))

        const response = await updateJobOffer(jobOffer.id, formData)

        if (response?.success) {
          toast.success(response.message)
          router.push('/job-offer')
        } else {
          toast.error(
            response?.message || 'Error al actualizar la oferta laboral'
          )
          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              const fieldPath = field as keyof z.infer<typeof formSchema>
              form.setError(fieldPath, {
                type: 'server',
                message: messages[0]
              })
            })
          }
        }
      })
    } catch (error) {
      console.error('Error al actualizar la oferta laboral:', error)
      toast.error('Error al procesar la solicitud')
    }
  }

  const addRequirement = () => {
    const currentRequirements = form.getValues('requirements')
    form.setValue('requirements', [...currentRequirements, ''])
  }

  const removeRequirement = (index: number) => {
    const currentRequirements = form.getValues('requirements')
    const newRequirements = currentRequirements.filter((_, i) => i !== index)
    form.setValue('requirements', newRequirements)
  }

  const updateRequirement = (index: number, value: string) => {
    const currentRequirements = form.getValues('requirements')
    const newRequirements = [...currentRequirements]
    newRequirements[index] = value
    form.setValue('requirements', newRequirements)
  }

  const addBenefit = () => {
    const currentBenefits = form.getValues('benefits')
    form.setValue('benefits', [...currentBenefits, ''])
  }

  const removeBenefit = (index: number) => {
    const currentBenefits = form.getValues('benefits')
    const newBenefits = currentBenefits.filter((_, i) => i !== index)
    form.setValue('benefits', newBenefits)
  }

  const updateBenefit = (index: number, value: string) => {
    const currentBenefits = form.getValues('benefits')
    const newBenefits = [...currentBenefits]
    newBenefits[index] = value
    form.setValue('benefits', newBenefits)
  }

  // Funciones para manejar evaluaciones
  const addEvaluation = () => {
    const currentEvaluations = form.getValues('evaluations') || []
    form.setValue('evaluations', [
      ...currentEvaluations,
      { type: 'fisica' as const, weight: 0 }
    ])
  }

  const removeEvaluation = (index: number) => {
    const currentEvaluations = form.getValues('evaluations') || []
    const newEvaluations = currentEvaluations.filter((_, i) => i !== index)
    form.setValue(
      'evaluations',
      newEvaluations.length > 0 ? newEvaluations : undefined
    )
  }

  const updateEvaluationType = (
    index: number,
    type: 'fisica' | 'psicologica' | 'aptitud'
  ) => {
    const currentEvaluations = form.getValues('evaluations') || []
    const newEvaluations = [...currentEvaluations]
    newEvaluations[index] = { ...newEvaluations[index], type }
    form.setValue('evaluations', newEvaluations)
  }

  const updateEvaluationWeight = (index: number, weight: number) => {
    const currentEvaluations = form.getValues('evaluations') || []
    const newEvaluations = [...currentEvaluations]
    newEvaluations[index] = { ...newEvaluations[index], weight }
    form.setValue('evaluations', newEvaluations)
  }

  const requirements = form.watch('requirements')
  const benefits = form.watch('benefits')
  const evaluations = form.watch('evaluations')

  // Calcular peso total de evaluaciones
  const totalWeight =
    evaluations?.reduce((sum, evaluation) => sum + evaluation.weight, 0) || 0

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información básica</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título de la oferta</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ej: Desarrollador Frontend'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe las responsabilidades y tareas del puesto...'
                        className='min-h-[100px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='salary'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salario</FormLabel>
                      <FormControl>
                        <Input placeholder='Ej: $50,000 - $70,000' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ej: Ciudad de México, CDMX'
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
                      <FormLabel>Tipo de trabajo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecciona el tipo' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipos de trabajo</SelectLabel>
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
                  name='maxSelectedCandidates'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Máximo candidatos</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min='1'
                          max='100'
                          placeholder='1'
                          {...field}
                          onChange={e =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='areaId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              aria-expanded={open}
                              className='w-full justify-between'
                            >
                              {field.value
                                ? areas.find(area => area.id === field.value)
                                    ?.name
                                : 'Selecciona un área...'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0'>
                          <Command>
                            <CommandInput placeholder='Buscar área...' />
                            <CommandList>
                              <CommandEmpty>
                                No se encontraron áreas.
                              </CommandEmpty>
                              <CommandGroup>
                                {areas.map(area => (
                                  <CommandItem
                                    key={area.id}
                                    value={area.name}
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
              </div>

              <FormField
                control={form.control}
                name='expiresAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de expiración</FormLabel>
                    <Popover
                      open={openDatePicker}
                      onOpenChange={setOpenDatePicker}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
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
                          disabled={date => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Requisitos */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                Requisitos
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addRequirement}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Agregar requisito
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {requirements.map((requirement, index) => (
                <div key={index} className='flex gap-2'>
                  <Input
                    placeholder='Ej: Licenciatura en Sistemas'
                    value={requirement}
                    onChange={e => updateRequirement(index, e.target.value)}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => removeRequirement(index)}
                    disabled={requirements.length <= 1}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ))}
              <FormMessage>
                {form.formState.errors.requirements?.message}
              </FormMessage>
            </CardContent>
          </Card>

          {/* Beneficios */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                Beneficios
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addBenefit}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Agregar beneficio
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {benefits.map((benefit, index) => (
                <div key={index} className='flex gap-2'>
                  <Input
                    placeholder='Ej: Seguro médico'
                    value={benefit}
                    onChange={e => updateBenefit(index, e.target.value)}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => removeBenefit(index)}
                    disabled={benefits.length <= 1}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ))}
              <FormMessage>
                {form.formState.errors.benefits?.message}
              </FormMessage>
            </CardContent>
          </Card>

          {/* Evaluaciones */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                Evaluaciones (opcional)
                <div className='flex items-center gap-2'>
                  {evaluations && evaluations.length > 0 && (
                    <span
                      className={cn(
                        'text-sm',
                        totalWeight === 100 ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      Total: {totalWeight}%
                    </span>
                  )}
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={addEvaluation}
                    disabled={evaluations?.length === 3}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar evaluación
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {evaluations?.map((evaluation, index) => (
                <div key={index} className='flex items-end gap-2'>
                  <div className='flex-1'>
                    <label className='text-sm font-medium'>Tipo</label>
                    <Select
                      value={evaluation.type}
                      onValueChange={(
                        value: 'fisica' | 'psicologica' | 'aptitud'
                      ) => updateEvaluationType(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='fisica'>Física</SelectItem>
                        <SelectItem value='psicologica'>Psicológica</SelectItem>
                        <SelectItem value='aptitud'>Aptitud</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='w-24'>
                    <label className='text-sm font-medium'>Peso (%)</label>
                    <Input
                      type='number'
                      min='1'
                      max='100'
                      value={evaluation.weight}
                      onChange={e =>
                        updateEvaluationWeight(
                          index,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => removeEvaluation(index)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
              {evaluations && evaluations.length > 0 && totalWeight !== 100 && (
                <p className='text-sm text-red-600'>
                  El peso total de las evaluaciones debe ser 100%
                </p>
              )}
              <FormMessage>
                {form.formState.errors.evaluations?.message}
              </FormMessage>
            </CardContent>
          </Card>

          <div className='grid gap-4 md:grid-cols-2'>
            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? 'Actualizando...' : 'Actualizar oferta laboral'}
            </Button>
            <Button type='button' variant='outline' asChild className='w-full'>
              <Link href='/job-offer'>cancelar</Link>
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default EditForm
