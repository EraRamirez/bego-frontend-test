import { ASSETS } from './assets'

export const ROUTE_ICONS = {
  pickup: { src: ASSETS.pickup, className: 'h-[15px] w-[22px]' },
  dropoff: { src: ASSETS.dropoff, className: 'h-[14px] w-[11px]' },
} as const

export const DETAIL_STOP_ICONS = {
  active: { src: ASSETS.orderPick, className: 'h-[32px] w-[32px]' },
  inactive: { src: ASSETS.hold, className: 'h-[32px] w-[32px]' },
} as const

export const TIMELINE_ICONS = {
  active: { src: ASSETS.orderCheck, className: 'h-2.5 w-auto' },
  inactive: { src: ASSETS.completed, className: 'h-7 w-7' },
} as const
