/** @jsx jsx */
import { jsx } from '@emotion/core'

const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>
}

export default Form
