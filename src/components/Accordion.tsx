import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
}: AccordionProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen)
  const [isClosing, setIsClosing] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)

  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : openUncontrolled

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setOpenUncontrolled(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const getContentHeight = () => innerRef.current?.scrollHeight ?? 0

  useLayoutEffect(() => {
    if (open) {
      setMaxHeight(getContentHeight())
      return
    }

    if (!isClosing) {
      setMaxHeight(0)
    }
  }, [open, isClosing, children])

  const toggle = () => {
    if (open) {
      setMaxHeight(getContentHeight())
      requestAnimationFrame(() => {
        setMaxHeight(0)
        setIsClosing(true)
        setOpen(false)
      })
      return
    }

    setIsClosing(false)
    setOpen(true)
    requestAnimationFrame(() => {
      setMaxHeight(getContentHeight())
    })
  }

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'max-height') return
    if (isClosing) setIsClosing(false)
  }

  return (
    <div className="pickup-data-panel">
      <div className="pickup-data-panel-trigger-border order-card-border w-full max-w-full min-w-0">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="order-card-surface pickup-data-panel-trigger w-full"
        >
          <span>{title}</span>
          <span
            className={`pickup-data-panel-chevron ${open ? '' : 'pickup-data-panel-chevron--closed'}`}
            aria-hidden="true"
          >
            ▲
          </span>
        </button>
      </div>

      <div
        className="expandable-panel overflow-hidden"
        style={{ maxHeight: `${maxHeight}px` }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div ref={innerRef} className="pickup-data-panel-body expandable-panel-content">
          {children}
        </div>
      </div>
    </div>
  )
}
