/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

/**
 * Could be extended to support different types of sources, for example, a font-awesome icon code.
 * For simplicity, it only supports the case in which icon is an url.
 */
const Icon = ({ icon }) => (icon ? <img src={icon} alt='Weather icon' /> : null)

Icon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}

export default Icon
