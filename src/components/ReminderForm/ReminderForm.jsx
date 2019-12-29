import React, { useState } from 'react' // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import Form from '../shared/Form'
import Input from '../shared/Input'
import Button from '../shared/Button'
import WeatherChecker from '../WeatherChecker'
import useObjectState from '../../hooks/useObjectState'
import COLORS from '../../utils/colors'

const handle = set => prop => e => set({ [prop]: e.target.value })
const emptyFormState = {
  description: '',
  city: '',
  time: '00:00',
  color: '#000000'
}
const getInitialFormState = (mode, reminder) => () =>
  mode === 'edit' ? reminder : emptyFormState

const ReminderForm = ({ mode, reminder, onFinishSave }) => {
  const [form, setForm] = useObjectState(getInitialFormState(mode, reminder))

  const handleSubmit = e => {
    e.preventDefault()
    onFinishSave(mode, form)
  }

  const handleDelete = () => onFinishSave('delete', reminder)

  const handleChange = handle(setForm)

  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <h1
          css={css`
            margin: 0 1rem 0 0;
            text-transform: capitalize;
          `}
        >
          {mode} reminder
        </h1>
        {mode === 'edit' && (
          <Button
            background={COLORS.dangerRed}
            color='white'
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <Input
          value={form.description}
          onChange={handleChange('description')}
          type='text'
          name='description'
          label='description'
          required
          maxLength='30'
        />
        <Input
          value={form.city}
          onChange={handleChange('city')}
          type='text'
          name='city'
          label='city'
          required
        />
        <Input
          value={form.time}
          onChange={handleChange('time')}
          type='time'
          name='time'
          label='time'
          required
        />
        <WeatherChecker auto={mode !== 'view'} />
        <Input
          value={form.color}
          onChange={handleChange('color')}
          type='color'
          name='color'
          label='color'
        />
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Button background={COLORS.purpleBlue} color='white' stretch={2}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  )
}

ReminderForm.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit', 'view']),
  reminder: PropTypes.object
}

export default ReminderForm
