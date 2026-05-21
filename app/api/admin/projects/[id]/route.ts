import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { parseProjectRequest } from '@/lib/project-images'

// PATCH /api/admin/projects/[id] - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await parseProjectRequest(request, false)
    const { title, category, description, tech, image, link, github, isActive, order } = body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (category !== undefined) updateData.category = category
    if (description !== undefined) updateData.description = description
    if (tech !== undefined) updateData.tech = tech
    if (image !== undefined) updateData.image = image
    if (link !== undefined) updateData.link = link
    if (github !== undefined) updateData.github = github
    if (isActive !== undefined) updateData.isActive = isActive
    if (order !== undefined) updateData.order = order

    const project = await prisma.project.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('Error updating project:', error)

    if (error instanceof Error && (
      error.message === 'Sadece JPG, PNG, WEBP veya GIF formatinda resim yukleyebilirsiniz' ||
      error.message === 'Resim 5MB boyutundan kucuk olmali'
    )) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    await prisma.project.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
