import { API_BASE_URL } from '../constants'
import type { OrderDetail, UpcomingOrder } from '../types/order'

interface ApiResponse<T> {
  status: number
  result: T
}

async function fetchJson<T>(endpoint: string, path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const response = await fetch(url)

  if (!response.ok) {
    console.error(`[API] Error ${endpoint}:`, response.status, response.statusText)
    throw new Error(`Request failed: ${response.status}`)
  }

  const data: ApiResponse<T> = await response.json()
  return data.result
}

export function fetchUpcomingOrders(): Promise<UpcomingOrder[]> {
  return fetchJson<UpcomingOrder[]>('Pedidos próximos', '/orders/upcoming')
}

export function fetchOrderDetail(): Promise<OrderDetail> {
  return fetchJson<OrderDetail>('Detalle de pedido', '/orders')
}
