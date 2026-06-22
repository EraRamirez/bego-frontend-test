import { useNavigate } from 'react-router-dom'
import { ASSETS, getOrderTypeIcon } from '../constants/assets'
import { useCountdown } from '../hooks/useCountdown'
import type { Destination, UpcomingOrder } from '../types/order'
import {
  cityFromAddress,
  formatCountdown,
  formatDate,
  formatTime,
  getDestinationTimestamp,
} from '../utils/date'
import { isBlueStatus } from '../utils/order'

interface DestinationStopProps {
  label: string
  destination?: Destination
  labelClassName: string
  icon: string
}

function DestinationStop({
  label,
  destination,
  labelClassName,
  icon,
}: DestinationStopProps) {
  const timestamp = getDestinationTimestamp(destination)

  return (
    <div className="relative">
      <span className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#1c1c1c]">
        <img src={icon} alt="" className="h-[18px] w-auto" aria-hidden="true" />
      </span>
      <p className={`text-[11px] font-bold tracking-wider ${labelClassName}`}>{label}</p>
      <p className="text-[15px] font-semibold">{cityFromAddress(destination?.address)}</p>
      <p className="mt-0.5 text-[12px] text-[#9ca3af]">{destination?.address}</p>
      {timestamp && (
        <p className="mt-1 text-[12px] font-semibold">
          {formatDate(timestamp)} · {formatTime(timestamp)}
        </p>
      )}
    </div>
  )
}

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
    <article className="rounded-[20px] border border-[#2a2a2a] bg-[#141414] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={getOrderTypeIcon(order.type)}
            alt=""
            className="h-[15px] w-auto"
            aria-hidden="true"
          />
          <span className="text-[15px] font-bold">{order.type}</span>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-[#d1d5db]">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isBlueStatus(order.status_class) ? 'bg-[#3b82f6]' : 'bg-[#6b7280]'
            }`}
            aria-hidden="true"
          />
          {order.status_string}
        </div>
      </div>

      <div className="relative ml-2 space-y-5 border-l-2 border-[#333] pl-6">
        <DestinationStop
          label="PICKUP"
          destination={pickup}
          labelClassName="text-bego-yellow"
          icon={ASSETS.pickup}
        />
        <DestinationStop
          label="DROPOFF"
          destination={dropoff}
          labelClassName="text-[#9ca3af]"
          icon={ASSETS.dropoff}
        />
      </div>

      {!isReady ? (
        <p className="mt-5 text-center text-[14px] text-[#9ca3af]">
          Start pickup in{' '}
          <span className="font-bold text-bego-yellow">{formatCountdown(remaining)}</span>
        </p>
      ) : (
        <p className="mt-5 text-center text-[14px] font-semibold text-bego-yellow">
          Its time for pickup
        </p>
      )}

      <button
        type="button"
        disabled={!isReady}
        onClick={handleResume}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-bold transition ${
          isReady
            ? 'bg-bego-yellow text-black hover:bg-bego-yellow-hover'
            : 'cursor-not-allowed bg-[#2a2a2a] text-[#6b7280]'
        }`}
      >
        <img
          src={ASSETS.resume}
          alt=""
          className={`h-4 w-auto ${isReady ? '' : 'opacity-50'}`}
          aria-hidden="true"
        />
        Resume
      </button>
    </article>
  )
}
