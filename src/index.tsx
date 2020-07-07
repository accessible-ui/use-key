import * as React from 'react'
import useEvent from '@react-hook/event'

export function useKey<T extends Window>(
  target: T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export function useKey<T extends Document>(
  target: T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export function useKey<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export function useKey(
  target: any,
  listeners: Record<string, (event: KeyboardEvent) => any>
) {
  useEvent(target, 'keydown', (event): void => {
    const listener = listeners[IE_COMPAT[event.key] || event.key]
    if (listener) listener(event)
  })
}

// IE 11 and some versions of Edge have non-standard value
const arrow = 'Arrow'
const IE_COMPAT: Record<string, string> = {
  Up: arrow + 'Up',
  Right: arrow + 'Right',
  Down: arrow + 'Down',
  Left: arrow + 'Left',
  Esc: 'Escape',
}

export default useKey
