import { useLayoutEffect, useRef, useState } from 'react'
import { ORDERS_TABS } from '../constants'
import type { OrdersTab } from '../types/order'

interface TabsProps {
  active: OrdersTab
  onChange: (tab: OrdersTab) => void
}

const TAB_ALIGNMENT = ['justify-self-start', 'justify-self-center', 'justify-self-end'] as const
const INDICATOR_WIDTH = 24

export default function Tabs({ active, onChange }: TabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorX, setIndicatorX] = useState(0)

  const activeIndex = ORDERS_TABS.indexOf(active)

  useLayoutEffect(() => {
    const tab = tabRefs.current[activeIndex]
    const list = tabListRef.current
    if (!tab || !list) return

    setIndicatorX(tab.offsetLeft)
  }, [activeIndex])

  return (
    <div ref={tabListRef} className="relative grid grid-cols-3" role="tablist">
      {ORDERS_TABS.map((tab, index) => {
        const isActive = active === tab

        return (
          <button
            key={tab}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`relative pb-3 text-[15px] transition-colors duration-200 ${TAB_ALIGNMENT[index]} ${
              isActive ? 'font-semibold text-bego-yellow' : 'font-normal text-[#9ca3af]'
            }`}
          >
            {tab}
          </button>
        )
      })}

      <span
        className="tabs-indicator pointer-events-none absolute bottom-0 left-0 h-[2px] bg-bego-yellow"
        style={{
          width: INDICATOR_WIDTH,
          transform: `translateX(${indicatorX}px)`,
        }}
        aria-hidden="true"
      />
    </div>
  )
}
