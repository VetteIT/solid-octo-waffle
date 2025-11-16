import { useEffect, useRef } from 'react'

const InteractiveBackground = () => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)
  const hueBaseRef = useRef(260)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resize()

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.hueOffset = Math.random() * 40 - 20
      }

      update(mouseX, mouseY) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 200

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          this.vx -= (dx / dist) * force * 0.1
          this.vy -= (dy / dist) * force * 0.1
        }

        this.x += this.vx
        this.y += this.vy

        this.vx *= 0.99
        this.vy *= 0.99

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        this.x = Math.max(0, Math.min(width, this.x))
        this.y = Math.max(0, Math.min(height, this.y))
      }

      draw(ctx) {
        const baseHue = hueBaseRef.current || 260
        const hue = baseHue + this.hueOffset
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${this.opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, ${this.opacity})`
        ctx.fill()
      }
    }

    const particleCount = 80
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle())

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleScroll = () => {
      const doc = document.documentElement
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      // змінюємо палітру від холодної до теплішої по мірі скролу
      hueBaseRef.current = 230 + progress * 120
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 5, 17, 0.05)'
      ctx.fillRect(0, 0, width, height)

      const { x: mouseX, y: mouseY } = mouseRef.current

      particlesRef.current.forEach((particle) => {
        particle.update(mouseX, mouseY)
        particle.draw(ctx)
      })

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `rgba(156, 110, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="interactive-background" aria-hidden="true" />
}

export default InteractiveBackground

