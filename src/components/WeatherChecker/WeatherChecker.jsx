/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react'
import PropTypes from 'prop-types'
import addDays from 'date-fns/addDays'
import COLORS from '../../utils/colors'
import useDebouncedEffect from '../../hooks/useDebouncedEffect'
import weatherService, {
  WEATHER_SERVICE_CODES
} from '../../services/weatherService'
import { setTime, resetTime } from '../../utils/timeUtils'
import { changeBrightness } from '../../utils/colorUtils'
import Icon from '../shared/Icon'
import useFirstRender from '../../hooks/useFirstRender'

const INITIAL_WEATHER_STATUS = {
  color: COLORS.lightblue,
  message: 'Weather service powered by Open Weather ',
  icon: ''
}

const isWeatherAvailableForDay = date =>
  resetTime() <= date && date <= addDays(Date.now(), 5)

const getInitialState = (date, isWeatherAvailable) => () => {
  if (!isWeatherAvailable) {
    return {
      code: WEATHER_SERVICE_CODES.WEATHER_NOT_AVAILABLE,
      color: COLORS.lightGray,
      message: 'Weather is not available for the selected day.',
      icon: ''
    }
  }
  return INITIAL_WEATHER_STATUS
}

const WeatherChecker = ({ city, time, day, checkOnFirstRender }) => {
  const isWeatherAvailable = isWeatherAvailableForDay(day)
  const [weatherStatus, setWeatherStatus] = useState(
    getInitialState(day, isWeatherAvailable)
  )
  const [loading, setLoading] = useState(
    checkOnFirstRender && isWeatherAvailable
  )
  const firstRender = useFirstRender()

  const getWeather = () => () => {
    if (
      (!checkOnFirstRender && firstRender) ||
      weatherStatus.code === WEATHER_SERVICE_CODES.WEATHER_NOT_AVAILABLE
    ) {
      return
    }
    setLoading(true)
    const [h, m] = time.split(':')
    weatherService
      .getWeather(city, setTime(h, m, 0, 0)(day))
      .then(setWeatherStatus)
      .catch(setWeatherStatus)
      .then(() => setLoading(false)) // kind of 'finally'
  }

  useDebouncedEffect(getWeather(), [city, time], firstRender ? 0 : 1000)

  const color = loading ? COLORS.lightblue : weatherStatus.color
  const icon = loading ? '' : weatherStatus.icon

  return (
    <div
      css={css`
        display: flex;
        height: 50px;
      `}
    >
      <div
        css={css`
          flex: 7;
          display: flex;
          align-items: center;
          background-color: ${color};
          padding: 0.5rem;
          border-radius: 0.25rem 0 0 0.25rem;
          color: ${changeBrightness(color, -50)};
          transition: background-color 0.2s ease;
        `}
      >
        <span
          css={css`
            text-transform: capitalize;
          `}
        >
          {loading ? 'Loading...' : weatherStatus.message}
        </span>
      </div>
      <div
        css={css`
          flex: 1;
          background-color: ${changeBrightness(color, -10)};
          border-radius: 0 0.25rem 0.25rem 0;
        `}
      >
        <Icon icon={icon} />
      </div>
    </div>
  )
}

WeatherChecker.propTypes = {
  city: PropTypes.string,
  checkOnFirstRender: PropTypes.bool
}

export default WeatherChecker
