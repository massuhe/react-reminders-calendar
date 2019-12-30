import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import App from '../components/App'

// Extend matchers to include those in 'jest-emotion'
expect.extend(matchers)

describe('Add reminder integration test', () => {
  const addModalRoot = () => {
    const modalRoot = document.createElement('div')
    modalRoot.id = 'modal-root'
    document.body.appendChild(modalRoot)
  }
  const cleanModalRoot = () =>
    document.body.removeChild(document.getElementById('modal-root'))
  const buildEvent = value => ({ target: { value } })

  it('should add new reminder correctly', () => {
    addModalRoot()
    const { getAllByTestId, getByTestId, getByText, getByLabelText } = render(
      <App />
    )

    // Get the calendar day corresponding to the 10th of the current month.
    const calendarDay = getAllByTestId('calendar-day').find(
      e => e.querySelector('span').textContent === '10'
    )

    // Open reminder form
    fireEvent.click(calendarDay)
    fireEvent.click(getByText('Add new reminder'))

    // Fill reminder form
    fireEvent.change(
      getByLabelText('description'),
      buildEvent('Some description')
    )
    fireEvent.change(getByLabelText('city'), buildEvent('Some city'))
    fireEvent.change(getByLabelText('time'), buildEvent('12:00'))
    fireEvent.change(getByLabelText('color'), buildEvent('#4d90fe'))
    fireEvent.click(getByText('Submit'))

    // Assert over newly created reminder
    const reminder = getByTestId('reminder')
    expect(reminder.textContent).toBe('12:00: Some description')
    expect(reminder).toHaveStyleRule('background-color', '#4d90fe')
    // Clean up
    cleanModalRoot()
  })
})
