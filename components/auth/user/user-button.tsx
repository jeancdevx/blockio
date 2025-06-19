'use client'

import { useRouter } from 'next/navigation'

import { User } from 'lucide-react'

import { authClient } from '@/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import UserButtonSkeleton from './user-button-skeleton'

const UserButton = () => {
  const router = useRouter()

  const { data, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push('/sign-in') }
    })
  }

  if (isPending) {
    return <UserButtonSkeleton />
  }

  if (!data || !data.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' size='icon' className='rounded-full'>
            <User className='h-4 w-4' />
          </Button>
        </PopoverTrigger>

        <PopoverContent align='end' className='w-64 space-y-2 px-2 py-4'>
          <Button
            variant='outline'
            className='w-full'
            onClick={() => router.push('/sign-in')}
          >
            Iniciar sesión
          </Button>
          <Button
            variant='primary'
            className='w-full'
            onClick={() => router.push('/sign-up')}
          >
            Crear cuenta
          </Button>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className='cursor-pointer ring-2 ring-gray-200 transition-all hover:ring-gray-300'>
          <AvatarImage src={data.user.image || ''} alt={data.user.name} />
          <AvatarFallback>
            {data.user.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align='end' className='w-64 px-2 py-4'>
        <div className='flex flex-col items-center justify-center gap-y-4'>
          <div className='flex flex-col items-center gap-y-1'>
            <span className='text-sm font-semibold text-gray-800'>
              {data.user.name}
            </span>
            <span className='text-xs'>{data.user.email}</span>
          </div>

          <Separator className='w-full' />

          <Button
            variant='destructive'
            className='w-full bg-red-50 text-sm font-medium text-red-800 hover:bg-red-100'
            onClick={handleSignOut}
          >
            Cerrar sesión
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserButton
