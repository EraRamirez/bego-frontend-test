import type { ReactNode } from 'react'

interface CardShellProps {
  variant?: 'order' | 'plain'
  className?: string
  children: ReactNode
}

export default function CardShell({
  variant = 'plain',
  className = '',
  children,
}: CardShellProps) {
  if (variant === 'order') {
    return (
      <div className="order-card-border w-full max-w-full min-w-0">
        <article
          className={`order-card-surface min-w-0 px-3.5 pb-0 pt-3.5 ${className}`}
        >
          {children}
        </article>
      </div>
    )
  }

  return (
    <div
      className={`min-w-0 rounded-[20px] border border-[#2a2a2a] bg-[#141414] ${className}`}
    >
      {children}
    </div>
  )
}
