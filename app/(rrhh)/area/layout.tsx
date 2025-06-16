import Header from '@/components/rrhh/header'

interface AreaLayoutProps {
  children?: React.ReactNode
}

const AreaLayout = ({ children }: AreaLayoutProps) => {
  return (
    <>
      <Header />

      <main className='mx-auto max-w-5xl space-y-4 p-4'>{children}</main>
    </>
  )
}

export default AreaLayout
