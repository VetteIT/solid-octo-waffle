import { useCallback } from 'react'

/**
 * Lightweight pointer-tracker for creating on-hover spotlight gradients.
 * Keeps DOM writes scoped to the hovered element via CSS custom properties.
 */
const useInteractiveGlow = () => {
  const handleGlowMove = useCallback((event) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    target.style.setProperty('--mouse-x', `${x}%`)
    target.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  const handleGlowLeave = useCallback((event) => {
    const target = event.currentTarget
    target.style.removeProperty('--mouse-x')
    target.style.removeProperty('--mouse-y')
  }, [])

  return { handleGlowMove, handleGlowLeave }
}

export default useInteractiveGlow
