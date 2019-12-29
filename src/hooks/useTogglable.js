import { useState } from 'react'

const useTogglable = initial => {
  const [visible, setVisible] = useState(initial)
  const toggle = () => {
    setVisible(!visible)
  }
  return [visible, toggle]
}

export default useTogglable
