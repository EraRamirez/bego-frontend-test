import { ASSETS } from '../constants/assets'
import { formatCountdown } from '../utils/date'

interface OrderCardActionsProps {
  isReady: boolean
  remaining: number
  onResume: () => void
}

export default function OrderCardActions({
  isReady,
  remaining,
  onResume,
}: OrderCardActionsProps) {
  return (
    <div className="order-card-actions">
      {isReady ? (
        <div className="order-card-action order-card-action--left order-card-action--yellow">
          Es hora de la recogida
        </div>
      ) : (
        <p className="order-card-countdown">
          <span>Inicia recogida en</span>
          <span className="order-card-countdown-time">{formatCountdown(remaining)}</span>
        </p>
      )}

      <button
        type="button"
        disabled={!isReady}
        aria-disabled={!isReady}
        onClick={() => {
          if (!isReady) return
          onResume()
        }}
        className={`order-card-action order-card-action--right ${
          isReady ? 'order-card-action--yellow' : 'order-card-action--disabled'
        }`}
      >
        <span className="flex items-center gap-3">
          Continuar
          <img
            src={ASSETS.resume}
            alt=""
            className={`h-[15px] w-auto ${isReady ? '' : 'opacity-45'}`}
            aria-hidden="true"
          />
        </span>
      </button>
    </div>
  )
}
