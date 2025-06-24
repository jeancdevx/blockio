import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div
      className='flex items-center justify-center'
      style={{ height: 'calc(100vh - 192px)' }}
    >
      <Loader className='text-sidebar size-4 animate-spin' />
    </div>
  )
}
