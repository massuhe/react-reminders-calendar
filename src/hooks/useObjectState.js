import { useState } from 'react'

const useObjectState = initialState => {
  const [state, setState] = useState(initialState)
  const changeState = updates => {
    setState({ ...state, ...updates })
  }
  return [state, changeState]
}

export default useObjectState
