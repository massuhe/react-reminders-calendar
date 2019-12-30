/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import Button from '../shared/Button'
import COLORS from '../../utils/colors'

const ActionButtons = ({ onAddReminder, onDeleteAllReminders }) => {
  return (
    <div>
      <Button background={COLORS.green} onClick={onAddReminder}>
        Add new reminder
      </Button>
      <Button
        background={COLORS.dangerRed}
        color='white'
        onClick={onDeleteAllReminders}
      >
        Delete all reminders
      </Button>
    </div>
  )
}

ActionButtons.propTypes = {
  onAddReminder: PropTypes.func.isRequired,
  onDeleteAllReminders: PropTypes.func.isRequired
}

export default ActionButtons
