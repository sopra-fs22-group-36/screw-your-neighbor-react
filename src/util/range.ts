export function range(start, stop) {
  return Array(stop - start)
    .fill(start)
    .map((value, index) => value + index)
}
