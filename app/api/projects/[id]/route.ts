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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await checkAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'المشروع غير موجود' },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ في استرجاع البيانات' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      end_date, 
      status 
    } = body

    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (name !== undefined) updateData.name = name
    if (client_name !== undefined) updateData.client_name = client_name
    if (client_phone !== undefined) updateData.client_phone = client_phone
    if (service !== undefined) updateData.service = service
    if (area !== undefined) updateData.area = area
    if (budget !== undefined) updateData.budget = budget
    if (description !== undefined) updateData.description = description
    if (start_date !== undefined) updateData.start_date = start_date
    if (end_date !== undefined) updateData.end_date = end_date
    if (status !== undefined) updateData.status = status

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(updateData)
      .eq('id', params.id)
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ في تحديث البيانات' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'تم تحديث المشروع بنجاح', data: data[0] }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await checkAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ في حذف المشروع' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'تم حذف المشروع بنجاح' }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}

