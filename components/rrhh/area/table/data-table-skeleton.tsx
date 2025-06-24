import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const DataTableSkeleton = () => {
  return (
    <>
      {/* Header with search input and create button */}
      <div className='flex items-center justify-between py-4'>
        <Skeleton className='h-10 w-80' />
        <Skeleton className='h-10 w-28' />
      </div>

      {/* Table skeleton */}
      <Table className='overflow-hidden'>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className='h-6 w-20' />
            </TableHead>
            <TableHead>
              <div className='text-center'>
                <Skeleton className='mx-auto h-6 w-16' />
              </div>
            </TableHead>
            <TableHead>
              <div className='text-center'>
                <Skeleton className='mx-auto h-6 w-24' />
              </div>
            </TableHead>
            <TableHead>
              <div className='text-center'>
                <Skeleton className='mx-auto h-6 w-20' />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Generate skeleton rows */}
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              {/* Name column */}
              <TableCell>
                <Skeleton className='h-4 w-32' />
              </TableCell>
              {/* Created column */}
              <TableCell>
                <div className='text-center'>
                  <Skeleton className='mx-auto h-4 w-20' />
                </div>
              </TableCell>
              {/* Updated column */}
              <TableCell>
                <div className='text-center'>
                  <Skeleton className='mx-auto h-4 w-20' />
                </div>
              </TableCell>
              {/* Actions column */}
              <TableCell>
                <div className='flex w-full items-center justify-center'>
                  <Skeleton className='h-8 w-8' />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination skeleton */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Skeleton className='h-9 w-20' />
        <Skeleton className='h-9 w-16' />
      </div>
    </>
  )
}

export default DataTableSkeleton
