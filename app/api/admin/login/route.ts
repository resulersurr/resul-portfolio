import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      
      // Set session cookie
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
      })

      return response
    }

    return NextResponse.json(
      { error: 'Geçersiz şifre' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login hatası:', error)
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    )
  }
}
