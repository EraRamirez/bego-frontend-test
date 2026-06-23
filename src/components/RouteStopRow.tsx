import type { ReactNode } from 'react'

interface RouteStopRowProps {
  icon: string
  iconClassName: string
  children: ReactNode
  iconVariant?: 'compact' | 'badge'
  onSelect?: () => void
}

export default function RouteStopRow({
  icon,
  iconClassName,
  children,
  iconVariant = 'compact',
  onSelect,
}: RouteStopRowProps) {
  const slotClass =
    iconVariant === 'badge'
      ? 'route-stop-icon-slot route-stop-icon-slot--badge'
      : 'route-stop-icon-slot route-stop-icon-slot--card'

  const content = (
    <>
      <div className={`${slotClass} flex shrink-0 items-center justify-center`}>
        <img src={icon} alt="" className={iconClassName} aria-hidden="true" />
      </div>
      {children}
    </>
  )

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className="selectable-stop-row flex w-full min-w-0 items-start gap-3 border-none bg-transparent p-0 text-left"
      >
        {content}
      </button>
    )
  }

  return <div className="flex min-w-0 items-start gap-3">{content}</div>
}
