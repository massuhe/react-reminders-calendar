import { useState } from 'react'

const useSelectedDay = () => {
  const [selectedDay, setSelectedDay] = useState()
  const setSelectedWithValidations = d => {
    if (d.disabled) return
    setSelectedDay(d.date)
  }
  return [selectedDay, setSelectedWithValidations]
}

export default useSelectedDay
