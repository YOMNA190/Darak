'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-luxury-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="bg-luxury-gold p-2 rounded-lg">
                <span className="text-white font-bold text-xl">د</span>
              </div>
              <span className="font-heading text-2xl font-bold">دارك</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              شركة دارك للتشطيبات والديكور الفاخر، نقدم خدمات متميزة في مجال التشطيبات والديكور 
              بأعلى معايير الجودة والإتقان. نحن نؤمن بأن منزلك يستحق الأفضل.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone size={18} className="text-luxury-gold" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail size={18} className="text-luxury-gold" />
                <span>info@darak.sa</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin size={18} className="text-luxury-gold" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  ابدأ مشروعك
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">الرخام والسيراميك</li>
              <li className="text-gray-300">الجبس بورد</li>
              <li className="text-gray-300">الدهانات والمحارة</li>
              <li className="text-gray-300">التصميم الداخلي</li>
              <li className="text-gray-300">الاستشارات الفنية</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 space-x-reverse mb-4 md:mb-0">
            <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
              <Facebook size={20} />
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            © 2024 دارك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

