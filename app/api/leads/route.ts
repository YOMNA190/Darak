import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { validatePhone, validateEmail } from '@/utils/helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, area, name, phone, email, message } = body

    // Validation
    if (!name || !phone || !service || !area) {
      return NextResponse.json(
        { error: 'الاسم ورقم الهاتف والخدمة والمساحة مطلوبة' },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      )
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      )
    }

    // Insert lead into database
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          name,
          phone,
          email: email || null,
          service,
          area: typeof area === 'string' ? area : area.toString(),
          message: message || null,
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

    // In a real application, you would integrate an email sending service here.
    // For example, using Nodemailer or a third-party service like SendGrid.
    // For now, we'll just return a success message.
    console.log('Lead submitted successfully. Data:', data)

    return NextResponse.json(
      { message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' },
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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'غير مصرح به' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    // In a real application, you would verify the token with your auth provider
    // For this project, we'll assume the token is valid if it exists for GET requests

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    
    const offset = (page - 1) * limit

    let query = supabaseAdmin
      .from('leads')
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

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'غير مصرح به' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    // In a real application, you would verify the token with your auth provider

    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ message: 'معرف العميل والحالة مطلوبان' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.from('leads').update({ status }).eq('id', id).select()

    if (error) {
      console.error('Error updating lead status:', error)
      return NextResponse.json({ message: 'فشل في تحديث حالة العميل' }, { status: 500 })
    }

    return NextResponse.json({ message: 'تم تحديث حالة العميل بنجاح', data }, { status: 200 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ message: 'حدث خطأ غير متوقع.' }, { status: 500 })
  }
}


