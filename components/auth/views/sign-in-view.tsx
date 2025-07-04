'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OctagonAlertIcon } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña debe tener al menos 1 carácter')
})

const SignInView = () => {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsPending(true)
      setError(null)

      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/empleos',
        fetchOptions: {
          onSuccess: () => router.push('/empleos')
        }
      })

      if (error) {
        setError(error.message ?? 'Unknown error')
      }
    } catch (error) {
      setError(
        'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.' +
          error
      )
    } finally {
      setIsPending(false)
    }
  }

  const onSocial = async (provider: 'google' | 'github') => {
    try {
      setIsPending(true)
      setError(null)

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: '/empleos'
      })

      if (error) {
        setError(error.message ?? 'Unknown error')
      }
    } catch (error) {
      setError(
        'Error al iniciar sesión con ' +
          provider +
          '. Por favor, inténtalo de nuevo más tarde.' +
          error
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 lg:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Bienvenido de nuevo</h1>
                  <p className='text-muted-foreground text-xs text-balance'>
                    Ingresa tus credenciales para continuar
                  </p>
                </div>

                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>

                        <FormControl>
                          <Input
                            type='email'
                            placeholder='m@gmail.com'
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>

                        <FormControl>
                          <Input
                            type='password'
                            placeholder='********'
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex justify-end'>
                    <Link
                      href='/forgot-account'
                      className='text-xs font-medium text-emerald-600 underline-offset-4 hover:underline'
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                {!!error && (
                  <Alert className='bg-destructive/10 border-none text-sm font-semibold'>
                    <OctagonAlertIcon className='!text-destructive size-4' />

                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  type='submit'
                  variant='primary'
                  className='w-full'
                  disabled={isPending}
                >
                  {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>

                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    o continúa con
                  </span>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <Button
                    variant='google'
                    type='button'
                    className='w-full'
                    disabled={isPending}
                    onClick={() => onSocial('google')}
                  >
                    <FaGoogle className='mr-2 size-4' />
                    Google
                  </Button>

                  <Button
                    variant='github'
                    type='button'
                    className='w-full'
                    disabled={isPending}
                    onClick={() => onSocial('github')}
                  >
                    <FaGithub className='mr-2 size-4' />
                    Github
                  </Button>
                </div>

                <div className='text-muted-foreground text-center text-sm'>
                  <p>¿No tienes una cuenta?</p>
                  <Link
                    href='/sign-up'
                    className='font-semibold text-emerald-600 underline-offset-4 hover:underline'
                  >
                    Regístrate
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className='from-sidebar-accent to-sidebar relative hidden flex-col items-center justify-center gap-y-4 bg-radial md:flex'>
            <Image src='./logo.svg' alt='Meet AI' width={64} height={64} />
            <p className='text-2xl font-semibold text-white'>BlockIO</p>
          </div>
        </CardContent>
      </Card>

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4'>
        <p>
          Al iniciar sesión, aceptas nuestros{' '}
          <Link href='/terms' className='font-semibold'>
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href='/privacy' className='font-semibold'>
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}

export { SignInView }
