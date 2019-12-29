export const getBrightness = color => {
  const hex = color.replace('#', '')
  const cr = parseInt(hex.substr(0, 2), 16)
  const cg = parseInt(hex.substr(2, 2), 16)
  const cb = parseInt(hex.substr(4, 2), 16)

  const brightness = (cr * 299 + cg * 587 + cb * 114) / 1000
  return brightness
}

export const isColorLight = color => getBrightness(color) > 155

export const changeBrightness = (color, amt) => {
  let usePound = false
  if (color[0] === '#') {
    color = color.slice(1)
    usePound = true
  }
  const num = parseInt(color, 16)
  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt
  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt
  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}
