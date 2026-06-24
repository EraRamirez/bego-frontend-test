import type { OrdersTab } from '../types/order'

interface EmptyOrdersStateProps {
  tab: OrdersTab
  search: string
  onClearSearch?: () => void
}

const TAB_COPY: Record<
  OrdersTab,
  { title: string; description: string }
> = {
  Próximos: {
    title: 'No hay pedidos próximos',
    description: 'Los nuevos pedidos de carga aparecerán aquí cuando estén listos para recoger.',
  },
  Completados: {
    title: 'No hay pedidos completados',
    description: 'Los pedidos que finalices se mostrarán en esta pestaña.',
  },
  Pasados: {
    title: 'No hay pedidos pasados',
    description: 'Tu historial de pedidos aparecerá aquí una vez que los viajes se completen.',
  },
}

export default function EmptyOrdersState({
  tab,
  search,
  onClearSearch,
}: EmptyOrdersStateProps) {
  const query = search.trim()
  const isSearchEmpty = query.length > 0

  const title = isSearchEmpty
    ? `Sin resultados para “${query}”`
    : TAB_COPY[tab].title

  const description = isSearchEmpty
    ? 'Prueba con otro número de pedido o limpia la búsqueda para ver todos los pedidos.'
    : TAB_COPY[tab].description

  return (
    <div
      className="empty-orders-state animate-empty-state flex flex-col items-center px-6 py-20 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="empty-orders-state-icon" aria-hidden="true">
        {isSearchEmpty ? (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="18" cy="18" r="10" stroke="#969798" strokeWidth="1.5" />
            <path
              d="M27 27L33 33"
              stroke="#969798"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14 18H22M18 14V22"
              stroke="#FFEE00"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect
              x="8"
              y="12"
              width="24"
              height="18"
              rx="3"
              stroke="#969798"
              strokeWidth="1.5"
            />
            <path
              d="M8 18H32"
              stroke="#969798"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M16 12V10C16 8.895 16.895 8 18 8H22C23.105 8 24 8.895 24 10V12"
              stroke="#969798"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="20" cy="24" r="2" fill="#FFEE00" />
          </svg>
        )}
      </div>

      <h2 className="mt-6 text-[15px] font-semibold text-bego-white">{title}</h2>
      <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-bego-gray">
        {description}
      </p>

      {isSearchEmpty && onClearSearch && (
        <button
          type="button"
          onClick={onClearSearch}
          className="empty-orders-state-action mt-6 text-[13px] font-semibold text-bego-yellow transition-opacity hover:opacity-80"
        >
          Limpiar búsqueda
        </button>
      )}
    </div>
  )
}
