import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import Form from '../shared/Form'
import Input from '../shared/Input'
import Button from '../shared/Button'
import WeatherChecker from '../WeatherChecker'
import useObjectState from '../../hooks/useObjectState'
import COLORS from '../../utils/colors'
import FormHeader from './FormHeader'

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
      <FormHeader mode={mode} onDelete={handleDelete} />
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
        <WeatherChecker />
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
  mode: PropTypes.oneOf(['add', 'edit', 'view', '']).isRequired,
  reminder: PropTypes.object,
  onFinishSave: PropTypes.func.isRequired
}

export default ReminderForm
