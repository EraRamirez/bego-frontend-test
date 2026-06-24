import { getOrderTypeIcon } from '../constants/assets'
import { isBlueStatus } from '../utils/order'
import { translateStatus } from '../utils/translate'
import Text from './ui/Text'

interface OrderCardHeaderProps {
  type: string
  status: string
  statusClass?: string
}

export default function OrderCardHeader({
  type,
  status,
  statusClass,
}: OrderCardHeaderProps) {
  const isBlue = isBlueStatus(statusClass)

  return (
    <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3">
      <div className="flex items-center gap-2">
        <img
          src={getOrderTypeIcon(type)}
          alt=""
          className="h-[13px] w-auto"
          aria-hidden="true"
        />
        <Text as="span" variant="card-type">
          {type}
        </Text>
      </div>

      <div className="flex items-center gap-1.5">
        {isBlue && (
          <span className="status-pill-dot status-pill-dot--blue" aria-hidden="true" />
        )}
        <Text as="span" variant="card-status">
          {translateStatus(status)}
        </Text>
      </div>
    </div>
  )
}
