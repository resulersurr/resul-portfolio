const MAX_IMAGE_SIZE = 5 * 1024 * 1024

const EXTENSIONS_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export async function saveProjectImage(file: File) {
  const extension = EXTENSIONS_BY_TYPE[file.type]

  if (!extension) {
    throw new Error('Sadece JPG, PNG, WEBP veya GIF formatinda resim yukleyebilirsiniz')
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Resim 5MB boyutundan kucuk olmali')
  }

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')

  return `data:${file.type};base64,${base64}`
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
    throw new Error('Resim secmeniz gerekiyor')
  }

  if (typeof data.order === 'string') {
    data.order = Number.parseInt(data.order, 10) || 0
  }

  if (typeof data.isActive === 'string') {
    data.isActive = data.isActive === 'true' || data.isActive === 'on'
  }

  return data
}
