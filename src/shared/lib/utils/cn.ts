import { clsx, type ClassValue } from 'clsx'

/**
 * Утилита для объединения классов с поддержкой условных классов
 * Использует clsx для обработки массивов, объектов и условной логики
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

