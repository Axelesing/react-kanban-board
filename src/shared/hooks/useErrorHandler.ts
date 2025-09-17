import { useCallback } from 'react'
import { logger } from '@/shared/lib'
import { $$notifications } from '@/shared/model'
import { toErrorType, isError } from '@/shared/types/errors'

interface UseErrorHandlerOptions {
  showNotifications?: boolean
  logErrors?: boolean
}

/**
 * Хук для унифицированной обработки ошибок
 */
export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { showNotifications = true, logErrors = true } = options

  const handleError = useCallback(
    (error: unknown, context: string, userMessage?: string) => {
      const errorObj = toErrorType(error)

      if (logErrors) {
        logger.error(
          `Error in ${context}`,
          isError(errorObj) ? errorObj : new Error(errorObj.message),
          { context },
        )
      }

      if (showNotifications && userMessage) {
        $$notifications.showError('Ошибка', userMessage)
      }
    },
    [showNotifications, logErrors],
  )

  const handleAsyncError = useCallback(
    async <T>(
      operation: () => Promise<T>,
      context: string,
      userMessage?: string,
    ): Promise<T | null> => {
      try {
        return await operation()
      } catch (error) {
        handleError(error, context, userMessage)
        return null
      }
    },
    [handleError],
  )

  const handleSyncError = useCallback(
    <T>(
      operation: () => T,
      context: string,
      userMessage?: string,
    ): T | null => {
      try {
        return operation()
      } catch (error) {
        handleError(error, context, userMessage)
        return null
      }
    },
    [handleError],
  )

  return {
    handleError,
    handleAsyncError,
    handleSyncError,
  }
}
