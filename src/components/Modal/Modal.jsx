/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ReactDOM from 'react-dom'
import { useEffect, useRef } from 'react'
import Button from '../shared/Button'
import COLORS from '../../utils/colors'

let modalRoot

const Modal = ({ visible, onDismiss, children }) => {
  const el = useRef(document.createElement('div'))
  useEffect(() => {
    if (!modalRoot) {
      modalRoot = document.getElementById('modal-root')
    }
    modalRoot.appendChild(el.current)
    return () => modalRoot.removeChild(el.current)
  }, [])
  return (
    visible &&
    ReactDOM.createPortal(
      <div
        css={css`
          background-color: rgba(0, 0, 0, 0.5);
          position: fixed;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            padding: 2rem;
            background-color: white;
            border-radius: 0.5rem;
            min-width: 25rem;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              onClick={onDismiss}
              background={COLORS.closeRed}
              color='white'
            >
              Close
            </Button>
          </div>
          {children}
        </div>
      </div>,
      el.current
    )
  )
}

export default Modal
