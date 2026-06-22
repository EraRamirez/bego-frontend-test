import { API_BASE_URL } from '../constants'
import type { OrderDetail, UpcomingOrder } from '../types/order'

interface ApiResponse<T> {
  status: number
  result: T
}

function logApiResponse<T>(endpoint: string, url: string, data: ApiResponse<T>): void {
  const { status, result } = data

  console.group(`[API] ${endpoint}`)
  console.log('URL:', url)
  console.log('HTTP status (body):', status)
  console.log('Tipo de result:', Array.isArray(result) ? 'array' : typeof result)

  if (Array.isArray(result)) {
    console.log('Cantidad de órdenes:', result.length)
    console.log('Primera orden (muestra):', result[0] ?? null)
  } else {
    console.log('Keys del result:', Object.keys(result ?? {}))
  }

  console.log('Respuesta completa:', data)
  console.groupEnd()
}

async function fetchJson<T>(endpoint: string, path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  console.log(`[API] GET ${endpoint} → ${url}`)

  const response = await fetch(url)

  if (!response.ok) {
    console.error(`[API] Error ${endpoint}:`, response.status, response.statusText)
    throw new Error(`Request failed: ${response.status}`)
  }

  const data: ApiResponse<T> = await response.json()
  logApiResponse(endpoint, url, data)

  return data.result
}

export function fetchUpcomingOrders(): Promise<UpcomingOrder[]> {
  return fetchJson<UpcomingOrder[]>('Pedidos próximos', '/orders/upcoming')
}

export function fetchOrderDetail(): Promise<OrderDetail> {
  return fetchJson<OrderDetail>('Detalle de pedido', '/orders')
}
