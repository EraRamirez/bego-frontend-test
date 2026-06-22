import type { ReactNode } from 'react'

interface RouteStopRowProps {
  icon: string
  iconClassName: string
  children: ReactNode
  align?: 'card' | 'detail'
}

export default function RouteStopRow({
  icon,
  iconClassName,
  children,
  align = 'card',
}: RouteStopRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`route-stop-icon-slot route-stop-icon-slot--${align} flex w-7 shrink-0 items-center justify-center`}
      >
        <img src={icon} alt="" className={iconClassName} aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
