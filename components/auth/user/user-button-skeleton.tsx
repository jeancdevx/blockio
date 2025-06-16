import { Skeleton } from '@/components/ui/skeleton'

const UserButtonSkeleton = () => {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='size-8 rounded-full' />
    </div>
  )
}

export default UserButtonSkeleton
