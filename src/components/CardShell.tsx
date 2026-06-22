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
      <div className="order-card-border w-full">
        <article className={`order-card-surface px-3.5 pb-0 pt-3.5 ${className}`}>
          {children}
        </article>
      </div>
    )
  }

  return (
    <div className={`rounded-[20px] border border-[#2a2a2a] bg-[#141414] ${className}`}>
      {children}
    </div>
  )
}
