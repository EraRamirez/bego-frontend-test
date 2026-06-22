import { useEffect, useMemo, useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import OrderCard from '../components/OrderCard'
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

      <Tabs active={tab} onChange={setTab} />
      <SearchBar value={search} onChange={setSearch} />

      <div className="mt-4 space-y-4 px-4">
        {loading && <LoadingScreen variant="inline" />}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && filteredOrders.length === 0 && (
          <p className="text-center text-[#9ca3af]">No orders found</p>
        )}

        {filteredOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  )
}
