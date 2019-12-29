/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Input = ({ label, ...props }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
      `}
    >
      <label
        htmlFor={props.name}
        css={css`
          text-transform: capitalize;
        `}
      >
        {label}
      </label>
      <input
        id={props.name}
        {...props}
        css={css`
          background: white;
          border: solid 1px lightgray;
          border-radius: 0.25rem;
          padding: 0.5rem;
        `}
      />
    </div>
  )
}

export default Input
