/* eslint @typescript-eslint/no-explicit-any: off */
import React from 'react'

// delay in ms
export type TUseDebounce = (callback: (...args: any[]) => void, delay: number) => any
export const useDebounce: TUseDebounce = (callback, delay) => {
  const callbackRef = React.useRef(callback)

  React.useLayoutEffect(() => {
    callbackRef.current = callback
  })

  let timer: NodeJS.Timeout

  const naiveDebounce = (func: (...args: any[]) => void, delayMs: number, ...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delayMs)
  }

  return React.useMemo(
    () =>
      (...args: any) =>
        naiveDebounce(callbackRef.current, delay, ...args),
    [delay]
  )
}
