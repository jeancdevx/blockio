import Image from 'next/image'

import Header from '@/components/landing/header'
import Navbar from '@/components/landing/navbar'
import { Button } from '@/components/ui/button'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>

      {children}

      {/* Footer Section */}
      <footer className='pb-20'>
        <div className='container mx-auto'>
          <div className='text-center'>
            <h2 className='mb-6 text-3xl font-bold'>
              Únete a Nuestra{' '}
              <span className='text-emerald-500'>Comunidad</span>
            </h2>

            <p className='mb-8 text-zinc-400'>
              Conéctate con profesionales y empresas del sector de la
              construcción. Comparte experiencias, consejos y oportunidades.
            </p>

            <Button className='rounded-md bg-emerald-600 px-8 py-6 text-base text-white hover:bg-emerald-600/90'>
              Registrarse
            </Button>
          </div>

          <Image
            src='/landing-footer.svg'
            alt='footer'
            width={128}
            height={128}
            className='mx-auto mt-10 rounded-lg'
          />
        </div>
      </footer>
    </>
  )
}
