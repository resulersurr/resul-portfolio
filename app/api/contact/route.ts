import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, budget, timeline, projectType } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'İsim, telefon ve mesaj alanları zorunludur' },
        { status: 400 }
      )
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        budget,
        timeline,
        projectType,
      },
    })

    return NextResponse.json(
      { success: true, message: contactMessage },
      { status: 201 }
    )
  } catch (error) {
    console.error('Mesaj kaydedilirken hata:', error)
    return NextResponse.json(
      { error: 'Mesaj kaydedilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
