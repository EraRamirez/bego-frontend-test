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
  return (
    <header className="flex h-14 items-center justify-between px-4">
      <button
        type="button"
        onClick={showBack ? onBack : undefined}
        className="flex h-10 w-10 items-center justify-start"
        aria-label="Volver"
      >
        <img src={ASSETS.back} alt="" className="h-[18px] w-[10px]" aria-hidden="true" />
      </button>

      <h1 className="text-[17px] font-bold tracking-tight">{title}</h1>

      <button type="button" aria-label="Notificaciones">
        <img src={ASSETS.noti} alt="" className="h-6 w-6" />
      </button>
    </header>
  )
}
