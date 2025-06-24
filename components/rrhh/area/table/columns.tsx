'use client'

import Link from 'next/link'

import { ArrowUpDown, Copy, Edit, EllipsisVertical } from 'lucide-react'

import { ColumnDef } from '@tanstack/react-table'
import { format, formatDate } from 'date-fns'
import { toast } from 'sonner'

import { area } from '@/db/schema'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<typeof area.$inferSelect>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <p className='max-w-[100px] overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap'>
        {row.getValue('name')}
      </p>
    )
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className='text-center font-semibold'>Creado</div>,
    cell: ({ row }) => (
      <p className='text-center'>
        {formatDate(row.getValue('createdAt'), 'dd/MM/yyyy')}
      </p>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className='text-center font-semibold'>Actualizado</div>,
    cell: ({ row }) => (
      <p className='text-center'>
        {format(row.getValue('updatedAt'), 'dd/MM/yyyy')}
      </p>
    )
  },
  {
    id: 'actions',
    header: () => <div className='text-center font-semibold'>Acciones</div>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex w-full items-center justify-center'>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <EllipsisVertical className='h-4 w-4' />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <div
              className='flex'
              onClick={() => {
                navigator.clipboard.writeText(row.original.name)
                toast.success(
                  `Área "${row.original.name}" copiada al portapapeles`,
                  {
                    duration: 2000
                  }
                )
              }}
            >
              <Copy className='mr-2 h-4 w-4' />
              Copiar
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={`/area/${row.original.id}`}
              passHref
              className='flex w-full'
            >
              <Edit className='mr-2 h-4 w-4' />
              <span>Editar</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]
