import type { OrdersTab, OrderDetail, UpcomingOrder } from '../types/order'

export function filterOrders(
  orders: UpcomingOrder[],
  tab: OrdersTab,
  search: string,
): UpcomingOrder[] {
  let filtered = orders

  if (tab === 'Completed') {
    filtered = filtered.filter((order) => order.status >= 3)
  }

  if (tab === 'Past') {
    filtered = filtered.filter((order) => order.status >= 5)
  }

  const query = search.trim().toLowerCase()

  if (query) {
    filtered = filtered.filter((order) =>
      order.order_number.toLowerCase().includes(query),
    )
  }

  return filtered
}

export function isBlueStatus(statusClass?: string): boolean {
  return statusClass?.includes('blue') ?? false
}

export function mergeOrderDetail(
  detail: OrderDetail,
  listOrder: UpcomingOrder | undefined,
  orderNumber?: string,
): OrderDetail {
  return {
    ...detail,
    ...listOrder,
    order_number: listOrder?.order_number ?? detail.order_number ?? orderNumber ?? '',
    status: listOrder?.status ?? detail.status,
    destinations: listOrder?.destinations ?? detail.destinations,
    status_list: detail.status_list,
    reference_number: detail.reference_number,
    driver: detail.driver,
    driver_thumbnail: listOrder?.driver_thumbnail ?? detail.driver_thumbnail,
  }
}
