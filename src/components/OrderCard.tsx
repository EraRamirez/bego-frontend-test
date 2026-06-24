import { useNavigate } from 'react-router-dom'
import CardShell from './CardShell'
import OrderCardActions from './OrderCardActions'
import OrderCardHeader from './OrderCardHeader'
import OrderRouteStops from './OrderRouteStops'
import { useCountdown } from '../hooks/useCountdown'
import type { UpcomingOrder } from '../types/order'

interface OrderCardProps {
  order: UpcomingOrder
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate()
  const { remaining, isReady } = useCountdown(order.start_date, order.order_number)
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

      <OrderRouteStops pickup={pickup} dropoff={dropoff} />

      <OrderCardActions
        isReady={isReady}
        remaining={remaining}
        onResume={handleResume}
      />
    </CardShell>
  )
}
