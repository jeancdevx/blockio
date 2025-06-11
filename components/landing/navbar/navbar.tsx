'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { navbarLinks } from './navbar.constants'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className='flex gap-4'>
      {navbarLinks.map(link => (
        <Link
          key={link.id}
          href={`#${link.id}`}
          className={`text-sm font-medium transition-colors hover:text-gray-900 ${
            activeSection === link.id
              ? 'font-semibold text-emerald-600'
              : 'text-neutral-500'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
