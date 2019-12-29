import React from 'react'
import ReactDOM from 'react-dom'
import { Global } from '@emotion/core'
import App from './components/App'
import globalStyles from './globalStyles'

const root = document.getElementById('root')

const component = (
  <>
    <Global styles={globalStyles} />
    <App />
  </>
)

ReactDOM.render(component, root)
