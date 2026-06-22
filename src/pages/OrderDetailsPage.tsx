import { useEffect, useMemo, useState, type SyntheticEvent } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion'
import PageHeader from '../components/PageHeader'
import Timeline from '../components/Timeline'
import { DEFAULT_AVATAR, DESTINATION_TABS } from '../constants'
import { fetchOrderDetail } from '../services/orders.service'
import type { DestinationTab, OrderDetail, UpcomingOrder } from '../types/order'
import {
  cityFromAddress,
  formatLongDate,
  formatTime,
  getDestinationTimestamp,
} from '../utils/date'
import { isBlueStatus, mergeOrderDetail } from '../utils/order'

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

  const destination = useMemo(() => {
    if (!order) return undefined
    return tab === 'pickup' ? order.destinations[0] : order.destinations[1]
  }, [order, tab])

  const timelineSteps = useMemo(() => {
    if (!order?.status_list) return []
    return order.status_list[tab] ?? []
  }, [order, tab])

  if (!order) {
    return <p className="p-4 text-[#9ca3af]">Loading...</p>
  }

  const canTrack = order.status >= 3
  const avatar = order.driver?.thumbnail || order.driver_thumbnail || DEFAULT_AVATAR
  const destStart = getDestinationTimestamp(destination)
  const accordionTitle = tab === 'pickup' ? 'Pickup Data' : 'Dropoff Data'

  const handleAvatarError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = DEFAULT_AVATAR
  }

  return (
    <div className="space-y-4 px-4 pb-8">
      <PageHeader
        title="Cargo Details"
        showBack
        onBack={() => navigate(-1)}
      />

      <div className="rounded-[20px] border border-[#2a2a2a] bg-[#141414] p-4">
        <p className="text-[13px] text-[#9ca3af]">
          Referencia {order.reference_number ?? '—'}
        </p>
        <p className="text-[16px] font-bold">Order #{order.order_number}</p>

        <div className="mt-4 inline-flex rounded-full bg-[#1c1c1c] p-1">
          {DESTINATION_TABS.map((destinationTab) => (
            <button
              key={destinationTab}
              type="button"
              onClick={() => setTab(destinationTab)}
              className={`rounded-full px-5 py-1.5 text-[13px] font-semibold capitalize ${
                tab === destinationTab
                  ? 'bg-bego-yellow text-black'
                  : 'text-[#9ca3af]'
              }`}
            >
              {destinationTab}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              tab === 'pickup'
                ? 'bg-bego-yellow text-black'
                : 'border border-[#444] text-[#9ca3af]'
            }`}
            aria-hidden="true"
          >
            🚛
          </div>

          <div>
            <p className="text-[11px] font-bold text-bego-yellow">{tab.toUpperCase()}</p>
            <p className="text-[14px] font-semibold">
              {cityFromAddress(destination?.address)}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[12px]">
              <span
                className={`h-2 w-2 rounded-full ${
                  isBlueStatus(destination?.status_class)
                    ? 'bg-[#3b82f6]'
                    : 'bg-[#6b7280]'
                }`}
                aria-hidden="true"
              />
              {destination?.status_string ?? (tab === 'pickup' ? 'Accepted' : 'On hold')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-2">
        <img
          src={avatar}
          alt="Conductor"
          className="h-16 w-16 rounded-full border-2 border-[#333] object-cover"
          onError={handleAvatarError}
        />
        <p className="mt-2 text-[14px] font-semibold text-bego-yellow">
          {destStart ? formatTime(destStart) : '10:30 PM'}
        </p>

        <div className="mt-6 w-full">
          <Timeline steps={timelineSteps} />
        </div>
      </div>

      <button
        type="button"
        disabled={!canTrack}
        onClick={() => console.log('Track Order')}
        className={`w-full rounded-2xl py-4 text-[15px] font-bold ${
          canTrack
            ? 'bg-bego-yellow text-black hover:bg-bego-yellow-hover'
            : 'cursor-not-allowed bg-[#2a2a2a] text-[#6b7280]'
        }`}
      >
        Track Order
      </button>

      <Accordion title={accordionTitle}>
        <p>{destination?.address}</p>
        {destStart && (
          <p className="mt-2 font-semibold text-white">{formatLongDate(destStart)}</p>
        )}
        <p className="mt-2">{destination?.contact_info?.telephone}</p>
        <p className="text-bego-yellow">{destination?.contact_info?.email}</p>
      </Accordion>
    </div>
  )
}
