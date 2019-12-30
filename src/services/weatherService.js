import request from '../utils/requester'
import { getBestElement } from '../utils/arrayUtils'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import COLORS from '../utils/colors'

export const WEATHER_SERVICE_CODES = {
  DATE_NOT_VALID: 0,
  WEATHER_NOT_AVAILABLE: 1,
  SUCCESS: 2
}

const makeResponse = (code, message, color, icon) => ({
  code,
  message,
  icon,
  color
})

const isValidDate = date => !Number.isNaN(new Date(date).getTime())

const isACloserThanB = date => (a, b) =>
  differenceInMilliseconds(a.dt * 1000, date) <
  differenceInMilliseconds(b.dt * 1000, date)

const getIconUrl = iconName =>
  `http://openweathermap.org/img/wn/${iconName}.png`

export const getWeather = (city, date) => {
  if (!isValidDate(date)) {
    return Promise.reject(
      makeResponse(
        WEATHER_SERVICE_CODES.DATE_NOT_VALID,
        'Date is not valid',
        COLORS.lightRed
      )
    )
  }
  return request('forecast', {
    params: {
      q: city
    }
  })
    .then(r => r.json())
    .then(response => {
      if (response.cod !== '200') {
        return makeResponse(response.cod, response.message, COLORS.lightRed)
      }
      const { weather: weatherList } = getBestElement(response.list)(
        isACloserThanB(date)
      )
      const { description, icon } = weatherList[0]
      return makeResponse(
        WEATHER_SERVICE_CODES.SUCCESS,
        description,
        COLORS.lightYellow,
        getIconUrl(icon)
      )
    })
}

export default {
  getWeather
}
