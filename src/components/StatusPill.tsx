import Text from './ui/Text'

interface StatusPillProps {
  label: string
  isBlue?: boolean
  isActive?: boolean
}

export default function StatusPill({
  label,
  isBlue = false,
  isActive = true,
}: StatusPillProps) {
  return (
    <div className="status-pill">
      <span
        className={`status-pill-dot ${
          isBlue ? 'status-pill-dot--blue' : 'status-pill-dot--gray'
        }`}
        aria-hidden="true"
      />
      <Text
        as="span"
        variant="card-status"
        className={isActive ? 'text-bego-white' : 'text-bego-gray'}
      >
        {label}
      </Text>
    </div>
  )
}
