export interface BenchmarkResult {
  name: string
  duration: number
  memory?: number
}

/**
 * Измеряет время выполнения функции
 */
export function benchmark<T>(
  name: string,
  fn: () => T,
  iterations = 1,
): BenchmarkResult {
  const start = performance.now()
  const startMemory = (
    performance as Performance & { memory?: { usedJSHeapSize: number } }
  ).memory?.usedJSHeapSize

  for (let i = 0; i < iterations; i++) {
    fn()
  }

  const end = performance.now()
  const endMemory = (
    performance as Performance & { memory?: { usedJSHeapSize: number } }
  ).memory?.usedJSHeapSize

  return {
    name,
    duration: end - start,
    memory: endMemory && startMemory ? endMemory - startMemory : undefined,
  }
}

/**
 * Измеряет время выполнения асинхронной функции
 */
export async function benchmarkAsync<T>(
  name: string,
  fn: () => Promise<T>,
  iterations = 1,
): Promise<BenchmarkResult> {
  const start = performance.now()
  const startMemory = (
    performance as Performance & { memory?: { usedJSHeapSize: number } }
  ).memory?.usedJSHeapSize

  for (let i = 0; i < iterations; i++) {
    await fn()
  }

  const end = performance.now()
  const endMemory = (
    performance as Performance & { memory?: { usedJSHeapSize: number } }
  ).memory?.usedJSHeapSize

  return {
    name,
    duration: end - start,
    memory: endMemory && startMemory ? endMemory - startMemory : undefined,
  }
}

/**
 * Запускает набор бенчмарков
 */
export function runBenchmarks(
  benchmarks: Array<() => BenchmarkResult>,
): BenchmarkResult[] {
  const results: BenchmarkResult[] = []

  for (const benchmark of benchmarks) {
    try {
      const result = benchmark()
      results.push(result)
      console.log(`✅ ${result.name}: ${result.duration.toFixed(2)}ms`)
    } catch (error) {
      console.error(`❌ Benchmark failed:`, error)
    }
  }

  return results
}

/**
 * Запускает набор асинхронных бенчмарков
 */
export async function runBenchmarksAsync(
  benchmarks: Array<() => Promise<BenchmarkResult>>,
): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = []

  for (const benchmark of benchmarks) {
    try {
      const result = await benchmark()
      results.push(result)
      console.log(`✅ ${result.name}: ${result.duration.toFixed(2)}ms`)
    } catch (error) {
      console.error(`❌ Benchmark failed:`, error)
    }
  }

  return results
}

/**
 * Создает отчет о производительности
 */
export function createPerformanceReport(results: BenchmarkResult[]): string {
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0)
  const avgDuration = totalDuration / results.length
  const slowest = results.reduce(
    (max, r) => (r.duration > max.duration ? r : max),
    results[0],
  )
  const fastest = results.reduce(
    (min, r) => (r.duration < min.duration ? r : min),
    results[0],
  )

  return `
📊 Performance Report
====================
Total tests: ${results.length}
Total duration: ${totalDuration.toFixed(2)}ms
Average duration: ${avgDuration.toFixed(2)}ms
Slowest: ${slowest.name} (${slowest.duration.toFixed(2)}ms)
Fastest: ${fastest.name} (${fastest.duration.toFixed(2)}ms)

Detailed results:
${results.map((r) => `  ${r.name}: ${r.duration.toFixed(2)}ms`).join('\n')}
  `
}
