interface RouteTrackLineProps {
  className?: string
}

export default function RouteTrackLine({ className = '' }: RouteTrackLineProps) {
  return (
    <div
      className={`route-track-line pointer-events-none absolute left-[13px] z-0 ${className}`}
      aria-hidden="true"
    />
  )
}
