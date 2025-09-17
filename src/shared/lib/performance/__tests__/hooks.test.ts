import { renderHook, act } from '@/shared/lib/test/render'
import {
  useDebounce,
  useThrottle,
  useHeavyComputation,
  useOptimizedList,
} from '../hooks'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('должен задерживать выполнение функции', () => {
    const mockFn = jest.fn()
    const { result } = renderHook(() => useDebounce(mockFn, 100))

    act(() => {
      result.current('test1')
      result.current('test2')
      result.current('test3')
    })

    expect(mockFn).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test3')
  })

  it('должен очищать таймер при размонтировании', () => {
    const mockFn = jest.fn()
    const { result, unmount } = renderHook(() => useDebounce(mockFn, 100))

    act(() => {
      result.current('test')
    })

    unmount()

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(mockFn).not.toHaveBeenCalled()
  })
})

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('должен ограничивать частоту вызовов функции', () => {
    const mockFn = jest.fn()
    const { result } = renderHook(() => useThrottle(mockFn, 100))

    act(() => {
      result.current('test1')
      result.current('test2')
      result.current('test3')
    })

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test1')

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(mockFn).toHaveBeenCalledWith('test3')
  })
})

describe('useHeavyComputation', () => {
  it('должен мемоизировать результат вычислений', () => {
    const mockCompute = jest.fn(() => 'result')
    const { result, rerender } = renderHook(
      ({ deps }) => useHeavyComputation(mockCompute, deps),
      { initialProps: { deps: [1, 2, 3] } },
    )

    expect(result.current).toBe('result')
    expect(mockCompute).toHaveBeenCalledTimes(1)

    rerender({ deps: [1, 2, 3] })
    expect(mockCompute).toHaveBeenCalledTimes(1)

    rerender({ deps: [1, 2, 4] })
    expect(mockCompute).toHaveBeenCalledTimes(2)
  })
})

describe('useOptimizedList', () => {
  const items = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ]

  it('должен возвращать оптимизированный список', () => {
    const { result } = renderHook(() =>
      useOptimizedList(items, (item) => item.id),
    )

    expect(result.current).toHaveLength(3)
    expect(result.current[0]).toEqual({
      item: items[0],
      key: 1,
      index: 0,
    })
  })

  it('должен применять фильтрацию', () => {
    const { result } = renderHook(() =>
      useOptimizedList(items, (item) => item.id, {
        filterFn: (item) => item.age > 25,
      }),
    )

    expect(result.current).toHaveLength(2)
    expect(result.current.map(({ item }) => item.name)).toEqual([
      'Bob',
      'Charlie',
    ])
  })

  it('должен применять сортировку', () => {
    const { result } = renderHook(() =>
      useOptimizedList(items, (item) => item.id, {
        sortFn: (a, b) => b.age - a.age,
      }),
    )

    expect(result.current[0].item.name).toBe('Charlie')
    expect(result.current[1].item.name).toBe('Bob')
    expect(result.current[2].item.name).toBe('Alice')
  })

  it('должен ограничивать количество элементов', () => {
    const { result } = renderHook(() =>
      useOptimizedList(items, (item) => item.id, {
        maxItems: 2,
      }),
    )

    expect(result.current).toHaveLength(2)
  })
})
