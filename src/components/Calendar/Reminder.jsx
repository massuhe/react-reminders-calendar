import React from 'react' // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { isColorLight, changeBrightness } from '../../utils/colorUtils'

const getDescription = r => {
  return (
    <>
      <span
        css={css`
          font-weight: bold;
        `}
      >
        {format(r.date, 'HH:mm')}:{' '}
      </span>
      <span>{r.description}</span>
    </>
  )
}

const Reminder = ({ reminder, onSelect }) => {
  return (
    <div
      key={reminder.time}
      onClick={onSelect(reminder)}
      css={css`
        cursor: pointer;
        background-color: ${reminder.color};
        color: ${isColorLight(reminder.color) ? 'black' : 'white'};
        padding: 0.2rem;
        margin-bottom: 0.5rem;
        font-size: 12px;
        transition: background-color 0.2s ease;
        &:hover {
          background-color: ${changeBrightness(reminder.color, -15)};
        }
      `}
    >
      {getDescription(reminder)}
    </div>
  )
}

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired
}

export default Reminder
