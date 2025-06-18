import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return ''
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
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
