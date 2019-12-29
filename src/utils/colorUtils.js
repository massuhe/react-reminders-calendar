import tinyColor from 'tinycolor2'

export const isColorLight = color => tinyColor(color).isLight()

export const changeBrightness = (color, amt) => {
  const c = tinyColor(color)
  return (amt >= 0 ? c.brighten(amt) : c.darken(amt * -1)).toString()
}
