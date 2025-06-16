import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function isRRHHUser(email: string): boolean {
  const rrhhEmails = ['jcode2006@gmail.com']

  return rrhhEmails.includes(email)
}

export function isAdminUser(email: string): boolean {
  const adminEmails = ['jeancgamer23@gmail.com']

  return adminEmails.includes(email)
}
