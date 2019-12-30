import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ReminderForm from '../ReminderForm/ReminderForm'

const buildEvent = value => ({ target: { value } })

describe('<ReminderForm />', () => {
  it('calls onFinishSave with the new reminder', () => {
    const day = new Date(2019, 11, 1, 0, 0, 0, 0)
    const onFinishSave = jest.fn()
    const { getByText, getByLabelText } = render(
      <ReminderForm
        mode='add'
        day={day}
        reminder={{}}
        onFinishSave={onFinishSave}
      />
    )
    fireEvent.change(
      getByLabelText('description'),
      buildEvent('Some description')
    )
    fireEvent.change(getByLabelText('city'), buildEvent('Some city'))
    fireEvent.change(getByLabelText('time'), buildEvent('12:00'))
    fireEvent.change(getByLabelText('color'), buildEvent('#ffffff'))
    fireEvent.click(getByText('Submit'))
    expect(onFinishSave).toHaveBeenCalled()
    expect(onFinishSave).toHaveBeenCalledWith('add', {
      description: 'Some description',
      city: 'Some city',
      time: '12:00',
      color: '#ffffff'
    })
  })
})
