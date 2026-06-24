import { useEffect, useMemo, useState, type SyntheticEvent } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import DestinationDataPanel from '../components/DestinationDataPanel'
import LoadingScreen from '../components/LoadingScreen'
import OrderRouteStops from '../components/OrderRouteStops'
import OrderStatusCard from '../components/OrderStatusCard'
import OrderSummaryCard from '../components/OrderSummaryCard'
import PageHeader from '../components/PageHeader'
import { DEFAULT_AVATAR } from '../constants'
import { fetchOrderDetail } from '../services/orders.service'
import type { DestinationTab, OrderDetail, UpcomingOrder } from '../types/order'
import { formatTime, getDestinationTimestamp } from '../utils/date'
import { mergeOrderDetail } from '../utils/order'

export default function OrderDetailsPage() {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const listOrder = location.state?.order as UpcomingOrder | undefined

  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [tab, setTab] = useState<DestinationTab>('pickup')
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    fetchOrderDetail()
      .then((detail) => {
        setOrder(mergeOrderDetail(detail, listOrder, orderNumber))
      })
      .catch(console.error)
  }, [listOrder, orderNumber])

  const [pickup, dropoff] = order?.destinations ?? []

  const destination = useMemo(() => {
    if (!order) return undefined
    return tab === 'pickup' ? pickup : dropoff
  }, [order, tab, pickup, dropoff])

  const timelineSteps = useMemo(() => {
    if (!order?.status_list) return []
    return order.status_list[tab] ?? []
  }, [order, tab])

  if (!order) {
    return (
      <div className="pb-8">
        <PageHeader
          title="Detalle de carga"
          showBack
          onBack={() => navigate(-1)}
        />
        <LoadingScreen
          message="Cargando detalles"
          description="Obteniendo información del pedido..."
        />
      </div>
    )
  }

  const canTrack = order.status >= 3
  const avatar = order.driver?.thumbnail || order.driver_thumbnail || DEFAULT_AVATAR
  const destStart = getDestinationTimestamp(destination)
  const accordionTitle = tab === 'pickup' ? 'Datos de recogida' : 'Datos de entrega'

  const handleAvatarError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = DEFAULT_AVATAR
  }

  const handleSelectStop = (stop: DestinationTab) => {
    setTab(stop)
    setPanelOpen(true)
  }

  const handleTrackOrder = () => {
    console.log(`Rastrear pedido — Pedido #${order.order_number}`)
  }

  return (
    <div className="order-details-page page-gutter min-w-0 space-y-5 overflow-x-hidden pb-8">
      <PageHeader
        title="Detalle de carga"
        showBack
        onBack={() => navigate(-1)}
      />

      <OrderSummaryCard
        referenceNumber={order.reference_number}
        orderNumber={order.order_number}
      >
        <OrderRouteStops
          pickup={pickup}
          dropoff={dropoff}
          mode="selectable"
          activeStop={tab}
          onSelectStop={handleSelectStop}
          className="detail-track-column mt-4"
          rowGap="sm"
        />
      </OrderSummaryCard>

      <OrderStatusCard
        avatar={avatar}
        timeLabel={destStart ? formatTime(destStart) : '10:30 PM'}
        timelineSteps={timelineSteps}
        canTrack={canTrack}
        onAvatarError={handleAvatarError}
        onTrackOrder={handleTrackOrder}
      />

      <DestinationDataPanel
        title={accordionTitle}
        destination={destination}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </div>
  )
}
