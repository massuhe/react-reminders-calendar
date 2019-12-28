/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import match from '../utils/match'

const COLORS_BY_DAY = [
  [d => d.weekend, 'blue'],
  [d => d.disabled, 'gray'],
  [d => d.today, 'green']
]

const getColor = match(COLORS_BY_DAY, 'black')
const handleClick = cb => x => () => cb(x)

const CalendarDay = ({ day, reminders, onSelectDay }) => {
  return (
    <div
      css={css`
        border-bottom: solid 1px black;
        border-left: solid 1px black;
        color: ${getColor(day)};
        background-color: ${day.selected ? 'lightblue' : 'white'};
      `}
      onClick={handleClick(onSelectDay)(day)}
    >
      <span>{day.date.getDate()}</span>
      <div>
        {reminders.map(r => (
          <div
            key={r.time}
            css={css`
              background-color: ${r.color};
            `}
          >
            {r.description}
          </div>
        ))}
      </div>
    </div>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  reminders: PropTypes.array.isRequired
}

export default CalendarDay
