'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, Sparkles, Hammer, Palette } from 'lucide-react'
import { services } from '@/utils/helpers'

const StartProjectPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    service: '',
    area: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const steps = [
    { id: 1, title: 'اختر الخدمة', description: 'ما نوع الخدمة التي تحتاجها؟' },
    { id: 2, title: 'المساحة التقريبية', description: 'كم المساحة المطلوب تشطيبها؟' },
    { id: 3, title: 'معلومات التواصل', description: 'كيف يمكننا التواصل معك؟' }
  ]

  const serviceIcons = {
    'marble-ceramic': Sparkles,
    'gypsum-board': Hammer,
    'painting-plastering': Palette
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== ''
      case 2:
        return formData.area !== ''
      case 3:
        return formData.name !== '' && formData.phone !== ''
      default:
        return false
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-luxury-beige to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center p-8"
        >
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600" size={40} />
          </div>
          <h1 className="font-heading text-3xl font-bold text-luxury-green mb-4">
            تم إرسال طلبك بنجاح!
          </h1>
          <p className="text-gray-600 mb-6">
            شكراً لك على اختيار دارك. سيتواصل معك أحد مستشارينا خلال 24 ساعة لمناقشة تفاصيل مشروعك.
          </p>
          <button
            onClick={() => {
              setSubmitStatus('idle')
              setCurrentStep(1)
              setFormData({
                service: '',
                area: '',
                name: '',
                phone: '',
                email: '',
                message: ''
              })
            }}
            className="btn-luxury"
          >
            بدء طلب جديد
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-luxury-beige to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-luxury-green mb-4">
            ابدأ مشروعك معنا
          </h1>
          <p className="text-xl text-gray-600">
            خطوات بسيطة للحصول على عرض سعر مخصص لمشروعك
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step.id 
                    ? 'bg-luxury-gold text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? <Check size={20} /> : step.id}
                </div>
                {step.id < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-luxury-gold' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="font-heading text-2xl font-semibold text-luxury-green">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 mt-2">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.id as keyof typeof serviceIcons]
                    return (
                      <div
                        key={service.id}
                        onClick={() => setFormData(prev => ({ ...prev, service: service.id }))}
                        className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
                          formData.service === service.id
                            ? 'border-luxury-gold bg-luxury-gold/10'
                            : 'border-gray-200 hover:border-luxury-gold/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${
                            formData.service === service.id
                              ? 'bg-luxury-gold text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon size={28} />
                          </div>
                          <h3 className="font-heading text-lg font-semibold mb-2">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Area */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-md mx-auto">
                  <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
                    المساحة التقريبية (متر مربع)
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['أقل من 50', '50-100', '100-200', '200-500', '500-1000', 'أكثر من 1000'].map((area) => (
                      <button
                        key={area}
                        onClick={() => setFormData(prev => ({ ...prev, area }))}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          formData.area === area
                            ? 'border-luxury-gold bg-luxury-gold text-white'
                            : 'border-gray-200 hover:border-luxury-gold text-gray-700'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <input
                      type="text"
                      placeholder="أو أدخل المساحة بالتفصيل"
                      value={formData.area.includes('أقل') || formData.area.includes('أكثر') || formData.area.includes('-') ? '' : formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-md mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                      placeholder="966580369568"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تفاصيل إضافية
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent resize-none"
                      placeholder="أي تفاصيل إضافية عن مشروعك..."
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {submitStatus === 'error' && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 space-x-reverse px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-luxury-gold transition-colors"
            >
              <ChevronRight size={20} />
              <span>السابق</span>
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-luxury flex items-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>التالي</span>
                <ChevronLeft size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="btn-luxury flex items-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}</span>
                <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartProjectPage

