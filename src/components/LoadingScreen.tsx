interface LoadingScreenProps {
  message?: string
  description?: string
  variant?: 'page' | 'inline'
}

export default function LoadingScreen({
  message = 'Loading...',
  description,
  variant = 'page',
}: LoadingScreenProps) {
  const containerClass =
    variant === 'page'
      ? 'loading-screen loading-screen--page'
      : 'loading-screen loading-screen--inline'

  return (
    <div
      className={containerClass}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-screen-icon" aria-hidden="true">
        <span className="loading-screen-ring" />
        <span className="loading-screen-core" />
      </div>

      <p className="loading-screen-title">{message}</p>
      {description && <p className="loading-screen-description">{description}</p>}
    </div>
  )
}
