import type { ReactNode } from 'react'
import CardShell from './CardShell'
import OrderHeading from './OrderHeading'
import Text from './ui/Text'

interface OrderSummaryCardProps {
  referenceNumber?: string | number | null
  orderNumber: string | number
  children: ReactNode
}

export default function OrderSummaryCard({
  referenceNumber,
  orderNumber,
  children,
}: OrderSummaryCardProps) {
  return (
    <div className="order-summary-card min-w-0">
      <CardShell variant="order" className="pb-3.5">
        <Text variant="detail-reference">
          Referencia {referenceNumber ?? '—'}
        </Text>
        <div className="mt-1">
          <OrderHeading orderNumber={orderNumber} />
        </div>
        {children}
      </CardShell>
    </div>
  )
}
