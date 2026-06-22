import { useNavigate } from 'react-router-dom'
import CardShell from './CardShell'
import DestinationStop from './DestinationStop'
import OrderCardActions from './OrderCardActions'
import OrderCardHeader from './OrderCardHeader'
import RouteSection from './RouteSection'
import RouteStopRow from './RouteStopRow'
import { ROUTE_ICONS } from '../constants/route'
import { useCountdown } from '../hooks/useCountdown'
import type { UpcomingOrder } from '../types/order'

interface OrderCardProps {
  order: UpcomingOrder
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate()
  const { remaining, isReady } = useCountdown(order.start_date)
  const [pickup, dropoff] = order.destinations

  const handleResume = () => {
    navigate(`/orders/${order.order_number}`, { state: { order } })
  }

  return (
    <CardShell variant="order">
      <OrderCardHeader
        type={order.type}
        status={order.status_string}
        statusClass={order.status_class}
      />

      <RouteSection hasStopLabels>
        <RouteStopRow
          icon={ROUTE_ICONS.pickup.src}
          iconClassName={ROUTE_ICONS.pickup.className}
        >
          <DestinationStop variant="card" label="PICKUP" destination={pickup} />
        </RouteStopRow>

        <RouteStopRow
          icon={ROUTE_ICONS.dropoff.src}
          iconClassName={ROUTE_ICONS.dropoff.className}
        >
          <DestinationStop variant="card" label="DROPOFF" destination={dropoff} />
        </RouteStopRow>
      </RouteSection>

      <OrderCardActions
        isReady={isReady}
        remaining={remaining}
        onResume={handleResume}
      />
    </CardShell>
  )
}
