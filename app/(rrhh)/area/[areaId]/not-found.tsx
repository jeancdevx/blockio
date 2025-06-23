import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className='flex flex-col items-center justify-center gap-4 p-4 text-center'
      style={{ height: 'calc(100vh - 192px)' }}
    >
      <h1 className='text-7xl font-bold'>Página no encontrada</h1>
      <p className='text-sidebar-foreground mt-4 text-xs'>
        Lo sentimos, la página que estás buscando no existe.
      </p>

      <Image src='/empty.svg' alt='Not Found' width={150} height={150} />

      <Link
        href='/area'
        className='text-sidebar-primary mt-4 font-semibold hover:underline'
      >
        Volver a la lista de áreas
      </Link>
    </div>
  )
}
