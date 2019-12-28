import { useState } from 'react'
import Calendar from './Calendar'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Modal from './Modal/Modal'

const getCurrentMonth = () => {
  return new Date().getMonth()
}

const useSelectedDay = () => {
  const [selectedDay, setSelectedDay] = useState()
  const setSelectedWithValidations = d => {
    if (d.disabled) return
    setSelectedDay(d.date)
  }
  return [selectedDay, setSelectedWithValidations]
}

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth) // jan: 0 ... dic: 11
  const [visible, setVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useSelectedDay()
  return (
    <div
      css={css`
        max-width: 1200px;
        margin: 0 auto;
      `}
    >
      <Calendar
        month={selectedMonth}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
    </div>
  )
}

export default App
