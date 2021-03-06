import getDaysInMonth from 'date-fns/getDaysInMonth'
import setMonth from 'date-fns/setMonth'
import setYear from 'date-fns/setYear'
import setDate from 'date-fns/setDate'
import getDay from 'date-fns/getDay'
import addMonths from 'date-fns/addMonths'
import isWeekend from 'date-fns/isWeekend'
import { isEqualWithoutTimezone, resetTime } from './timeUtils'

const getCurrentMonthDays = (month, selectedDay) =>
  Array.from({
    length: getDaysInMonth(month)
  }).map((_, i) => {
    const date = resetTime(setDate(month, i + 1))
    return {
      date,
      selected: selectedDay && isEqualWithoutTimezone(date, selectedDay),
      today: isEqualWithoutTimezone(date, new Date()),
      weekend: isWeekend(date)
    }
  })

const getPastMonthDays = month => {
  const firstWeekDayOfCurrentMonth = getDay(setDate(month, 1)) // 0: sunday, ..., 6: saturday
  const prevMonth = addMonths(month, -1)
  const prevMonthTotalDays = getDaysInMonth(prevMonth)
  return Array.from({ length: firstWeekDayOfCurrentMonth }).map((_, i) => ({
    disabled: true,
    date: resetTime(
      setDate(
        prevMonth,
        prevMonthTotalDays - firstWeekDayOfCurrentMonth + i + 1
      )
    )
  }))
}

const getNextMonthDays = (month, daysAccum) => {
  const substractor = daysAccum > 35 ? 42 : 35
  return Array.from({ length: substractor - daysAccum }).map((_, i) => ({
    disabled: true,
    date: resetTime(setDate(addMonths(month, 1), i + 1))
  }))
}

const buildDays = (month, year, selectedDay) => {
  const monthDateFormat = setMonth(setYear(new Date(), year), month)
  // Init days array with the days of the current month.
  const currentMonthDays = getCurrentMonthDays(monthDateFormat, selectedDay)

  // Fill the left side of the calendar with previous month's days if current month's 1st day is not Sunday.
  const pastMonthDays = getPastMonthDays(monthDateFormat)

  // Fill the right side of the calendar until we get 36 days.
  const nextMonthDays = getNextMonthDays(
    monthDateFormat,
    currentMonthDays.length + pastMonthDays.length
  )

  return [...pastMonthDays, ...currentMonthDays, ...nextMonthDays]
}

export default buildDays
