const match = (preds, fallback) => x => {
  let match = false
  const r = preds.reduce((result, [pred, then]) => {
    if (!pred(x)) return result
    match = true
    return then
  }, '')
  return match ? r : fallback
}

export default match
