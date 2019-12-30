import { useRef, useEffect } from 'react'

const useFirstRender = () => {
  const renderRef = useRef(true)
  useEffect(() => {
    renderRef.current = false
  }, [])
  return renderRef.current
}

export default useFirstRender
