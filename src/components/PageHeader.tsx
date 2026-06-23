import { useState } from 'react'
import { ASSETS } from '../constants/assets'

interface PageHeaderProps {
  title: string
  onBack?: () => void
  showBack?: boolean
}

export default function PageHeader({
  title,
  onBack,
  showBack = false,
}: PageHeaderProps) {
  const [ringing, setRinging] = useState(false)

  const handleNotificationClick = () => {
    setRinging(true)
  }

  return (
    <header className="page-gutter grid h-14 grid-cols-[2.5rem_1fr_2.5rem] items-center">
      <button
        type="button"
        onClick={showBack ? onBack : undefined}
        className="flex items-center justify-start"
        aria-label="Volver"
      >
        <img src={ASSETS.back} alt="" className="h-[18px] w-[10px]" aria-hidden="true" />
      </button>

      <h1 className="text-center text-[17px] font-bold tracking-tight text-white">{title}</h1>

      <button
        type="button"
        onClick={handleNotificationClick}
        className="flex items-center justify-end"
        aria-label="Notificaciones"
      >
        <img
          src={ASSETS.noti}
          alt=""
          className={`h-6 w-6 ${ringing ? 'animate-bell-ring' : ''}`}
          onAnimationEnd={() => setRinging(false)}
        />
      </button>
    </header>
  )
}
