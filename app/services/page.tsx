'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Palette, Hammer, Sparkles, Zap, Droplets, Layout, Home, Paintbrush } from 'lucide-react'

const ServicesPage = () => {
  const services = [
    {
      id: 'general-contracting',
      name: 'مقاولات عامة',
      description: 'خدمات المقاولات العامة والإنشاءات المتكاملة بأعلى معايير الجودة في الدمام',
      image: 'https://images.unsplash.com/photo-1541913053965-03f710594403?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Home,
      features: [
        'إشراف هندسي متكامل',
        'بناء الملاحق والمجالس',
        'ترميم المباني والفلل',
        'عزل الأسطح والخزانات',
        'تسليم مفتاح'
      ],
      process: [
        'المعاينة ورفع المقاسات',
        'تقديم عرض السعر',
        'توقيع العقد والتنفيذ',
        'مراحل الفحص والجودة',
        'التسليم النهائي'
      ]
    },
    {
      id: 'plumbing-electrical',
      name: 'سباكة وكهرباء',
      description: 'تأسيس وتشطيب أعمال السباكة والكهرباء بأحدث الأنظمة والتقنيات',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Zap,
      features: [
        'تأسيس شبكات السباكة',
        'تركيب الأدوات الصحية',
        'تأسيس وتمديد الكهرباء',
        'تركيب لوحات التوزيع',
        'أنظمة الإنارة الحديثة'
      ],
      process: [
        'تخطيط المسارات',
        'أعمال التأسيس',
        'اختبار الضغط والأمان',
        'تركيب التشطيبات',
        'الفحص النهائي'
      ]
    },
    {
      id: 'marble-ceramic',
      name: 'الرخام والسيراميك',
      description: 'تركيب وتشطيب الرخام والسيراميك بأعلى معايير الجودة والدقة في الدمام',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Sparkles,
      features: [
        'تركيب الرخام الطبيعي والصناعي',
        'تشطيب السيراميك والبورسلين',
        'أعمال الموزاييك الفني',
        'تلميع وصيانة الأسطح الرخامية',
        'تصميم وتنفيذ الأرضيات المميزة'
      ],
      process: [
        'دراسة المساحة وأخذ القياسات',
        'اختيار المواد المناسبة',
        'التحضير والتجهيز',
        'التركيب والتشطيب',
        'التنظيف والتسليم'
      ]
    },
    {
      id: 'gypsum-board',
      name: 'جبسنوود وديكور',
      description: 'أعمال الجبسنوود والديكورات الجبسية المتقنة والمبتكرة',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Hammer,
      features: [
        'تركيب الأسقف المستعارة',
        'الفواصل والجدران الجبسية',
        'ديكورات شاشات وبلازما',
        'الإضاءة المخفية والمدمجة',
        'تصاميم مودرن وكلاسيك'
      ],
      process: [
        'التصميم والتخطيط',
        'تجهيز الهيكل المعدني',
        'تركيب ألواح الجبس',
        'التشطيب والصنفرة',
        'الطلاء والتشطيب النهائي'
      ]
    },
    {
      id: 'painting-plastering',
      name: 'لياسة ودهانات',
      description: 'أعمال اللياسة والدهانات بأفضل المواد والتقنيات الحديثة في الدمام',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Palette,
      features: [
        'أعمال اللياسة الخارجية والداخلية',
        'دهانات الجدران والأسقف',
        'الدهانات الديكورية (تعتيق، روعة، خيال)',
        'معالجة الرطوبة والتشققات',
        'الطلاء المقاوم للعوامل الجوية'
      ],
      process: [
        'تحضير وتنظيف الأسطح',
        'أعمال اللياسة والتنعيم',
        'تطبيق طبقات الأساس',
        'الدهان النهائي',
        'الفحص والتسليم'
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-luxury-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-luxury-green mb-6">
              خدماتنا المتميزة في الدمام
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من خدمات المقاولات، السباكة، الكهرباء، والتشطيبات بأعلى معايير الجودة والإتقان
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Image */}
                <div className={`relative h-96 rounded-xl overflow-hidden shadow-lg ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 right-6 bg-luxury-gold p-3 rounded-full">
                    <service.icon className="text-white" size={24} />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-luxury-green mb-4">
                    {service.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-xl mb-4 text-luxury-green">
                      ما نقدمه:
                    </h3>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3 space-x-reverse">
                          <CheckCircle className="text-luxury-gold flex-shrink-0" size={18} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-xl mb-4 text-luxury-green">
                      خطوات العمل:
                    </h3>
                    <div className="space-y-2">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-luxury-gold text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href="/start-project" 
                    className="btn-luxury inline-flex items-center space-x-2 space-x-reverse"
                  >
                    <span>اطلب هذه الخدمة</span>
                    <ArrowLeft size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-green text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              مستعد لبدء مشروعك في الدمام؟
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              تواصل معنا اليوم على 966580369568 واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start-project" className="btn-luxury text-lg px-10 py-4">
                ابدأ مشروعك الآن
              </Link>
              <Link href="/contact" className="btn-luxury-outline text-lg px-10 py-4">
                تواصل معنا
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
