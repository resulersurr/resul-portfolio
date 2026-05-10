export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatShortDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
