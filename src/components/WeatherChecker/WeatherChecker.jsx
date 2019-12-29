/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { changeBrightness } from '../../utils/colorUtils'
import COLORS from '../../utils/colors'

const WeatherChecker = () => {
  return (
    <div
      css={css`
        cursor: pointer;
        background-color: ${COLORS.lightblue};
        padding: 0.5rem;
        border-radius: 0.5rem;
        color: ${COLORS.darkBlue};
        transition: background-color 0.2s ease;
        &:hover {
          background-color: ${changeBrightness(COLORS.lightblue, -20)};
        }
      `}
    >
      <span>Click to check weather</span>
    </div>
  )
}

export default WeatherChecker
