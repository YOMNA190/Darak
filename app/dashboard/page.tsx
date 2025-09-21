'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, FolderOpen, TrendingUp, Clock, Phone, CheckCircle } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface Stats {
  leads: {
    total: number
    new: number
    contacted: number
    converted: number
    monthly: Array<{ month: string; count: number }>
  }
  projects: {
    total: number
    new: number
    inProgress: number
    completed: number
  }
}

const DashboardPage = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        setError('فشل في تحميل الإحصائيات')
      }
    } catch (error) {
      setError('حدث خطأ في تحميل البيانات')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'لا توجد بيانات متاحة'}</p>
      </div>
    )
  }

  const statCards = [
    {
      title: 'إجمالي العملاء المحتملين',
      value: stats.leads.total,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'المشاريع النشطة',
      value: stats.projects.inProgress,
      icon: FolderOpen,
      color: 'bg-luxury-gold',
      change: '+8%'
    },
    {
      title: 'المشاريع المكتملة',
      value: stats.projects.completed,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+15%'
    },
    {
      title: 'العملاء الجدد',
      value: stats.leads.new,
      icon: TrendingUp,
      color: 'bg-luxury-green',
      change: '+5%'
    }
  ]

  // Chart data
  const monthlyLeadsData = {
    labels: stats.leads.monthly.map(item => item.month),
    datasets: [
      {
        label: 'العملاء المحتملون',
        data: stats.leads.monthly.map(item => item.count),
        backgroundColor: '#D4AF37',
        borderColor: '#B8941F',
        borderWidth: 1,
      },
    ],
  }

  const leadsStatusData = {
    labels: ['جديد', 'تم التواصل', 'تم التحويل'],
    datasets: [
      {
        data: [stats.leads.new, stats.leads.contacted, stats.leads.converted],
        backgroundColor: ['#3B82F6', '#F59E0B', '#10B981'],
        borderWidth: 0,
      },
    ],
  }

  const projectsStatusData = {
    labels: ['جديد', 'قيد التنفيذ', 'مكتمل'],
    datasets: [
      {
        data: [stats.projects.new, stats.projects.inProgress, stats.projects.completed],
        backgroundColor: ['#6366F1', '#D4AF37', '#059669'],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
          لوحة التحكم
        </h1>
        <p className="text-gray-600">
          نظرة عامة على أداء الأعمال والإحصائيات
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {card.change} من الشهر الماضي
                </p>
              </div>
              <div className={`${card.color} rounded-full p-3`}>
                <card.icon className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Leads Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h3 className="font-heading text-lg font-semibold mb-4">
            العملاء المحتملون الشهريون
          </h3>
          <Bar data={monthlyLeadsData} options={chartOptions} />
        </motion.div>

        {/* Leads Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h3 className="font-heading text-lg font-semibold mb-4">
            حالة العملاء المحتملين
          </h3>
          <Doughnut data={leadsStatusData} options={doughnutOptions} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h3 className="font-heading text-lg font-semibold mb-4">
            حالة المشاريع
          </h3>
          <Doughnut data={projectsStatusData} options={doughnutOptions} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h3 className="font-heading text-lg font-semibold mb-4">
            إجراءات سريعة
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 space-x-reverse p-3 text-right hover:bg-gray-50 rounded-lg transition-colors">
              <Phone className="text-luxury-gold" size={20} />
              <span>الاتصال بالعملاء الجدد</span>
            </button>
            <button className="w-full flex items-center space-x-3 space-x-reverse p-3 text-right hover:bg-gray-50 rounded-lg transition-colors">
              <Clock className="text-luxury-green" size={20} />
              <span>متابعة المشاريع المتأخرة</span>
            </button>
            <button className="w-full flex items-center space-x-3 space-x-reverse p-3 text-right hover:bg-gray-50 rounded-lg transition-colors">
              <TrendingUp className="text-blue-500" size={20} />
              <span>تحليل الأداء الشهري</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage

