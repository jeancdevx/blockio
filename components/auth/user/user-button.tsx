'use client'

import { useRouter } from 'next/navigation'

import { authClient } from '@/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import UserButtonSkeleton from './user-button-skeleton'

const UserButton = () => {
  const router = useRouter()

  const { data, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push('/sign-in') }
    })
  }

  if (isPending || !data?.user) return <UserButtonSkeleton />

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

      <PopoverContent className='w-64 px-2 py-4'>
        {data.user.email ? (
          <div className='flex flex-col items-center justify-center gap-y-4'>
            <div className='flex flex-col items-center gap-y-1'>
              <span className='text-sm font-semibold text-gray-800'>
                {data.user.name}
              </span>
              <span className='text-xs'>{data.user.email}</span>
            </div>
            <Button
              className='w-full bg-red-50 text-sm font-medium text-red-800 hover:bg-red-100'
              onClick={handleSignOut}
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <div className='flex flex-col gap-y-2'>
            <a
              href='/sign-in'
              className='block text-sm font-medium text-gray-800 hover:text-gray-600'
            >
              Iniciar sesión
            </a>
            <a
              href='/sign-up'
              className='block text-sm font-medium text-gray-800 hover:text-gray-600'
            >
              Crear cuenta
            </a>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default UserButton
