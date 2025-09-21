'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'الرئيسية' },
    { href: '/services', label: 'خدماتنا' },
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'تواصل معنا' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-luxury-gold p-2 rounded-lg">
              <span className="text-white font-bold text-xl">د</span>
            </div>
            <span className="font-heading text-2xl font-bold text-luxury-green">دارك</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-luxury-gold'
                    : 'text-gray-700 hover:text-luxury-gold'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Link
              href="/start-project"
              className="btn-luxury text-sm"
            >
              ابدأ مشروعك
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-luxury-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-luxury-gold'
                      : 'text-gray-700 hover:text-luxury-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/start-project"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-luxury text-sm"
                >
                  ابدأ مشروعك
                </Link>
              </div>
              <div className="flex flex-col space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone size={16} />
                  <span>+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail size={16} />
                  <span>info@darak.sa</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

