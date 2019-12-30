/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import match from '../../utils/match'
import Reminder from './Reminder'

const COLORS_BY_DAY = [
  [d => d.weekend, 'blue'],
  [d => d.disabled, 'gray'],
  [d => d.today, 'green']
]

const getColor = match(COLORS_BY_DAY, 'black')
const handleClick = cb => x => () => cb(x)

const CalendarDay = ({ day, reminders, onSelectDay, onSelectReminder }) => {
  return (
    <div
      data-testid='calendar-day'
      css={css`
        display: flex;
        flex-direction: column;
        padding: 0.2rem;
        border-bottom: solid 1px black;
        border-left: solid 1px black;
        color: ${getColor(day)};
        background-color: ${day.selected ? 'lightblue' : 'white'};
        height: 120px;
      `}
      onClick={handleClick(onSelectDay)(day)}
    >
      <span>{day.date.getDate()}</span>
      <div
        css={css`
          padding: 0.5rem;
          overflow-y: auto;
        `}
      >
        {reminders.map(r => (
          <Reminder
            key={r.id}
            reminder={r}
            onSelect={onSelectReminder}
            disabled={day.disabled}
          />
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
