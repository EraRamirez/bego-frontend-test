import {
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TransitionEvent,
} from 'react'

interface ExpandableTextProps {
  text: string
  className?: string
  stopPropagation?: boolean
  maxChars?: number
}

export default function ExpandableText({
  text,
  className = '',
  stopPropagation = false,
  maxChars,
}: ExpandableTextProps) {
  const contentRef = useRef<HTMLParagraphElement>(null)
  const collapsedMeasureRef = useRef<HTMLParagraphElement>(null)
  const expandedMeasureRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)

  const isCharTruncated = maxChars !== undefined && text.length > maxChars
  const truncatedText = isCharTruncated
    ? `${text.slice(0, maxChars).trimEnd()}…`
    : text
  const showFullText = expanded || isClosing
  const visibleText = showFullText ? text : truncatedText

  const getCollapsedHeight = () => collapsedMeasureRef.current?.scrollHeight ?? 0
  const getExpandedHeight = () => expandedMeasureRef.current?.scrollHeight ?? 0

  useLayoutEffect(() => {
    if (!expanded && !isClosing) {
      setMaxHeight(getCollapsedHeight())
    }
  }, [text, maxChars, className, expanded, isClosing])

  useLayoutEffect(() => {
    if (maxChars !== undefined) return

    const element = contentRef.current
    if (!element || expanded) return

    const checkTruncation = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth)
    }

    checkTruncation()
    window.addEventListener('resize', checkTruncation)

    return () => window.removeEventListener('resize', checkTruncation)
  }, [text, expanded, maxChars])

  const isOverflowing = maxChars !== undefined ? isCharTruncated : isTruncated
  const isInteractive = isOverflowing || expanded

  const toggleExpanded = () => {
    if (!isInteractive) return

    if (expanded) {
      requestAnimationFrame(() => {
        setMaxHeight(getCollapsedHeight())
        setIsClosing(true)
        setExpanded(false)
      })
      return
    }

    setIsClosing(false)
    setExpanded(true)
    requestAnimationFrame(() => {
      setMaxHeight(getExpandedHeight())
    })
  }

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'max-height') return
    if (isClosing) setIsClosing(false)
  }

  const handleClick = (event: MouseEvent<HTMLParagraphElement>) => {
    if (stopPropagation) event.stopPropagation()
    toggleExpanded()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLParagraphElement>) => {
    if (!isInteractive) return
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    if (stopPropagation) event.stopPropagation()
    toggleExpanded()
  }

  const measureClassName = `${className} pointer-events-none invisible absolute left-0 top-0 w-full`

  return (
    <div className="relative">
      <p ref={collapsedMeasureRef} className={measureClassName} aria-hidden="true">
        {truncatedText}
      </p>
      <p ref={expandedMeasureRef} className={measureClassName} aria-hidden="true">
        {text}
      </p>

      <div
        className="expandable-text overflow-hidden"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
        onTransitionEnd={handleTransitionEnd}
      >
        <p
          ref={contentRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          aria-expanded={isInteractive ? expanded : undefined}
          className={`expandable-text-content ${className} ${
            showFullText ? 'whitespace-normal break-words' : maxChars ? '' : 'truncate'
          } ${isInteractive ? 'cursor-pointer' : ''}`}
        >
          {visibleText}
        </p>
      </div>
    </div>
  )
}
