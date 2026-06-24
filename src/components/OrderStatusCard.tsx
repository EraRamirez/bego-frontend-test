import type { SyntheticEvent } from 'react'
import CardShell from './CardShell'
import Timeline from './Timeline'
import Text from './ui/Text'
import type { StatusStep } from '../types/order'

interface OrderStatusCardProps {
  avatar: string
  timeLabel: string
  timelineSteps: StatusStep[]
  canTrack: boolean
  onAvatarError: (event: SyntheticEvent<HTMLImageElement>) => void
  onTrackOrder: () => void
}

export default function OrderStatusCard({
  avatar,
  timeLabel,
  timelineSteps,
  canTrack,
  onAvatarError,
  onTrackOrder,
}: OrderStatusCardProps) {
  return (
    <div className="detail-status-card-wrapper relative mt-16 min-w-0">
      <img
        src={avatar}
        alt="Conductor"
        className="detail-avatar absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 object-cover"
        onError={onAvatarError}
      />

      <CardShell variant="order" className="detail-status-card pb-0 pt-[68px]">
        <Text variant="detail-title" className="text-center">
          {timeLabel}
        </Text>

        <div className="mt-6">
          <Timeline steps={timelineSteps} />
        </div>

        <button
          type="button"
          disabled={!canTrack}
          onClick={onTrackOrder}
          className="track-order-button mt-6"
        >
          <Text as="span" variant="order-number" className="track-order-button-label">
            Track Order
          </Text>
        </button>
      </CardShell>
    </div>
  )
}
