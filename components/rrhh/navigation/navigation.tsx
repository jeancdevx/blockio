import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

const Navigation = () => {
  return (
    <NavigationMenu className='hidden md:flex'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Área</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className='grid w-[300px] gap-4'>
              <li>
                <NavigationMenuLink asChild>
                  <Link href='/area'>
                    <div className='font-medium'>Áreas</div>
                    <div className='text-muted-foreground'>
                      Revisa las áreas de la empresa
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href='/area/create'>
                    <div className='font-medium'>Crear area</div>
                    <div className='text-muted-foreground'>
                      Crea una nueva área para la empresa
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Ofertas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    className='from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md'
                    href='/job-offer'
                  >
                    <div className='mt-4 mb-2 text-lg leading-tight font-semibold'>
                      Ofertas de Trabajo
                    </div>
                    <p className='text-muted-foreground text-sm leading-tight'>
                      Revisa las ofertas de trabajo activas
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem title='Crear Oferta' href='/job-offer/create'>
                Crea una nueva oferta de trabajo para tu área.
              </ListItem>
              <ListItem title='Entrevistas' href='/interviews'>
                Revisa las entrevistas programadas y sus resultados.
              </ListItem>
              <ListItem title='Candidatos' href='/candidates'>
                Revisa los candidatos que han postulado a tus ofertas.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Reportes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <ListItem title='Reportes' href='/reports'>
                Revisa los reportes de tu área.
              </ListItem>
              <ListItem title='Reportes de Ofertas' href='/reports/job-offers'>
                Revisa los reportes de ofertas de trabajo.
              </ListItem>
              <ListItem
                title='Reportes de Candidatos'
                href='/reports/candidates'
              >
                Revisa los reportes de candidatos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navigation

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
