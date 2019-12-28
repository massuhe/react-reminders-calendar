import isEqual from 'date-fns/isEqual'
import setHours from 'date-fns/setHours'
import setSeconds from 'date-fns/setSeconds'
import setMinutes from 'date-fns/setMinutes'
import setMilliseconds from 'date-fns/setMilliseconds'

/**
 * TODO: REFACTOR - Curry and reverse date-fns functions in order to do this:
 * compose(
 *   setMilliseconds(milliseconds),
 *   setSeconds(seconds),
 *   setMinutes(minutes),
 *   setHours(hours)
 * )(date)
 */
export const setTime = (hours, minutes, seconds, milliseconds) => (
  date = new Date()
) =>
  setHours(
    setMinutes(
      setSeconds(setMilliseconds(date, milliseconds), seconds),
      minutes
    ),
    hours
  )

export const resetTime = setTime(0, 0, 0, 0)

export const isEqualWithoutTimezone = (leftDate, rightDate) => {
  const leftDateWOT = resetTime(leftDate)
  const rightDateWOT = resetTime(rightDate)
  return isEqual(leftDateWOT, rightDateWOT)
}
