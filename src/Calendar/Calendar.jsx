/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import CalendarHeader from './CalendarHeader'
import buildDays from '../utils/buildDays'
import CalendarDay from './CalendarDay'

const extractReminders = reminders => day => {
  return []
}

const Calendar = ({ month, reminders, selectedDay, onSelectDay }) => {
  const days = buildDays(month, reminders, selectedDay)
  const extract = extractReminders(reminders)
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border-right: solid 1px black;
        border-top: solid 1px black;
      `}
    >
      <CalendarHeader />
      {days.map(d => (
        <CalendarDay
          key={String(d.date)}
          day={d}
          reminders={extract(d)}
          onSelectDay={onSelectDay}
        />
      ))}
    </div>
  )
}

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  onSelectDay: PropTypes.func.isRequired,
  reminders: PropTypes.object,
  selectedDay: PropTypes.object
}

export default Calendar
