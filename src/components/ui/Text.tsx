import { createElement, type HTMLAttributes } from 'react'

export type TextVariant =
  | 'order-label'
  | 'order-number'
  | 'stop-label'
  | 'stop-city'
  | 'stop-address'
  | 'stop-date'
  | 'stop-time'
  | 'card-type'
  | 'card-status'
  | 'detail-reference'
  | 'detail-title'
  | 'detail-city'
  | 'detail-address'
  | 'detail-status'

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3'

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant: TextVariant
  as?: TextElement
}

export default function Text({
  variant,
  as = 'p',
  className = '',
  ...props
}: TextProps) {
  return createElement(as, {
    ...props,
    className: `text-${variant}${className ? ` ${className}` : ''}`,
  })
}
