import Link from 'next/link'

import { Button } from '@/components/ui/button'

const JobView = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-3xl font-semibold'>
            Lista de Ofertas de Trabajo
          </h1>
          <p className='text-muted-foreground text-sm'>
            Aquí puedes ver todas las ofertas de trabajo registradas en el
            sistema.
          </p>
        </div>

        <Link href='/job-offer/create' passHref>
          <Button asChild>
            <span>Crear Oferta</span>
          </Button>
        </Link>
      </div>
    </>
  )
}

export default JobView
