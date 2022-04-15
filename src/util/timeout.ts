export function delay<T>(millis, value: T) {
  return new Promise((resolve) => setTimeout(() => resolve(value), millis))
}
