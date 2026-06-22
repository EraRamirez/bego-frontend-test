import { useState, type ReactNode } from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function Accordion({
  title,
  children,
  defaultOpen = true,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#2a2a2a] bg-[#141414]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-4 text-[15px] font-bold text-white"
      >
        {title}
        <span
          className={`text-bego-yellow transition-transform ${open ? '' : 'rotate-180'}`}
          aria-hidden="true"
        >
          ▲
        </span>
      </button>

      {open && (
        <div className="space-y-2 border-t border-[#2a2a2a] px-4 py-4 text-[13px] leading-relaxed text-[#d1d5db]">
          {children}
        </div>
      )}
    </div>
  )
}
