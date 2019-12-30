export const sortedInsert = arr => pred => el => {
  const idx = arr.findIndex(a => pred(a, el))
  if (idx === -1) return [...arr, el]
  return [...arr.slice(0, idx), el, ...arr.slice(idx)]
}

/**
 * if pred is true then el is better than a. Otherwise a is better.
 */
export const getBestElement = arr => pred =>
  arr.reduce((el, a) => (pred(el, a) ? el : a), arr[0])
