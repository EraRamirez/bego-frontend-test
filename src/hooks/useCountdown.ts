import { useEffect, useState } from 'react'

interface UseCountdownResult {
  remaining: number
  isReady: boolean
}

const navegarLoggedKeys = new Set<string>()

function getRemainingMs(targetTimestamp: number): number {
  return Math.max(0, targetTimestamp - Date.now())
}

function logNavegarOnce(
  targetTimestamp: number,
  orderNumber?: string | number,
): void {
  const key = `${String(orderNumber ?? 'order')}-${targetTimestamp}`
  if (navegarLoggedKeys.has(key)) return

  navegarLoggedKeys.add(key)
  const orderLabel =
    orderNumber !== undefined && orderNumber !== ''
      ? `Navegar - Pedido #${orderNumber}`
      : 'Navegar'
  console.log(orderLabel)
}

export function useCountdown(
  targetTimestamp: number,
  orderNumber?: string | number,
): UseCountdownResult {
  const [remaining, setRemaining] = useState(() => getRemainingMs(targetTimestamp))

  useEffect(() => {
    const tick = () => {
      const timeLeft = getRemainingMs(targetTimestamp)
      setRemaining(timeLeft)

      if (timeLeft === 0) {
        logNavegarOnce(targetTimestamp, orderNumber)
      }
    }

    tick()
    const intervalId = window.setInterval(tick, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetTimestamp, orderNumber])

  const isReady = remaining === 0

  return {
    remaining,
    isReady,
  }
}
