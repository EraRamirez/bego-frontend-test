import { ASSETS } from '../constants/assets'
import type { StatusStep } from '../types/order'
import Text from './ui/Text'

interface TimelineProps {
  steps: StatusStep[]
}

export default function Timeline({ steps }: TimelineProps) {
  if (steps.length === 0) {
    return null
  }

  return (
    <div className="relative mx-auto w-full max-w-[280px] space-y-5 py-2">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        return (
          <div key={`${step.status}-${index}`} className="relative flex items-center gap-4">
            {!isLast && (
              <span
                className="absolute left-[13px] top-7 h-[calc(100%+4px)] w-px bg-[#333]"
                aria-hidden="true"
              />
            )}

            <div
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                step.active ? 'bg-bego-yellow' : 'border-2 border-[#444] bg-transparent'
              }`}
              aria-hidden="true"
            >
              {step.active && (
                <img src={ASSETS.orderCheck} alt="" className="h-2.5 w-auto" aria-hidden="true" />
              )}
            </div>

            <Text
              variant="detail-address"
              className={`leading-snug ${step.active ? 'font-medium text-white' : 'text-[#6b7280]'}`}
            >
              {step.status}
            </Text>
          </div>
        )
      })}
    </div>
  )
}
