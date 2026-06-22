import Text from './ui/Text'

interface OrderHeadingProps {
  orderNumber: string | number
}

export default function OrderHeading({ orderNumber }: OrderHeadingProps) {
  return (
    <p className="leading-none">
      <Text as="span" variant="order-label">
        Order{' '}
      </Text>
      <Text as="span" variant="order-number">
        #{orderNumber}
      </Text>
    </p>
  )
}
