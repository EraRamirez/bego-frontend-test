export interface ContactInfo {
  name?: string
  telephone?: string
  email?: string
}

export interface Destination {
  address: string
  start_date?: number
  startDate?: number
  end_date?: number
  endDate?: number
  nickname?: string
  show_navigation?: boolean
  status_string?: string
  status_class?: string
  contact_info?: ContactInfo
}

export interface StatusStep {
  active: boolean
  status: string
}

export interface UpcomingOrder {
  _id: string
  order_number: string
  status: number
  type: string
  start_date: number
  end_date: number
  status_string: string
  status_class: string
  driver_thumbnail: string | null
  destinations: Destination[]
}

export interface OrderDetail extends UpcomingOrder {
  reference_number?: string
  status_list?: {
    pickup: StatusStep[]
    dropoff: StatusStep[]
  }
  driver?: { nickname?: string; thumbnail?: string }
  manager?: { nickname?: string; thumbnail?: string }
}

export type DestinationTab = 'pickup' | 'dropoff'

export type OrdersTab = 'Próximos' | 'Completados' | 'Pasados'
