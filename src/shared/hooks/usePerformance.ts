import { useCallback, useMemo, useRef, useEffect } from 'react'

/**
 * Хук для оптимизации производительности компонентов
 */
export function usePerformance() {
  const renderCount = useRef(0)
  const lastRenderTime = useRef(Date.now())

  useEffect(() => {
    renderCount.current += 1
    const now = Date.now()
    const timeSinceLastRender = now - lastRenderTime.current
    lastRenderTime.current = now

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Render #${renderCount.current}, time since last: ${timeSinceLastRender}ms`,
      )
    }
  })

  return {
    renderCount: renderCount.current,
  }
}

/**
 * Хук для создания стабильных ссылок на функции (альтернативная реализация)
 */
export function useStableCallbackAlt<T extends (...args: never[]) => unknown>(
  callback: T,
  deps: React.DependencyList,
): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, deps)

  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args)
  }, []) as T
}

/**
 * Хук для создания стабильных объектов (альтернативная реализация)
 */
export function useStableObjectAlt<T extends Record<string, unknown>>(
  obj: T,
  deps: React.DependencyList,
): T {
  return useMemo(() => obj, deps)
}

/**
 * Хук для создания стабильных массивов (альтернативная реализация)
 */
export function useStableArrayAlt<T>(
  arr: T[],
  deps: React.DependencyList,
): T[] {
  return useMemo(() => arr, deps)
}

/**
 * Хук для отложенного выполнения
 */
export function useDeferredExecution<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay],
  ) as T
}
