import Link from 'next/link'

import { User2 } from 'lucide-react'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface HeaderProps {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='sticky top-0 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-lg bg-white/85 p-4 backdrop-blur-md lg:top-1'>
      {/* logo */}
      <Logo />

      {/* navigation */}
      {children}

      {/* Auth */}
      <div className='hidden lg:block'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' size='icon' className='rounded-full'>
              <User2 className='h-5 w-5' />
            </Button>
          </PopoverTrigger>

          <PopoverContent className='w-64 px-2 py-4'>
            <div className='flex flex-col gap-y-2'>
              <Link
                href='/sign-in'
                className='block text-sm font-medium text-gray-800 hover:text-gray-600'
              >
                <Button variant='outline' className='w-full'>
                  Iniciar sesión
                </Button>
              </Link>
              <Link
                href='/sign-up'
                className='block text-sm font-medium text-gray-800 hover:text-gray-600'
              >
                <Button variant='default' className='w-full'>
                  Registrarse
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export default Header
