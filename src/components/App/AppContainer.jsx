/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

const AppContainer = ({ children, isDaySelected }) => {
  return (
    <div
      css={css`
        max-width: 1200px;
        margin: 0 auto;
      `}
    >
      {children}
    </div>
  )
}

AppContainer.propTypes = {
  isDaySelected: PropTypes.bool.isRequired
}

export default AppContainer
