import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

// Middleware to check authentication
async function checkAuth(request: NextRequest) {
  const token = getTokenFromRequest(request)
  if (!token) {
    return NextResponse.json(
      { error: 'غير مصرح بالوصول' },
      { status: 401 }
    )
  }

  const user = verifyToken(token)
  if (!user) {
    return NextResponse.json(
      { error: 'رمز الوصول غير صالح' },
      { status: 401 }
    )
  }

  return user
}

export async function GET(request: NextRequest) {
  const authResult = await checkAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    // Get leads stats
    const { data: leadsData, error: leadsError } = await supabaseAdmin
      .from('leads')
      .select('status, created_at')

    if (leadsError) {
      console.error('Leads query error:', leadsError)
      return NextResponse.json(
        { error: 'حدث خطأ في استرجاع بيانات العملاء المحتملين' },
        { status: 500 }
      )
    }

    // Get projects stats
    const { data: projectsData, error: projectsError } = await supabaseAdmin
      .from('projects')
      .select('status, created_at')

    if (projectsError) {
      console.error('Projects query error:', projectsError)
      return NextResponse.json(
        { error: 'حدث خطأ في استرجاع بيانات المشاريع' },
        { status: 500 }
      )
    }

    // Calculate stats
    const totalLeads = leadsData?.length || 0
    const newLeads = leadsData?.filter(lead => lead.status === 'new').length || 0
    const contactedLeads = leadsData?.filter(lead => lead.status === 'contacted').length || 0
    const convertedLeads = leadsData?.filter(lead => lead.status === 'converted').length || 0

    const totalProjects = projectsData?.length || 0
    const newProjects = projectsData?.filter(project => project.status === 'new').length || 0
    const inProgressProjects = projectsData?.filter(project => project.status === 'in_progress').length || 0
    const completedProjects = projectsData?.filter(project => project.status === 'completed').length || 0

    // Calculate monthly leads
    const now = new Date()
    const monthlyLeads = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const count = leadsData?.filter(lead => {
        const leadDate = new Date(lead.created_at)
        return leadDate >= date && leadDate < nextDate
      }).length || 0

      monthlyLeads.push({
        month: date.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' }),
        count
      })
    }

    return NextResponse.json({
      leads: {
        total: totalLeads,
        new: newLeads,
        contacted: contactedLeads,
        converted: convertedLeads,
        monthly: monthlyLeads
      },
      projects: {
        total: totalProjects,
        new: newProjects,
        inProgress: inProgressProjects,
        completed: completedProjects
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}

