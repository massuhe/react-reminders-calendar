/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { changeBrightness } from '../../utils/colorUtils'

const getLabel = (value, children) =>
  value || typeof children === 'string' ? children : ''

const Button = ({
  value,
  children,
  type,
  color,
  background,
  stretch = 0.5,
  ...props
}) => {
  const bg = background || 'lightgray'
  return (
    <input
      type='submit'
      value={getLabel(value, children)}
      css={css`
        cursor: pointer;
        margin: 0.5rem 0.5rem 0.5rem 0;
        border: none;
        padding: 0.5rem ${stretch}rem;
        background: ${bg};
        color: ${color || 'black'};
        border-radius: 0.5rem;
        transition: background 0.2s ease;
        &:hover {
          background: ${changeBrightness(bg, 10)};
        }
      `}
      {...props}
    />
  )
}

export default Button
