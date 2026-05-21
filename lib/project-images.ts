import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'projects')

const EXTENSIONS_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

function slugifyFilename(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'project'
}

export async function saveProjectImage(file: File) {
  const extension = EXTENSIONS_BY_TYPE[file.type]

  if (!extension) {
    throw new Error('Only JPG, PNG, WEBP and GIF images are allowed')
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image must be smaller than 5MB')
  }

  await mkdir(UPLOAD_DIR, { recursive: true })

  const baseName = slugifyFilename(file.name.replace(/\.[^.]+$/, ''))
  const filename = `${baseName}-${Date.now()}.${extension}`
  const bytes = await file.arrayBuffer()

  await writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(bytes))

  return `/uploads/projects/${filename}`
}

export async function parseProjectRequest(request: Request, requireImage: boolean) {
  const contentType = request.headers.get('content-type') || ''

  if (!contentType.includes('multipart/form-data')) {
    const body = await request.json()
    return body
  }

  const formData = await request.formData()
  const imageFile = formData.get('image')
  const data: Record<string, unknown> = {}

  for (const [key, value] of formData.entries()) {
    if (key === 'image') continue
    data[key] = value
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    data.image = await saveProjectImage(imageFile)
  } else if (requireImage) {
    throw new Error('Image is required')
  }

  if (typeof data.order === 'string') {
    data.order = Number.parseInt(data.order, 10) || 0
  }

  if (typeof data.isActive === 'string') {
    data.isActive = data.isActive === 'true' || data.isActive === 'on'
  }

  return data
}
