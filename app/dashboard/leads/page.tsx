'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Phone, Mail, Eye, Edit, Trash2, Plus } from 'lucide-react'
import { formatDate, services, leadStatuses } from '@/utils/helpers'

interface Lead {
  id: number
  name: string
  phone: string
  email?: string
  service: string
  area: string
  message?: string
  status: 'new' | 'contacted' | 'converted'
  created_at: string
}

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLeads(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus as any } : lead
        ))
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    return service ? service.name : serviceId
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = !statusFilter || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            العملاء المحتملون
          </h1>
          <p className="text-gray-600">
            إدارة ومتابعة العملاء المحتملين
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="البحث بالاسم أو الهاتف أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
            >
              <option value="">جميع الحالات</option>
              <option value="new">جديد</option>
              <option value="contacted">تم التواصل</option>
              <option value="converted">تم التحويل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'الإجمالي', value: leads.length, color: 'bg-blue-500' },
          { label: 'جديد', value: leads.filter(l => l.status === 'new').length, color: 'bg-blue-500' },
          { label: 'تم التواصل', value: leads.filter(l => l.status === 'contacted').length, color: 'bg-yellow-500' },
          { label: 'تم التحويل', value: leads.filter(l => l.status === 'converted').length, color: 'bg-green-500' },
        ].map((stat, index) => (
          <div key={stat.label} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-2 ml-3`}>
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخدمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المساحة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2 space-x-reverse">
                        <Phone size={14} />
                        <span>{lead.phone}</span>
                      </div>
                      {lead.email && (
                        <div className="text-sm text-gray-500 flex items-center space-x-2 space-x-reverse">
                          <Mail size={14} />
                          <span>{lead.email}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getServiceName(lead.service)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.area}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(lead.status)}`}
                    >
                      <option value="new">جديد</option>
                      <option value="contacted">تم التواصل</option>
                      <option value="converted">تم التحويل</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setSelectedLead(lead)
                          setShowModal(true)
                        }}
                        className="text-luxury-gold hover:text-yellow-600"
                      >
                        <Eye size={16} />
                      </button>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Phone size={16} />
                      </a>
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Mail size={16} />
                        </a>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد عملاء محتملون</p>
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-heading text-xl font-bold mb-4">
              تفاصيل العميل المحتمل
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">الاسم</label>
                <p className="text-gray-900">{selectedLead.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">الهاتف</label>
                <p className="text-gray-900">{selectedLead.phone}</p>
              </div>
              {selectedLead.email && (
                <div>
                  <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                  <p className="text-gray-900">{selectedLead.email}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">الخدمة</label>
                <p className="text-gray-900">{getServiceName(selectedLead.service)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">المساحة</label>
                <p className="text-gray-900">{selectedLead.area}</p>
              </div>
              {selectedLead.message && (
                <div>
                  <label className="text-sm font-medium text-gray-600">الرسالة</label>
                  <p className="text-gray-900">{selectedLead.message}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">التاريخ</label>
                <p className="text-gray-900">{formatDate(selectedLead.created_at)}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                إغلاق
              </button>
              <a
                href={`tel:${selectedLead.phone}`}
                className="btn-luxury px-4 py-2"
              >
                اتصال
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadsPage

