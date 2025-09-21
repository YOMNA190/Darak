'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Users, Clock, Target, Eye, Heart } from 'lucide-react'

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const values = [
    {
      icon: Target,
      title: 'الدقة والإتقان',
      description: 'نحرص على تنفيذ كل تفصيلة بأعلى معايير الدقة والجودة'
    },
    {
      icon: Clock,
      title: 'الالتزام بالمواعيد',
      description: 'نحترم وقتك ونلتزم بتسليم المشاريع في المواعيد المحددة'
    },
    {
      icon: Heart,
      title: 'الشغف بالتميز',
      description: 'نعمل بشغف وحب لتحقيق أحلامك وتجاوز توقعاتك'
    },
    {
      icon: Users,
      title: 'فريق متخصص',
      description: 'فريق عمل مدرب ومتخصص يضمن أفضل النتائج'
    }
  ]

  const milestones = [
    { year: '2014', title: 'تأسيس الشركة', description: 'بداية رحلتنا في عالم التشطيبات الفاخرة' },
    { year: '2017', title: '100 مشروع', description: 'إنجاز أول 100 مشروع بنجاح' },
    { year: '2020', title: 'التوسع', description: 'توسيع نطاق الخدمات وزيادة الفريق' },
    { year: '2024', title: '500+ عميل', description: 'خدمة أكثر من 500 عميل راضٍ' }
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
              من نحن
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              قصة شركة دارك وكيف أصبحنا الخيار الأول للتشطيبات الفاخرة في المملكة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl font-bold text-luxury-green mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  بدأت رحلة دارك في عام 2014 برؤية واضحة: تقديم خدمات تشطيبات وديكور تليق 
                  بأحلام عملائنا وتتجاوز توقعاتهم. منذ ذلك الحين، نمت الشركة لتصبح واحدة من 
                  أبرز الشركات المتخصصة في التشطيبات الفاخرة في المملكة العربية السعودية.
                </p>
                <p>
                  نؤمن في دارك أن كل منزل له شخصيته الخاصة، ولذلك نعمل عن كثب مع عملائنا 
                  لفهم رؤيتهم وتحويلها إلى واقع ملموس. فريقنا المتخصص يجمع بين الخبرة العملية 
                  والإبداع الفني لضمان تحقيق أعلى معايير الجودة.
                </p>
                <p>
                  على مدار السنوات، تمكنا من بناء سمعة قوية قائمة على الثقة والجودة والالتزام. 
                  نحن فخورون بكل مشروع أنجزناه وبكل عميل وثق بنا لتحويل مساحته إلى تحفة فنية.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-luxury-green mb-6">
              قيمنا ومبادئنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              القيم التي نؤمن بها وتوجه عملنا في كل مشروع
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-luxury-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-luxury-green">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-luxury-green mb-6">
              رحلتنا عبر السنوات
            </h2>
            <p className="text-xl text-gray-600">
              أهم المحطات في مسيرة دارك نحو التميز
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-1/2 transform translate-x-1/2 w-0.5 h-full bg-luxury-gold"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-luxury-gold font-bold text-2xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-2 text-luxury-green">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-luxury-gold rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-luxury-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              فريق العمل
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              فريق متخصص ومدرب يعمل بشغف لتحقيق رؤيتك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'المهندسون المعماريون', count: '5+', description: 'خبراء في التصميم والتخطيط' },
              { title: 'الفنيون المتخصصون', count: '15+', description: 'مهرة في جميع أنواع التشطيبات' },
              { title: 'مشرفو الجودة', count: '3+', description: 'يضمنون أعلى معايير الإنجاز' }
            ].map((team, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-luxury-gold rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">
                  {team.count}
                </h3>
                <h4 className="font-semibold text-lg mb-2">
                  {team.title}
                </h4>
                <p className="text-gray-200">
                  {team.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

