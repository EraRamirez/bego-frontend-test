import { useEffect, useMemo, useState } from 'react'
import EmptyOrdersState from '../components/EmptyOrdersState'
import LoadingScreen from '../components/LoadingScreen'
import OrderCard from '../components/OrderCard'
import OrderHeading from '../components/OrderHeading'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import { fetchUpcomingOrders } from '../services/orders.service'
import type { OrdersTab, UpcomingOrder } from '../types/order'
import { filterOrders } from '../utils/order'

export default function OrdersPage() {
  const [orders, setOrders] = useState<UpcomingOrder[]>([])
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<OrdersTab>('Upcoming')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUpcomingOrders()
      .then(setOrders)
      .catch(() => setError('No se pudieron cargar las órdenes'))
      .finally(() => setLoading(false))
  }, [])

  const filteredOrders = useMemo(
    () => filterOrders(orders, tab, search),
    [orders, tab, search],
  )

  return (
    <div className="pb-8">
      <PageHeader title="Cargo Orders" />

      <div className="px-4">
        <Tabs active={tab} onChange={setTab} />
        <SearchBar value={search} onChange={setSearch} />

        <div className="mt-5 space-y-5">
          {loading && (
            <LoadingScreen
              variant="inline"
              message="Loading orders"
              description="Fetching your cargo trips..."
            />
          )}
          {error && <p className="text-red-400">{error}</p>}

          {!loading && !error && filteredOrders.length === 0 && (
            <EmptyOrdersState
              key={`${tab}-${search.trim()}`}
              tab={tab}
              search={search}
              onClearSearch={() => setSearch('')}
            />
          )}

          {filteredOrders.map((order) => (
            <div key={order._id} className="space-y-2">
              <OrderHeading orderNumber={order.order_number} />
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
