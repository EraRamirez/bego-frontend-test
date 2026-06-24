import type { Destination } from '../types/order'
import { formatPanelDateTime, getDestinationTimestamp } from '../utils/date'
import Accordion from './Accordion'

interface DestinationDataPanelProps {
  title: string
  destination?: Destination
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function DestinationDataPanel({
  title,
  destination,
  open,
  onOpenChange,
}: DestinationDataPanelProps) {
  const timestamp = getDestinationTimestamp(destination)
  const address = destination?.address?.trim()
  const telephone = destination?.contact_info?.telephone?.trim()
  const email = destination?.contact_info?.email?.trim()

  return (
    <Accordion title={title} open={open} onOpenChange={onOpenChange}>
      {address && <p className="pickup-data-panel-field">{address}</p>}
      {timestamp && (
        <p className="pickup-data-panel-field">{formatPanelDateTime(timestamp)}</p>
      )}
      {telephone && <p className="pickup-data-panel-field">{telephone}</p>}
      {email && <p className="pickup-data-panel-field">{email}</p>}
    </Accordion>
  )
}
