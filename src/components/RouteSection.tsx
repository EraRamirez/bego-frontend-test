import type { ReactNode } from 'react'
import RouteTrackLine from './RouteTrackLine'

interface RouteSectionProps {
  children: ReactNode
  className?: string
  rowGap?: 'sm' | 'md'
  hasStopLabels?: boolean
}

const ROW_GAP = {
  sm: 'space-y-5',
  md: 'space-y-[22px]',
} as const

export default function RouteSection({
  children,
  className = 'mt-8',
  rowGap = 'md',
  hasStopLabels = false,
}: RouteSectionProps) {
  return (
    <div
      className={`relative ${hasStopLabels ? 'route-section--labeled' : ''} ${className}`}
    >
      <RouteTrackLine />
      <div className={`relative z-10 ${ROW_GAP[rowGap]}`}>{children}</div>
    </div>
  )
}
