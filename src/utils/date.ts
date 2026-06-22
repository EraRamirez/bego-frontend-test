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
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
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

  const parts = address.split(',')
  return parts[parts.length - 3]?.trim() || parts[0]?.trim() || '—'
}

export function getDestinationTimestamp(destination?: {
  start_date?: number
  startDate?: number
}): number | undefined {
  return destination?.start_date ?? destination?.startDate
}
