import { useMemo } from 'react'

interface UseListComputationsOptions<T extends Record<string, unknown>> {
  items: T[]
  computeStats?: boolean
  computeTotals?: boolean
  groupBy?: keyof T
}

/**
 * Хук для мемоизированных вычислений над списками
 */
export function useListComputations<T extends Record<string, unknown>>({
  items,
  computeStats = true,
  computeTotals = false,
  groupBy,
}: UseListComputationsOptions<T>) {
  const stats = useMemo(() => {
    if (!computeStats) return null

    return {
      total: items.length,
      isEmpty: items.length === 0,
      isNotEmpty: items.length > 0,
    }
  }, [items.length, computeStats])

  const totals = useMemo(() => {
    if (!computeTotals || items.length === 0) return null

    const numericFields = Object.keys(items[0] || {}).filter(
      (key) => typeof (items[0] as Record<string, unknown>)?.[key] === 'number',
    ) as (keyof T)[]

    return numericFields.reduce(
      (totals, field) => {
        totals[field] = items.reduce((sum: number, item) => {
          const value = item[field] as number
          return sum + (isNaN(value) ? 0 : value)
        }, 0)
        return totals
      },
      {} as Record<keyof T, number>,
    )
  }, [items, computeTotals])

  const grouped = useMemo(() => {
    if (!groupBy) return null

    return items.reduce(
      (groups, item) => {
        const key = String(item[groupBy])
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(item)
        return groups
      },
      {} as Record<string, T[]>,
    )
  }, [items, groupBy])

  const flattened = useMemo(() => {
    return items.flatMap((item) => {
      const arrayFields = Object.keys(item as object).filter((key) =>
        Array.isArray((item as Record<string, unknown>)[key]),
      ) as (keyof T)[]

      if (arrayFields.length === 0) return [item]

      return arrayFields.flatMap((field) =>
        ((item[field] as unknown[]) || []).map((nestedItem) => ({
          ...item,
          [field]: nestedItem,
        })),
      )
    })
  }, [items])

  return {
    stats,
    totals,
    grouped,
    flattened,
  }
}
