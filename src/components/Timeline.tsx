import { TIMELINE_ICONS } from '../constants/route'
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
    <div className="detail-track-column relative w-full space-y-5 py-2">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const nextStep = steps[index + 1]

        const connectorClass = (() => {
          if (!nextStep) return ''
          if (step.active && nextStep.active) return 'timeline-connector--complete'
          if (step.active && !nextStep.active) return 'timeline-connector--progress'
          return 'timeline-connector--pending'
        })()

        return (
          <div key={`${step.status}-${index}`} className="relative flex items-center gap-3">
            {!isLast && (
              <span
                className={`timeline-connector absolute top-8 h-[calc(100%+4px)] ${connectorClass}`}
                aria-hidden="true"
              />
            )}

            <div className="route-stop-icon-slot route-stop-icon-slot--timeline flex shrink-0 items-center justify-center">
              {step.active ? (
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-bego-yellow"
                  aria-hidden="true"
                >
                  <img
                    src={TIMELINE_ICONS.active.src}
                    alt=""
                    className={TIMELINE_ICONS.active.className}
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <img
                  src={TIMELINE_ICONS.inactive.src}
                  alt=""
                  className={TIMELINE_ICONS.inactive.className}
                  aria-hidden="true"
                />
              )}
            </div>

            <Text
              variant="detail-address"
              className={`leading-snug ${step.active ? 'font-medium text-white' : 'text-bego-gray'}`}
            >
              {step.status}
            </Text>
          </div>
        )
      })}
    </div>
  )
}
