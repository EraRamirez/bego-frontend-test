import type { Destination, OrdersTab, OrderDetail, UpcomingOrder } from '../types/order'

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

export function isDestinationActiveState(
  destination?: { status_string?: string; status_class?: string },
  fallbackStatus?: string,
): boolean {
  const statusLabel = destination?.status_string ?? fallbackStatus ?? ''
  return (
    isBlueStatus(destination?.status_class) ||
    statusLabel.toLowerCase() === 'accepted'
  )
}

function mergeDestinations(
  listDestinations: Destination[],
  detailDestinations: Destination[] = [],
): Destination[] {
  const count = Math.max(listDestinations.length, detailDestinations.length)

  return Array.from({ length: count }, (_, index) => {
    const fromList = listDestinations[index]
    const fromDetail = detailDestinations[index]

    return {
      ...fromDetail,
      ...fromList,
      address: fromList?.address ?? fromDetail?.address ?? '',
      start_date: fromList?.start_date ?? fromDetail?.start_date,
      startDate: fromList?.startDate ?? fromDetail?.startDate,
      end_date: fromList?.end_date ?? fromDetail?.end_date,
      endDate: fromList?.endDate ?? fromDetail?.endDate,
      nickname: fromList?.nickname ?? fromDetail?.nickname,
      show_navigation: fromList?.show_navigation ?? fromDetail?.show_navigation,
      status_string: fromList?.status_string ?? fromDetail?.status_string,
      status_class: fromList?.status_class ?? fromDetail?.status_class,
      contact_info: fromList?.contact_info ?? fromDetail?.contact_info,
    }
  })
}

export function mergeOrderDetail(
  detail: OrderDetail,
  listOrder: UpcomingOrder | undefined,
  orderNumber?: string,
): OrderDetail {
  const destinations = listOrder?.destinations
    ? mergeDestinations(listOrder.destinations, detail.destinations)
    : detail.destinations

  const merged: OrderDetail = {
    ...detail,
    ...listOrder,
    order_number: listOrder?.order_number ?? detail.order_number ?? orderNumber ?? '',
    status: listOrder?.status ?? detail.status,
    destinations,
    status_list: detail.status_list,
    reference_number: detail.reference_number,
    driver: detail.driver,
    driver_thumbnail: listOrder?.driver_thumbnail ?? detail.driver_thumbnail,
  }

  return merged
}
