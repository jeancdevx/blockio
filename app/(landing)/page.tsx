import Link from 'next/link'

import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  HardHat,
  MapPin,
  Search,
  Star
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LandingPage() {
  return (
    <main className='mx-auto -mt-[80px] flex min-h-screen max-w-6xl flex-col px-4 pb-20'>
      {/* hero section */}
      <section
        id='hero'
        className='relative flex items-center justify-center overflow-hidden pt-24 md:px-0 lg:pt-32'
      >
        <div className='relative z-10 container'>
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <div className='flex flex-col gap-6'>
              <div className='inline-flex w-fit rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-bold text-emerald-600'>
                Portal de Empleos
              </div>
              <h1 className='text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
                Construye Tu <span className='text-emerald-500'>Futuro</span>{' '}
                Profesional
              </h1>
              <p className='max-w-xl text-sm text-neutral-400 md:text-base'>
                Encuentra las mejores oportunidades laborales en el sector de la
                construcción. Conectamos talento con proyectos innovadores.
              </p>

              <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
                <Link href='/empleos'>
                  <Button
                    type='button'
                    className='cursor-pointer rounded-md bg-emerald-600 px-8 py-6 text-base text-white hover:bg-emerald-600/90'
                  >
                    Buscar ofertas laborales
                    <ChevronRight className='ml-2 h-5 w-5' />
                  </Button>
                </Link>
              </div>

              <div className='mt-4 flex items-center gap-4'>
                <div className='flex -space-x-2'>
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className='text-secondary flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-xs font-semibold'
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className='text-sm text-neutral-500'>
                  <span className='text-primary font-bold'>+1,000</span>{' '}
                  profesionales ya encontraron empleo
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-transparent opacity-30 blur-3xl'></div>

              <div className='relative rounded-lg border-2 border-neutral-200 bg-zinc-50 p-6 md:p-8'>
                <div className='absolute -top-3 right-0 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white'>
                  Destacado
                </div>

                <div className='flex flex-col gap-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100'>
                        <HardHat className='h-6 w-6 text-emerald-500' />
                      </div>
                      <div className='text-primary'>
                        <h3 className='text-lg font-bold'>
                          Ingeniero Civil Senior
                        </h3>
                        <p className='text-sm text-neutral-400'>
                          CONSTRUX · Trujillo, Peru
                        </p>
                      </div>
                    </div>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-zinc-400 hover:text-yellow-500'
                    >
                      <Star className='h-5 w-5' />
                      <span className='sr-only'>Guardar</span>
                    </Button>
                  </div>

                  <div className='text-primary grid grid-cols-2 gap-4'>
                    <div className='rounded-md bg-neutral-100 p-3'>
                      <p className='text-xs text-neutral-400'>
                        Tipo de contrato
                      </p>
                      <p className='font-medium'>Tiempo completo</p>
                    </div>

                    <div className='rounded-md bg-neutral-100 p-3'>
                      <p className='text-xs text-neutral-400'>Experiencia</p>
                      <p className='font-medium'>5+ años</p>
                    </div>

                    <div className='rounded-md bg-neutral-100 p-3'>
                      <p className='text-xs text-neutral-400'>Salario</p>
                      <p className='font-medium'>€60,000 - €75,000</p>
                    </div>

                    <div className='rounded-md bg-neutral-100 p-3'>
                      <p className='text-xs text-neutral-400'>Ubicación</p>
                      <p className='font-medium'>Presencial</p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Requisitos</h4>

                    <ul className='space-y-1 text-sm text-zinc-400'>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-1 w-1 rounded-full bg-emerald-500'></div>
                        <span>Título en Ingeniería Civil</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-1 w-1 rounded-full bg-emerald-500'></div>
                        <span>Experiencia en gestión de proyectos</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='mt-2 h-1 w-1 rounded-full bg-emerald-500'></div>
                        <span>Conocimientos de normativas de construcción</span>
                      </li>
                    </ul>
                  </div>

                  <Button className='w-full bg-emerald-600 text-white hover:bg-emerald-600/90'>
                    Ver detalles
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id='search' className='pt-20'>
        <h2 className='mb-4 text-center text-3xl font-bold'>
          Encuentra tu <span className='text-emerald-500'>Empleo</span> Ideal
        </h2>

        <div className='container'>
          <div className='mx-auto'>
            <div className='border-muted rounded-lg border-2 p-4'>
              <div className='flex flex-col gap-4 md:flex-row'>
                <div className='flex-1'>
                  <div className='relative'>
                    <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-neutral-500' />
                    <Input
                      type='text'
                      placeholder='Buscar empleo'
                      className='py-2 pr-4 pl-10 text-sm placeholder:text-neutral-400'
                    />
                  </div>
                </div>

                <div className='flex-1'>
                  <div className='relative'>
                    <MapPin className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-neutral-400' />
                    <Input
                      type='text'
                      placeholder='Ubicación'
                      className='border py-2 pr-4 pl-10 text-sm placeholder:text-neutral-400'
                    />
                  </div>
                </div>

                <Button className='bg-emerald-600 px-6 text-white hover:bg-emerald-600/90'>
                  Buscar
                </Button>
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                <span className='text-sm text-neutral-400'>
                  Búsquedas populares:
                </span>
                <Link
                  href='#'
                  className='text-sm text-emerald-600 hover:underline'
                >
                  Arquitecto
                </Link>
                <Link
                  href='#'
                  className='text-sm text-emerald-600 hover:underline'
                >
                  Capataz
                </Link>
                <Link
                  href='#'
                  className='text-sm text-emerald-600 hover:underline'
                >
                  Ingeniero Civil
                </Link>
                <Link
                  href='#'
                  className='text-sm text-emerald-600 hover:underline'
                >
                  Electricista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id='categories' className='py-20'>
        <div className='container'>
          <div className='mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h2 className='text-3xl font-bold'>
                Categorías de <span className='text-emerald-500'>Empleo</span>
              </h2>
              <p className='mt-2 text-neutral-400'>
                Explora oportunidades por área de especialización
              </p>
            </div>

            <Button
              variant='link'
              className='p-0 text-emerald-600 hover:text-emerald-500'
            >
              Ver todas las categorías
              <ChevronRight className='ml-1 h-4 w-4' />
            </Button>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {[
              {
                title: 'Ingeniería Civil',
                count: 42,
                icon: <Building2 className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Arquitectura',
                count: 38,
                icon: <Building2 className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Operarios',
                count: 65,
                icon: <HardHat className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Gestión de Proyectos',
                count: 24,
                icon: <Briefcase className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Electricidad',
                count: 31,
                icon: <HardHat className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Fontanería',
                count: 27,
                icon: <HardHat className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Administración',
                count: 19,
                icon: <Briefcase className='h-6 w-6 text-emerald-500' />
              },
              {
                title: 'Seguridad Laboral',
                count: 15,
                icon: <HardHat className='h-6 w-6 text-emerald-500' />
              }
            ].map((category, index) => (
              <Link
                href='#'
                key={index}
                className='group border-muted bg-secondary/10 text-primary rounded-lg border-2 p-6 transition-colors hover:bg-emerald-200/10'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-md bg-zinc-50/50'>
                    {category.icon}
                  </div>
                  <span className='rounded-md bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-500'>
                    {category.count} empleos
                  </span>
                </div>
                <h3 className='mt-4 text-lg font-bold transition-colors group-hover:text-emerald-500'>
                  {category.title}
                </h3>
                <p className='text-muted-foreground mt-1 text-xs font-medium'>
                  Ver ofertas
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id='contact'
        className='rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-900 py-20 md:rounded-3xl'
      >
        <div className='container'>
          <div className='mx-auto max-w-3xl px-6 text-center'>
            <h2 className='mb-6 text-3xl font-bold text-white'>
              ¿Listo para dar el siguiente paso en tu carrera?
            </h2>
            <p className='mb-8 text-white/90'>
              Miles de oportunidades te esperan. Crea tu perfil hoy y comienza a
              recibir ofertas adaptadas a tus habilidades y experiencia.
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Button className='rounded-md bg-black px-8 py-6 text-base text-white hover:bg-zinc-800'>
                Buscar ofertas laborales
                <ChevronRight className='ml-2 h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                className='rounded-md bg-white px-8 py-6 text-base text-black hover:bg-zinc-100'
              >
                Publicar empleo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id='stats' className='pt-20'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Nuestras <span className='text-emerald-500'>Estadísticas</span>
        </h2>

        <div className='container'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            {[
              { number: '1,000+', label: 'Ofertas activas' },
              { number: '500+', label: 'Empresas' },
              { number: '10,000+', label: 'Profesionales' },
              { number: '95%', label: 'Tasa de colocación' }
            ].map((stat, index) => (
              <div
                key={index}
                className='rounded-lg border border-neutral-200 p-6 text-center'
              >
                <p className='mb-2 text-4xl font-bold text-emerald-600'>
                  {stat.number}
                </p>
                <p className='text-zinc-400'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
