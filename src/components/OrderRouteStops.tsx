import DestinationStop, { type DestinationStopMode } from './DestinationStop'
import RouteSection from './RouteSection'
import RouteStopRow from './RouteStopRow'
import { DETAIL_STOP_ICONS, ROUTE_ICONS } from '../constants/route'
import type { Destination } from '../types/order'
import { isDestinationActiveState } from '../utils/order'

interface OrderRouteStopsProps {
  pickup?: Destination
  dropoff?: Destination
  mode?: DestinationStopMode
  activeStop?: 'pickup' | 'dropoff'
  onSelectStop?: (stop: 'pickup' | 'dropoff') => void
  className?: string
  rowGap?: 'sm' | 'md'
}

export default function OrderRouteStops({
  pickup,
  dropoff,
  mode = 'card',
  activeStop = 'pickup',
  onSelectStop,
  className,
  rowGap = 'md',
}: OrderRouteStopsProps) {
  const isSelectable = mode === 'selectable'

  const getStopIcon = (
    stop: 'pickup' | 'dropoff',
    destination?: Destination,
    fallbackStatus?: string,
  ) => {
    if (!isSelectable) {
      return stop === 'pickup' ? ROUTE_ICONS.pickup : ROUTE_ICONS.dropoff
    }

    return isDestinationActiveState(destination, fallbackStatus)
      ? DETAIL_STOP_ICONS.active
      : DETAIL_STOP_ICONS.inactive
  }

  const pickupIcon = getStopIcon('pickup', pickup, 'Accepted')
  const dropoffIcon = getStopIcon('dropoff', dropoff, 'On hold')

  const sectionClassName = [
    isSelectable ? 'route-section--badges' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <RouteSection
      hasStopLabels
      className={sectionClassName || undefined}
      rowGap={rowGap}
    >
      <RouteStopRow
        icon={pickupIcon.src}
        iconClassName={pickupIcon.className}
        iconVariant={isSelectable ? 'badge' : 'compact'}
        onSelect={isSelectable ? () => onSelectStop?.('pickup') : undefined}
      >
        <DestinationStop
          label="PICKUP"
          destination={pickup}
          mode={mode}
          isActive={!isSelectable || activeStop === 'pickup'}
          fallbackStatus="Accepted"
        />
      </RouteStopRow>

      <RouteStopRow
        icon={dropoffIcon.src}
        iconClassName={dropoffIcon.className}
        iconVariant={isSelectable ? 'badge' : 'compact'}
        onSelect={isSelectable ? () => onSelectStop?.('dropoff') : undefined}
      >
        <DestinationStop
          label="DROPOFF"
          destination={dropoff}
          mode={mode}
          isActive={!isSelectable || activeStop === 'dropoff'}
          fallbackStatus="On hold"
        />
      </RouteStopRow>
    </RouteSection>
  )
}
