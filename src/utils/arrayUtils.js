export const sortedInsert = arr => pred => el => {
  const idx = arr.findIndex(a => pred(a, el))
  if (idx === -1) return [...arr, el]
  return [...arr.slice(0, idx), el, ...arr.slice(idx)]
}
