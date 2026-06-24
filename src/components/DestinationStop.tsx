import type { Destination } from '../types/order'
import {
  cityFromAddress,
  formatDate,
  formatTime,
  getDestinationTimestamp,
} from '../utils/date'
import { isDestinationActiveState } from '../utils/order'
import { translateStatus } from '../utils/translate'
import ExpandableText from './ExpandableText'
import StatusPill from './StatusPill'
import Text from './ui/Text'

export type DestinationStopMode = 'card' | 'selectable'

interface DestinationStopProps {
  destination?: Destination
  label?: string
  mode?: DestinationStopMode
  isActive?: boolean
  fallbackStatus?: string
}

export default function DestinationStop({
  destination,
  label,
  mode = 'card',
  isActive = true,
  fallbackStatus = '',
}: DestinationStopProps) {
  const timestamp = getDestinationTimestamp(destination)
  const statusLabel = destination?.status_string ?? fallbackStatus
  const isBlue = isDestinationActiveState(destination, fallbackStatus)
  const isMuted = mode === 'selectable' && !isActive

  const content = (
    <>
      {label && <Text variant="stop-label">{label}</Text>}

      <div className="flex items-start justify-between gap-2">
        <Text
          variant="stop-city"
          className={`min-w-0 truncate ${isMuted ? 'text-bego-gray' : ''}`}
        >
          {cityFromAddress(destination?.address)}
        </Text>
        {mode === 'card' && timestamp && (
          <Text variant="stop-date" className="shrink-0 text-right">
            {formatDate(timestamp)}
          </Text>
        )}
      </div>

      <div
        className={`route-stop-address-row ${
          mode === 'card' ? 'flex items-start justify-between gap-2' : ''
        }`}
      >
        <ExpandableText
          text={destination?.address ?? '—'}
          className={`text-stop-address min-w-0 ${mode === 'card' ? 'flex-1' : ''} ${
            isMuted ? 'text-[color:var(--text-subtle)]' : ''
          }`}
          maxChars={28}
          stopPropagation={mode === 'selectable'}
        />
        {mode === 'card' && timestamp && (
          <Text variant="stop-time" className="shrink-0 text-right">
            {formatTime(timestamp)}
          </Text>
        )}
      </div>

      {mode === 'selectable' && (
        <StatusPill label={translateStatus(statusLabel)} isBlue={isBlue} isActive={isActive} />
      )}
    </>
  )

  return <div className="min-w-0 flex-1">{content}</div>
}
