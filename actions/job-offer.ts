'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/db'
import { area, evaluation, jobOffer } from '@/db/schema'
import { auth } from '@/lib/auth'

type ActionResult = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  data?: unknown
}

const createJobOfferSchema = z.object({
  title: z
    .string()
    .min(1, 'El título de la oferta laboral es requerido')
    .max(150, 'El título no puede exceder los 150 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción de la oferta laboral es requerida')
    .max(500, 'La descripción no puede exceder los 500 caracteres'),
  salary: z
    .string()
    .min(1, 'El salario de la oferta laboral es requerido')
    .max(20, 'El salario no puede exceder los 20 caracteres'),
  location: z
    .string()
    .min(1, 'La ubicación de la oferta laboral es requerida')
    .max(100, 'La ubicación no puede exceder los 100 caracteres'),
  workType: z.enum(
    ['tiempo_completo', 'medio_tiempo', 'contrato', 'practicas'],
    {
      errorMap: () => ({ message: 'El tipo de trabajo es requerido' })
    }
  ),
  maxSelectedCandidates: z.coerce
    .number()
    .min(1, 'El número máximo de candidatos debe ser al menos 1')
    .max(100, 'El número máximo de candidatos no puede exceder 100'),
  areaId: z.string().min(1, 'El área de la oferta laboral es requerida'),
  expiresAt: z.coerce.date({
    required_error: 'La fecha de expiración es requerida'
  }),
  requirements: z
    .array(z.string().min(1, 'El requisito no puede estar vacío'))
    .min(1, 'Debe agregar al menos un requisito'),
  benefits: z
    .array(z.string().min(1, 'El beneficio no puede estar vacío'))
    .min(1, 'Debe agregar al menos un beneficio'),
  evaluations: z
    .array(
      z.object({
        type: z.enum(['fisica', 'psicologica', 'aptitud']),
        weight: z
          .number()
          .min(1, 'El peso de la evaluación debe ser al menos 1')
          .max(100, 'El peso de la evaluación no puede exceder 100')
      })
    )
    .optional()
    .refine(
      evaluations => {
        if (!evaluations || evaluations.length === 0) return true
        const totalWeight = evaluations.reduce(
          (sum, evaluation) => sum + evaluation.weight,
          0
        )
        return totalWeight === 100
      },
      {
        message: 'El peso total de las evaluaciones debe ser 100%'
      }
    )
    .refine(
      evaluations => {
        if (!evaluations || evaluations.length === 0) return true
        const types = evaluations.map(ev => ev.type)
        return types.length === new Set(types).size
      },
      {
        message: 'No puede haber evaluaciones duplicadas del mismo tipo'
      }
    )
})

export async function createJobOffer(
  formData: FormData
): Promise<ActionResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
      return {
        success: false,
        message: 'No estás autenticado',
        errors: { session: ['No estás autenticado'] }
      } as ActionResult
    }

    const rawData = {
      title: formData.get('title')?.toString().trim() || '',
      description: formData.get('description')?.toString().trim() || '',
      salary: formData.get('salary')?.toString().trim() || '',
      location: formData.get('location')?.toString().trim() || '',
      workType: formData.get('workType')?.toString() || '',
      maxSelectedCandidates:
        formData.get('maxSelectedCandidates')?.toString() || '1',
      areaId: formData.get('areaId')?.toString() || '',
      expiresAt: formData.get('expiresAt')?.toString() || '',
      requirements: JSON.parse(
        formData.get('requirements')?.toString() || '[]'
      ) as string[],
      benefits: JSON.parse(
        formData.get('benefits')?.toString() || '[]'
      ) as string[],
      evaluations: JSON.parse(
        formData.get('evaluations')?.toString() || '[]'
      ) as Array<{
        type: 'fisica' | 'psicologica' | 'aptitud'
        weight: number
      }>
    }

    const existingArea = await db.query.area.findFirst({
      where: eq(area.id, rawData.areaId)
    })

    if (!existingArea) {
      return {
        success: false,
        message: 'El área seleccionada no existe',
        errors: { areaId: ['El área seleccionada no existe'] }
      } as ActionResult
    }

    const expiresAt = new Date(rawData.expiresAt)
    const today = new Date()
    const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

    if (expiresAt < today || expiresAt > maxDate) {
      return {
        success: false,
        message:
          'La fecha de expiración debe ser entre hoy y los próximos 30 días',
        errors: {
          expiresAt: [
            'La fecha de expiración debe ser entre hoy y los próximos 30 días'
          ]
        }
      } as ActionResult
    }

    const validatedData = createJobOfferSchema.parse(rawData)

    const [newJobOffer] = await db
      .insert(jobOffer)
      .values({
        title: validatedData.title,
        description: validatedData.description,
        salary: validatedData.salary,
        location: validatedData.location,
        workType: validatedData.workType,
        maxSelectedCandidates: validatedData.maxSelectedCandidates,
        areaId: validatedData.areaId,
        expiresAt: validatedData.expiresAt,
        requirements: validatedData.requirements,
        benefits: validatedData.benefits,
        status: 'activa'
      })
      .returning()

    if (validatedData.evaluations && validatedData.evaluations.length > 0) {
      await db.insert(evaluation).values(
        validatedData.evaluations.map(ev => ({
          jobOfferId: newJobOffer.id,
          type: ev.type,
          weight: ev.weight.toString()
        }))
      )
    }

    revalidatePath('/rrhh/job-offer')

    return {
      success: true,
      message: 'Oferta laboral creada exitosamente',
      data: newJobOffer
    } as ActionResult
  } catch (error) {
    console.error('Error al crear la oferta laboral:', error)

    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach(err => {
        const field = err.path.join('.')
        if (!errors[field]) {
          errors[field] = []
        }
        errors[field].push(err.message)
      })

      return {
        success: false,
        message: 'Errores de validación',
        errors
      } as ActionResult
    }

    return {
      success: false,
      message: 'Error al procesar la solicitud'
    } as ActionResult
  }
}
