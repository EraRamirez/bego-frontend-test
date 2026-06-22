import { useEffect, useState } from 'react'

interface UseCountdownResult {
  remaining: number
  isReady: boolean
}

export function useCountdown(targetTimestamp: number): UseCountdownResult {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, targetTimestamp - Date.now()),
  )
  const [navigateLogged, setNavigateLogged] = useState(false)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const timeLeft = Math.max(0, targetTimestamp - Date.now())
      setRemaining(timeLeft)

      if (timeLeft === 0 && !navigateLogged) {
        console.log('Navegar')
        setNavigateLogged(true)
      }
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetTimestamp, navigateLogged])

  return {
    remaining,
    isReady: remaining === 0,
  }
}
