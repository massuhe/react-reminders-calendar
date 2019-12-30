import { sortedInsert } from './arrayUtils'

const ACTIONS_EXECUTORS = {
  add: (reminders, reminderInfo, date) => {
    const reminder = { ...reminderInfo, id: String(Math.random()) }
    return reminders
      ? sortedInsert(reminders)((a, b) => a.time > b.time)(reminder)
      : [reminder]
  },
  edit: (reminders, reminder) => {
    const remindersWithoutEdited = reminders.filter(r => r.id !== reminder.id)
    return sortedInsert(remindersWithoutEdited)((a, b) => a.time > b.time)(
      reminder
    )
  },
  delete: (reminders, reminder) => reminders.filter(r => r.id !== reminder.id),
  deleteAll: () => []
}

const makeNewReminders = (action, oldReminders, date, reminder) => {
  const key = date.toISOString()
  const executeAction = ACTIONS_EXECUTORS[action]
  const newReminders = {
    [key]: executeAction(oldReminders[key], reminder, date)
  }
  return {
    ...oldReminders,
    ...newReminders
  }
}

export default makeNewReminders
