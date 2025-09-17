import { useState, useCallback, useMemo } from 'react'

interface UseModalStateOptions {
  initialOpen?: boolean
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
}

/**
 * Хук для управления состоянием модальных окон
 */
export function useModalState(options: UseModalStateOptions = {}) {
  const { initialOpen = false } = options

  const [isOpen, setIsOpen] = useState(initialOpen)
  const [data, setData] = useState<object | null>(null)

  const open = useCallback((modalData?: object) => {
    setData(modalData || null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setData(null)
  }, [])

  const toggle = useCallback(
    (modalData?: object) => {
      if (isOpen) {
        close()
      } else {
        open(modalData)
      }
    },
    [isOpen, open, close],
  )

  const state = useMemo(
    () => ({
      isOpen,
      data,
      isClosed: !isOpen,
    }),
    [isOpen, data],
  )

  return {
    ...state,
    open,
    close,
    toggle,
  }
}
