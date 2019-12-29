import { sortedInsert } from './arrayUtils'
import { setTime } from './timeUtils'

const createReminder = (reminderInfo, date) => {
  const [hours, minutes] = reminderInfo.time.split(':')
  return {
    ...reminderInfo,
    date: setTime(hours, minutes, 0, 0)(date),
    id: String(Math.random())
  }
}

const editReminder = (reminder, date) => {
  const [hours, minutes] = reminder.time.split(':')
  return {
    ...reminder,
    date: setTime(hours, minutes, 0, 0)(date)
  }
}

const FN_BY_ACTIONS = {
  add: (reminders, reminderInfo, date) => {
    const reminder = createReminder(reminderInfo, date)
    return reminders
      ? sortedInsert(reminders)((a, b) => a.time > b.time)(reminder)
      : [reminder]
  },
  edit: (reminders, reminder) => {
    const remindersWithoutEdited = reminders.filter(r => r.id !== reminder.id)
    return sortedInsert(remindersWithoutEdited)((a, b) => a.time > b.time)(
      editReminder(reminder)
    )
  },
  delete: (reminders, reminder) => reminders.filter(r => r.id !== reminder.id),
  deleteAll: () => []
}

const makeNewReminders = (action, oldReminders, date, reminder) => {
  const key = date.toISOString()
  const newReminders = {
    [key]: FN_BY_ACTIONS[action](oldReminders[key], reminder, date)
  }
  return {
    ...oldReminders,
    ...newReminders
  }
}

export default makeNewReminders
