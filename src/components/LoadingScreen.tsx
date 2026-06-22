interface LoadingScreenProps {
  message?: string
  variant?: 'page' | 'inline'
}

export default function LoadingScreen({
  message = 'Loading...',
  variant = 'page',
}: LoadingScreenProps) {
  const containerClass =
    variant === 'page'
      ? 'flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4'
      : 'flex flex-col items-center justify-center py-16'

  return (
    <div
      className={containerClass}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute h-12 w-12 animate-spin rounded-full border-2 border-[#2a2a2a] border-t-bego-yellow" />
        <span className="h-2 w-2 rounded-full bg-bego-yellow" />
      </div>

      <p className="mt-5 text-[14px] font-semibold tracking-wide text-[#9ca3af]">
        {message}
      </p>
    </div>
  )
}
