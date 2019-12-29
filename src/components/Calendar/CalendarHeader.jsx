/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const weekDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const CalendarHeader = () => {
  return weekDayNames.map((wd, i) => (
    <div
      key={wd}
      css={css`
        color: white;
        background-color: #2f74b5;
        padding: 0.2rem;
        border-bottom: solid 1px black;
        border-left: solid 1px black;
        text-align: center;
      `}
    >
      {wd}
    </div>
  ))
}

export default CalendarHeader
