import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div
      className='flex flex-col items-center justify-center gap-4 p-4 text-center'
      style={{ height: 'calc(100vh - 192px)' }}
    >
      <Loader className='text-sidebar-accent mx-auto h-4 w-4 animate-spin' />
    </div>
  )
}
