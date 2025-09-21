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
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    
    const offset = (page - 1) * limit

    let query = supabaseAdmin
      .from('projects')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ في استرجاع البيانات' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
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

export async function POST(request: NextRequest) {
  const authResult = await checkAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const body = await request.json()
    const { 
      name, 
      client_name, 
      client_phone, 
      service, 
      area, 
      budget, 
      description, 
      start_date, 
      end_date 
    } = body

    // Validation
    if (!name || !client_name || !client_phone || !service) {
      return NextResponse.json(
        { error: 'اسم المشروع واسم العميل ورقم الهاتف والخدمة مطلوبة' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([
        {
          name,
          client_name,
          client_phone,
          service,
          area: area || 0,
          budget: budget || null,
          description: description || null,
          start_date: start_date || null,
          end_date: end_date || null,
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ في حفظ البيانات' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'تم إنشاء المشروع بنجاح', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}

