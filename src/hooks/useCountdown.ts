import { useEffect, useRef, useState } from 'react'

interface UseCountdownResult {
  remaining: number
  isReady: boolean
}

export function useCountdown(targetTimestamp: number): UseCountdownResult {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, targetTimestamp - Date.now()),
  )
  const navigateLoggedRef = useRef(false)

  useEffect(() => {
    const tick = () => {
      const timeLeft = Math.max(0, targetTimestamp - Date.now())
      setRemaining(timeLeft)

      if (timeLeft === 0 && !navigateLoggedRef.current) {
        console.log('Navegar')
        navigateLoggedRef.current = true
      }
    }

    tick()
    const intervalId = window.setInterval(tick, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetTimestamp])

  return {
    remaining,
    isReady: remaining === 0,
  }
}
