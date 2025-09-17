import { useCallback } from 'react'
import { logger } from '@/shared/lib'
import { $$notifications } from '@/shared/model'
import type { ErrorType } from '@/shared/types/errors'
import { toErrorType, isError } from '@/shared/types/errors'

/**
 * Хук для обработки ошибок в модальном окне задач
 */
export function useTaskModalErrors() {
  const handleError = useCallback((error: ErrorType, operation: string) => {
    const errorObj = toErrorType(error)
    logger.error(
      `Error ${operation}`,
      isError(errorObj) ? errorObj : new Error(errorObj.message),
      { operation },
    )
    $$notifications.showError(
      `Ошибка ${operation}`,
      `Не удалось ${operation} задачу`,
    )
  }, [])

  const showValidationError = useCallback(() => {
    $$notifications.showError(
      'Ошибка валидации',
      'Пожалуйста, исправьте ошибки в форме',
    )
  }, [])

  const showSuccessMessage = useCallback((action: string, message: string) => {
    $$notifications.showSuccess(action, message)
  }, [])

  return {
    handleError,
    showValidationError,
    showSuccessMessage,
  }
}
