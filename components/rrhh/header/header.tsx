import UserButton from '@/components/auth/user'
import Logo from '@/components/logo'
import Navigation from '@/components/rrhh/navigation'

const Header = () => {
  return (
    <header className='relative z-50 h-16 w-full'>
      <div className='mx-auto flex size-full max-w-5xl items-center justify-between p-4 backdrop-blur-md'>
        <div>
          <Logo />
        </div>

        <Navigation />

        <UserButton />
      </div>
    </header>
  )
}

export default Header
