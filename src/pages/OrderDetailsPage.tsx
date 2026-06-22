import { useEffect, useMemo, useState, type SyntheticEvent } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion'
import CardShell from '../components/CardShell'
import DestinationStop from '../components/DestinationStop'
import LoadingScreen from '../components/LoadingScreen'
import PageHeader from '../components/PageHeader'
import RouteSection from '../components/RouteSection'
import RouteStopRow from '../components/RouteStopRow'
import Timeline from '../components/Timeline'
import Text from '../components/ui/Text'
import { DEFAULT_AVATAR } from '../constants'
import { ROUTE_ICONS } from '../constants/route'
import { fetchOrderDetail } from '../services/orders.service'
import type { DestinationTab, OrderDetail, UpcomingOrder } from '../types/order'
import { formatLongDate, formatTime, getDestinationTimestamp } from '../utils/date'
import { mergeOrderDetail } from '../utils/order'

export default function OrderDetailsPage() {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const listOrder = location.state?.order as UpcomingOrder | undefined

  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [tab, setTab] = useState<DestinationTab>('pickup')

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
          title="Cargo Details"
          showBack
          onBack={() => navigate(-1)}
        />
        <LoadingScreen
          message="Loading details"
          description="Fetching order information..."
        />
      </div>
    )
  }

  const canTrack = order.status >= 3
  const avatar = order.driver?.thumbnail || order.driver_thumbnail || DEFAULT_AVATAR
  const destStart = getDestinationTimestamp(destination)
  const accordionTitle = tab === 'pickup' ? 'Pickup Data' : 'Dropoff Data'

  const handleAvatarError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = DEFAULT_AVATAR
  }

  return (
    <div className="space-y-5 px-4 pb-8">
      <PageHeader
        title="Cargo Details"
        showBack
        onBack={() => navigate(-1)}
      />

      <CardShell className="p-4">
        <Text variant="detail-reference">
          Referencia {order.reference_number ?? '—'}
        </Text>
        <Text variant="detail-title" className="mt-0.5">
          Order #{order.order_number}
        </Text>

        <RouteSection className="mt-5" rowGap="sm">
          <RouteStopRow
            align="detail"
            icon={ROUTE_ICONS.pickup.src}
            iconClassName={ROUTE_ICONS.pickup.className}
          >
            <DestinationStop
              variant="detail"
              destination={pickup}
              isActive={tab === 'pickup'}
              fallbackStatus="Accepted"
              onClick={() => setTab('pickup')}
            />
          </RouteStopRow>

          <RouteStopRow
            align="detail"
            icon={ROUTE_ICONS.dropoff.src}
            iconClassName={ROUTE_ICONS.dropoff.className}
          >
            <DestinationStop
              variant="detail"
              destination={dropoff}
              isActive={tab === 'dropoff'}
              fallbackStatus="On hold"
              onClick={() => setTab('dropoff')}
            />
          </RouteStopRow>
        </RouteSection>
      </CardShell>

      <CardShell className="relative mt-10 px-4 pb-4 pt-12">
        <img
          src={avatar}
          alt="Conductor"
          className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#333] object-cover"
          onError={handleAvatarError}
        />

        <Text variant="detail-title" className="text-center">
          {destStart ? formatTime(destStart) : '10:30 PM'}
        </Text>

        <div className="mt-6">
          <Timeline steps={timelineSteps} />
        </div>

        <button
          type="button"
          disabled={!canTrack}
          onClick={() => console.log('Track Order')}
          className={`mt-6 w-full rounded-2xl py-4 text-[15px] font-bold ${
            canTrack
              ? 'bg-bego-yellow text-black hover:bg-bego-yellow-hover'
              : 'cursor-not-allowed bg-[#2a2a2a] text-[#6b7280]'
          }`}
        >
          Track Order
        </button>
      </CardShell>

      <Accordion title={accordionTitle}>
        <p className="text-[#d1d5db]">{destination?.address}</p>
        {destStart && (
          <p className="mt-2 font-semibold text-white">{formatLongDate(destStart)}</p>
        )}
        <p className="mt-2 text-white">{destination?.contact_info?.telephone}</p>
        <p className="text-bego-yellow">{destination?.contact_info?.email}</p>
      </Accordion>
    </div>
  )
}
