import { ORDERS_TABS } from '../constants'
import type { OrdersTab } from '../types/order'

interface TabsProps {
  active: OrdersTab
  onChange: (tab: OrdersTab) => void
}

export default function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-8 border-b border-[#2a2a2a] px-4" role="tablist">
      {ORDERS_TABS.map((tab) => {
        const isActive = active === tab

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`relative pb-3 text-[15px] ${
              isActive ? 'font-semibold text-white' : 'font-normal text-[#9ca3af]'
            }`}
          >
            {tab}
            {isActive && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-bego-yellow" />
            )}
          </button>
        )
      })}
    </div>
  )
}
