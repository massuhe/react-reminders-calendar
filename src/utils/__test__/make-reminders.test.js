import makeNewReminders from '../makeReminders'

describe('makeReminders.js', () => {
  it('adds new reminder', () => {
    const date = new Date(2019, 11, 1, 0, 0, 0, 0)
    const newReminder = {
      description: 'Some description',
      city: 'Some city',
      time: '12:00',
      color: '#ffffff'
    }
    const expectedReminders = {
      [date.toISOString()]: [
        {
          id: expect.any(String),
          description: 'Some description',
          city: 'Some city',
          time: '12:00',
          color: '#ffffff'
        }
      ]
    }
    expect(makeNewReminders('add', {}, date, newReminder)).toEqual(
      expectedReminders
    )
  })
})
