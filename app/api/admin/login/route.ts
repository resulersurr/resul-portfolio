import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const MAX_ATTEMPTS = 5
const BLOCK_DURATION = 15 * 60 * 1000 // 15 dakika

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
  
  try {
    // Mevcut deneme sayısını kontrol et
    const attempt = await prisma.loginAttempt.findUnique({
      where: { ip }
    })

    if (attempt && attempt.count >= MAX_ATTEMPTS) {
      const timeSinceLast = Date.now() - new Date(attempt.lastAttempt).getTime()
      
      if (timeSinceLast < BLOCK_DURATION) {
        return NextResponse.json(
          { error: 'Çok fazla başarısız deneme. Lütfen 15 dakika sonra tekrar deneyin.' },
          { status: 429 }
        )
      } else {
        // Süre dolmuşsa denemeyi sıfırla
        await prisma.loginAttempt.delete({ where: { ip } })
      }
    }

    const body = await request.json()
    const { password } = body

    if (password === process.env.ADMIN_PASSWORD) {
      // Başarılı girişte denemeleri temizle
      if (attempt) {
        await prisma.loginAttempt.delete({ where: { ip } })
      }

      const response = NextResponse.json({ success: true })
      
      // Güvenli session cookie'si oluştur
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 gün
      })

      return response
    }

    // Başarısız denemede sayacı artır
    await prisma.loginAttempt.upsert({
      where: { ip },
      update: {
        count: { increment: 1 },
        lastAttempt: new Date()
      },
      create: {
        ip,
        count: 1,
        lastAttempt: new Date()
      }
    })

    return NextResponse.json(
      { error: 'Giriş bilgileri geçersiz' }, // Güvenlik için genel mesaj
      { status: 401 }
    )
  } catch (error) {
    console.error('Login hatası:', error)
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
}
