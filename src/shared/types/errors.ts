/**
 * Типы для обработки ошибок в приложении
 */

export interface AppError {
  message: string
  code?: string
  context?: Record<string, string | number | boolean>
}

export interface ValidationError extends AppError {
  field?: string
  value?: string | number | boolean
}

export interface NetworkError extends AppError {
  status?: number
  url?: string
}

export interface StorageError extends AppError {
  operation: 'read' | 'write' | 'delete'
  key?: string
}

export type ErrorType = AppError | ValidationError | NetworkError | StorageError

/**
 * Проверяет, является ли значение объектом Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

/**
 * Проверяет, является ли значение объектом AppError
 */
export function isAppError(value: unknown): value is AppError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    !isError(value)
  )
}

/**
 * Преобразует unknown в ErrorType
 */
export function toErrorType(error: unknown): ErrorType {
  if (isError(error)) {
    return error
  }

  if (typeof error === 'string') {
    return { message: error }
  }

  if (isAppError(error)) {
    return error
  }

  return { message: 'Неизвестная ошибка' }
}
