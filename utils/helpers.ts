import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(amount)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+966|0)?[5][0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const services = [
  {
    id: 'marble-ceramic',
    name: 'الرخام والسيراميك',
    description: 'تركيب وتشطيب الرخام والسيراميك بأعلى معايير الجودة',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gypsum-board',
    name: 'الجبس بورد',
    description: 'أعمال الجبس بورد والديكورات الجبسية المتقنة',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'painting-plastering',
    name: 'الدهانات والمحارة',
    description: 'أعمال الدهانات والمحارة بأفضل المواد والتقنيات',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

export const projectStatuses = {
  new: 'جديد',
  in_progress: 'قيد التنفيذ',
  completed: 'مكتمل'
}

export const leadStatuses = {
  new: 'جديد',
  contacted: 'تم التواصل',
  converted: 'تم التحويل'
}

