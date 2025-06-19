import UserButton from '@/components/auth/user'
import Logo from '@/components/logo'

interface HeaderProps {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='sticky top-0 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-lg bg-white/85 p-4 backdrop-blur-md'>
      {/* logo */}
      <Logo />

      {/* navigation */}
      {children}

      {/* Auth */}
      <div className='hidden lg:block'>
        <UserButton />
      </div>
    </header>
  )
}

export default Header
