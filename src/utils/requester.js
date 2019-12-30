const API_URL = 'http://api.openweathermap.org/data/2.5'
const API_KEY = '07c018f01072644b8e0e213da2b5eb87'

const buildParams = params =>
  Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')

const request = (endpoint, options) =>
  window.fetch(
    `${API_URL}/${endpoint}?appid=${API_KEY}&${buildParams(options.params)}`
  )

export default request
