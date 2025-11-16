import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const colors = ['#9c6eff', '#48d5ff', '#ffb97a', '#94f0c6', '#ff6fb7', '#ffd700', '#ff6b9d']

const ConfettiCanvas = forwardRef((_, ref) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const ratio = window.devicePixelRatio || 1
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    canvas.width = window.innerWidth * ratio
    canvas.height = window.innerHeight * ratio
    ctx.scale(ratio, ratio)
  }

  const createParticles = () => {
    const total = 250
    const width = window.innerWidth
    const height = window.innerHeight

    return Array.from({ length: total }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * -0.5 - 100,
      size: 4 + Math.random() * 8,
      speedX: -3 + Math.random() * 6,
      speedY: 2 + Math.random() * 5,
      rotation: Math.random() * 360,
      rotationSpeed: -6 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.7 + Math.random() * 0.3,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }))
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = window.innerWidth
    const height = window.innerHeight
    ctx.clearRect(0, 0, width, height)

    let alive = false

    particlesRef.current = particlesRef.current.map((particle) => {
      const next = { ...particle }
      next.x += next.speedX
      next.y += next.speedY
      next.rotation += next.rotationSpeed
      next.speedY += 0.08

      if (next.y < height + 100 && next.x > -100 && next.x < width + 100) {
        alive = true
      }

      ctx.save()
      ctx.globalAlpha = next.opacity
      ctx.translate(next.x, next.y)
      ctx.rotate((next.rotation * Math.PI) / 180)
      ctx.fillStyle = next.color

      if (next.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, next.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-next.size / 2, -next.size / 2, next.size, next.size * 0.6)
      }

      ctx.restore()

      return next
    })

    if (alive) {
      animationRef.current = requestAnimationFrame(draw)
    } else {
      animationRef.current = null
    }
  }

  const shoot = () => {
    resizeCanvas()
    particlesRef.current = [...particlesRef.current, ...createParticles()]
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(draw)
    }
  }

  useImperativeHandle(ref, () => ({
    shoot,
  }))

  useEffect(() => {
    resizeCanvas()
    const handleResize = () => resizeCanvas()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
})

ConfettiCanvas.displayName = 'ConfettiCanvas'

export default ConfettiCanvas

