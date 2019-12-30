/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'

const arrowStyle = css`
  cursor: pointer;
  margin: 0 1rem;
  font-size: 25px;
`

const c = h => n => () => h(n)

const MonthSelector = ({ currentMonth, onChangeMonth }) => {
  const handleChange = c(onChangeMonth)
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <span
        css={arrowStyle}
        onClick={handleChange(addMonths(currentMonth, -1))}
      >
        ◀
      </span>
      <h2
        css={css`
          width: 15vw;
          text-align: center;
        `}
      >
        {format(currentMonth, 'LLLL yyyy')}
      </h2>
      <span css={arrowStyle} onClick={handleChange(addMonths(currentMonth, 1))}>
        ▶
      </span>
    </div>
  )
}

MonthSelector.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onChangeMonth: PropTypes.func.isRequired
}

export default MonthSelector
