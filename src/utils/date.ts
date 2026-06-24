export function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

export function formatDate(ms?: number): string {
  if (!ms) return ''

  return new Date(ms).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

export function formatTime(ms?: number): string {
  if (!ms) return ''

  return new Date(ms).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatPanelDateTime(ms?: number): string {
  if (!ms) return ''

  const date = new Date(ms)
  const day = date.getDate()
  const month = date.toLocaleDateString('es-MX', { month: 'long' })
  const monthLabel = month.charAt(0).toUpperCase() + month.slice(1)
  const year = date.getFullYear()

  return `${day} de ${monthLabel} ${year} • ${formatTime(ms)}`
}

export function formatLongDate(ms?: number): string {
  if (!ms) return ''

  const date = new Date(ms).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return `${date} · ${formatTime(ms)}`
}

export function cityFromAddress(address?: string): string {
  if (!address) return '—'

  const parts = address.split(',').map((part) => part.trim())
  const rawCity = parts[parts.length - 3] || parts[1] || parts[0] || '—'

  return rawCity.replace(/^\d+\s*/, '').trim() || rawCity
}

export function getDestinationTimestamp(destination?: {
  start_date?: number
  startDate?: number
}): number | undefined {
  return destination?.start_date ?? destination?.startDate
}
