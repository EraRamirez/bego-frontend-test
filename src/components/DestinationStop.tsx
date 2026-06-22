import type { Destination } from '../types/order'
import {
  cityFromAddress,
  formatDate,
  formatTime,
  getDestinationTimestamp,
} from '../utils/date'
import { isBlueStatus } from '../utils/order'
import ExpandableText from './ExpandableText'
import Text from './ui/Text'

interface DestinationStopProps {
  destination?: Destination
  variant: 'card' | 'detail'
  label?: string
  isActive?: boolean
  fallbackStatus?: string
  onClick?: () => void
}

export default function DestinationStop({
  destination,
  variant,
  label,
  isActive = false,
  fallbackStatus = '',
  onClick,
}: DestinationStopProps) {
  const timestamp = getDestinationTimestamp(destination)
  const statusLabel = destination?.status_string ?? fallbackStatus
  const isBlue = isBlueStatus(destination?.status_class)

  if (variant === 'card') {
    return (
      <div className="min-w-0 flex-1">
        {label && <Text variant="stop-label">{label}</Text>}

        <div className="flex items-start justify-between gap-2">
          <Text variant="stop-city" className="min-w-0 truncate">
            {cityFromAddress(destination?.address)}
          </Text>
          {timestamp && (
            <Text variant="stop-date" className="shrink-0 text-right">
              {formatDate(timestamp)}
            </Text>
          )}
        </div>

        <div className="route-stop-address-row flex items-start justify-between gap-2">
          <ExpandableText
            text={destination?.address ?? '—'}
            className="text-stop-address min-w-0 flex-1"
            maxChars={28}
          />
          {timestamp && (
            <Text variant="stop-time" className="shrink-0 text-right">
              {formatTime(timestamp)}
            </Text>
          )}
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-0 flex-1 text-left"
    >
      <Text variant="detail-city">{cityFromAddress(destination?.address)}</Text>
      <ExpandableText
        text={destination?.address ?? '—'}
        className="text-detail-address mt-0.5"
        stopPropagation
      />
      <div className="mt-1.5 flex items-center gap-2">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            isBlue ? 'bg-[#3b82f6]' : 'bg-[#6b7280]'
          }`}
          aria-hidden="true"
        />
        <Text
          as="span"
          variant="detail-status"
          className={isActive ? 'text-white' : 'text-[#9ca3af]'}
        >
          {statusLabel}
        </Text>
      </div>
    </button>
  )
}
