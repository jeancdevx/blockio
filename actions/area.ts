'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/db'
import { area } from '@/db/schema'
import { auth } from '@/lib/auth'

type ActionResult = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

const areaFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del área es obligatorio')
    .max(100, 'El nombre del área no puede exceder los 100 caracteres')
})

export const createArea = async (data: FormData) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
      return {
        success: false,
        message: 'No estás autenticado',
        errors: { session: ['No estás autenticado'] }
      } as ActionResult
    }

    // todo: check if user is RRHH

    const rawData = {
      name: data.get('name')?.toString().toLowerCase().trim() || ''
    }

    const validatedData = areaFormSchema.parse(rawData)

    const existingArea = await db.query.area.findFirst({
      where: eq(area.name, validatedData.name)
    })

    if (existingArea) {
      return {
        success: false,
        message: 'El área ya existe',
        errors: { name: ['El área ya existe'] }
      } as ActionResult
    }

    await db
      .insert(area)
      .values({
        name: validatedData.name
      })
      .returning()

    revalidatePath('/area')

    return {
      success: true,
      message: 'Área creada correctamente'
    } as ActionResult
  } catch (error) {
    console.error('Error al crear el área:', error)

    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach(err => {
        if (!errors[err.path[0]]) {
          errors[err.path[0]] = []
        }
        errors[err.path[0]].push(err.message)
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

export const updateArea = async (id: string, data: FormData) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
      return {
        success: false,
        message: 'No estás autenticado',
        errors: { session: ['No estás autenticado'] }
      } as ActionResult
    }

    // todo: check if user is RRHH

    const rawData = {
      name: data.get('name')?.toString().toLowerCase().trim() || ''
    }

    const validatedData = areaFormSchema.parse(rawData)

    const existingArea = await db.query.area.findFirst({
      where: eq(area.name, validatedData.name)
    })

    if (existingArea && existingArea.id !== id) {
      return {
        success: false,
        message: 'El área ya existe',
        errors: { name: ['El área ya existe'] }
      } as ActionResult
    }

    await db
      .update(area)
      .set({ name: validatedData.name })
      .where(eq(area.id, id))
      .returning()

    revalidatePath(`/area/${id}`)

    return {
      success: true,
      message: 'Área actualizada correctamente'
    } as ActionResult
  } catch (error) {
    console.error('Error al actualizar el área:', error)

    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach(err => {
        if (!errors[err.path[0]]) {
          errors[err.path[0]] = []
        }
        errors[err.path[0]].push(err.message)
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

export const deleteArea = async (id: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
      return {
        success: false,
        message: 'No estás autenticado',
        errors: { session: ['No estás autenticado'] }
      } as ActionResult
    }

    // todo: check if user is RRHH

    const areaToDelete = await db.query.area.findFirst({
      where: eq(area.id, id)
    })

    if (!areaToDelete) {
      return {
        success: false,
        message: 'Área no encontrada',
        errors: { id: ['Área no encontrada'] }
      } as ActionResult
    }

    await db.delete(area).where(eq(area.id, id))

    revalidatePath('/area')

    return {
      success: true,
      message: 'Área eliminada correctamente'
    } as ActionResult
  } catch (error) {
    console.error('Error al eliminar el área:', error)

    return {
      success: false,
      message: 'Error al procesar la solicitud'
    } as ActionResult
  }
}
