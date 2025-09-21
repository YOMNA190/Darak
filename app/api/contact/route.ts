import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { validatePhone, validateEmail } from '@/utils/helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    // Validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'الاسم ورقم الهاتف والرسالة مطلوبة' },
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

    // Insert contact message into leads table as a general inquiry
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          name,
          phone,
          email: email || null,
          service: 'general-inquiry',
          area: 'N/A',
          message,
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
    // For now, we'll just return a success message after saving to DB.
    console.log('Contact message submitted successfully. Data:', data)

    return NextResponse.json(
      { message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' },
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


