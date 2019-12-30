import { useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Modal from '../Modal'
import Calendar from '../Calendar'
import ReminderForm from '../ReminderForm'
import useSelectedDay from './hooks/useSelectedDay'
import makeNewReminders from '../../utils/makeReminders'
import AppContainer from './AppContainer'
import ActionButtons from './ActionButtons'
import { setDay } from 'date-fns'

const initialMonth = () => setDay(new Date(), 1)

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth) // jan: 0 ... dic: 11
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
    <AppContainer isDaySelected={Boolean(selectedDay)}>
      {selectedDay && (
        <ActionButtons
          onAddReminder={openModal('add')}
          onDeleteAllReminders={deleteAllReminders}
        />
      )}
      <Modal visible={mode !== ''} onDismiss={closeModal}>
        <ReminderForm
          mode={mode}
          day={selectedDay}
          reminder={selectedReminder}
          onFinishSave={handleFinishSave}
        />
      </Modal>
      <Calendar
        year={selectedMonth.getFullYear()}
        month={selectedMonth.getMonth()}
        reminders={reminders}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        onSelectReminder={openEditModal()}
      />
    </AppContainer>
  )
}

export default App
