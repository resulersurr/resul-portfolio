import { NextRequest, NextResponse } from 'next/server'

export async function isAuthenticated(request: NextRequest): Promise<NextResponse | null> {
  const session = request.cookies.get('admin_session')?.value
  
  if (session !== 'authenticated') {
    return NextResponse.json(
      { error: 'Yetkilendirme gerekli' },
      { status: 401 }
    )
  }
  
  return null
}
