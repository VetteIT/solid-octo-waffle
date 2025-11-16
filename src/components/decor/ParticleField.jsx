const dots = Array.from({ length: 24 })

const ParticleField = () => (
  <div className="particle-field" aria-hidden="true">
    {dots.map((_, index) => (
      <span key={`dot-${index}`} className="particle-dot" style={{ '--i': index }} />
    ))}
  </div>
)

export default ParticleField

