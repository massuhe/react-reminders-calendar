import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import Calendar from '../Calendar/Calendar'
import Reminder from '../Calendar/Reminder'

// Extend matchers to include those in 'jest-emotion'
expect.extend(matchers)

describe('<Calendar />', () => {
  it('should call onSelectDay when clicking on a calendar day', () => {
    const onSelectDay = jest.fn()
    const { getAllByTestId } = render(
      <Calendar
        month={11}
        onSelectDay={onSelectDay}
        reminders={{}}
        year={2019}
      />
    )
    // Pick the first item. We are sure that the first item of Dec 2019 will be 1st.
    const day = getAllByTestId('calendar-day')[0]
    const dayDate = new Date(2019, 11, 1, 0, 0, 0, 0)
    fireEvent.click(day)
    expect(onSelectDay).toBeCalledTimes(1)
    expect(onSelectDay).toHaveBeenCalledWith({
      date: dayDate,
      selected: undefined,
      today: expect.any(Boolean),
      weekend: true
    })
  })
})

describe('<Reminder />', () => {
  it('should display the reminder with its respective color', () => {
    const reminder = {
      id: 'someId',
      description: 'Some description',
      city: 'Some city',
      time: '12:00',
      color: '#4d90fe'
    }
    const { getByTestId } = render(
      <Reminder reminder={reminder} onSelect={jest.fn()} />
    )
    expect(getByTestId('reminder')).toHaveStyleRule(
      'background-color',
      '#4d90fe'
    )
  })
})
