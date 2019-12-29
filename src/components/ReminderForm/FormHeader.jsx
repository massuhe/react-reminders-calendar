/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import COLORS from '../../utils/colors'
import Button from '../shared/Button'

const FormHeader = ({ mode, onDelete }) => {
  return (
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
        <Button background={COLORS.dangerRed} color='white' onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  )
}

FormHeader.propTypes = {
  mode: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default FormHeader
