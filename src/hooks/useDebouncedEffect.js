import { useRef, useEffect } from 'react'

const useDebouncedEffect = (callback, dependencies, ms) => {
  // We use ref to store timeout ids
  const timeoutRef = useRef()

  useEffect(() => {
    timeoutRef.current = setTimeout(callback, ms)
    return () => clearTimeout(timeoutRef.current)
  }, dependencies)
}

export default useDebouncedEffect
