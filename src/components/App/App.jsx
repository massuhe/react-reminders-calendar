import { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Modal from '../Modal'
import Calendar from '../Calendar'
import ReminderForm from '../ReminderForm'
import useSelectedDay from './hooks/useSelectedDay'
import Button from '../shared/Button'
import makeNewReminders from '../../utils/makeReminders'
import COLORS from '../../utils/colors'

const getCurrentMonth = () => {
  return new Date().getMonth()
}

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth) // jan: 0 ... dic: 11
  const [reminders, setReminders] = useState({})
  const [selectedDay, setSelectedDay] = useSelectedDay()
  const [selectedReminder, setSelectedReminder] = useState()
  const [mode, setMode] = useState('')

  const openModal = m => () => setMode(m)
  const closeModal = () => setMode('')

  const openEditModal = () => r => () => {
    setSelectedReminder(r)
    openModal('edit')()
  }

  const handleFinishSave = (mode, r) => {
    const newReminders = makeNewReminders(mode, reminders, selectedDay, r)
    setReminders(newReminders)
    setMode('')
  }

  const deleteAllReminders = () => {
    const newReminders = makeNewReminders('deleteAll', reminders, selectedDay)
    setReminders(newReminders)
  }

  return (
    <div
      css={css`
        max-width: 1200px;
        margin: ${selectedDay ? 0 : 56}px auto 0 auto;
      `}
    >
      {selectedDay && (
        <div>
          <Button background={COLORS.green} onClick={openModal('add')}>
            Add new reminder
          </Button>
          <Button
            background={COLORS.dangerRed}
            color='white'
            onClick={deleteAllReminders}
          >
            Delete all reminders
          </Button>
        </div>
      )}
      <Modal visible={mode !== ''} onDismiss={closeModal}>
        <ReminderForm
          mode={mode}
          reminder={selectedReminder}
          onFinishSave={handleFinishSave}
        />
      </Modal>
      <Calendar
        month={selectedMonth}
        reminders={reminders}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        onSelectReminder={openEditModal()}
      />
    </div>
  )
}

export default App
