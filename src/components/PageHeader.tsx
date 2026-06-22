import notiIcon from '../assets/noti.svg'

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
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-2xl text-white"
          aria-label="Volver"
        >
          ‹
        </button>
      ) : (
        <button type="button" className="text-2xl text-white" aria-label="Volver">
          ‹
        </button>
      )}

      <h1 className="text-[17px] font-bold tracking-tight">{title}</h1>

      <button type="button" aria-label="Notificaciones">
        <img src={notiIcon} alt="" className="h-6 w-6" />
      </button>
    </header>
  )
}
