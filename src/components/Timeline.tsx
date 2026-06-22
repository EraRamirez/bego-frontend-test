import type { StatusStep } from '../types/order'

interface TimelineProps {
  steps: StatusStep[]
}

export default function Timeline({ steps }: TimelineProps) {
  if (steps.length === 0) {
    return null
  }

  return (
    <div className="w-full space-y-4">
      {steps.map((step, index) => (
        <div key={`${step.status}-${index}`} className="flex items-center gap-4">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              step.active
                ? 'bg-bego-yellow text-black'
                : 'border-2 border-[#444] bg-transparent'
            }`}
            aria-hidden="true"
          >
            {step.active ? '✓' : ''}
          </div>
          <p
            className={`text-[14px] ${
              step.active ? 'font-medium text-white' : 'text-[#6b7280]'
            }`}
          >
            {step.status}
          </p>
        </div>
      ))}
    </div>
  )
}
