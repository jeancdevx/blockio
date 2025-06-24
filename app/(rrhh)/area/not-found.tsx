import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <h1 className='text-sidebar-primary text-3xl font-bold md:text-5xl lg:text-6xl'>
        Area no encontrada
      </h1>
      <p className='text-sidebar-ring mt-4 text-lg md:text-xl lg:text-2xl'>
        La página que estás buscando no existe o ha sido eliminada.
      </p>

      <Link
        href='/area'
        className='text-sidebar-primary mt-6 font-semibold hover:underline'
      >
        Volver a la lista de áreas
      </Link>
    </div>
  )
}
