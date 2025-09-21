import { NextRequest, NextResponse } from 'next/server'
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      )
    }

    // Retrieve admin credentials from environment variables
    // In a real production environment, these would typically be fetched from a secure database
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@darak.sa'
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

    // If ADMIN_PASSWORD_HASH is not set in environment, use a default hash for 'admin123'
    // This is for demonstration/development purposes. ALWAYS set ADMIN_PASSWORD_HASH in .env.local for security.
    const defaultAdminPasswordHash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcJDxJ/ka' // Hash for 'admin123'
    const effectiveAdminPasswordHash = adminPasswordHash || defaultAdminPasswordHash

    if (email !== adminEmail) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة' },
        { status: 401 }
      )
    }

    const isValidPassword = await comparePassword(password, effectiveAdminPasswordHash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const user = {
      id: '1',
      email: adminEmail,
      role: 'admin' as const
    }

    const token = generateToken(user)

    return NextResponse.json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}


