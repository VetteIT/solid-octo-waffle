import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const baseOptions = {
  fullScreen: false,
  fpsLimit: 60,
  detectRetina: true,
  background: { color: 'transparent' },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: ['grab', 'repulse'] },
      onClick: { enable: false },
      resize: true,
    },
    modes: {
      grab: {
        distance: 160,
        links: { opacity: 0.4 },
      },
      repulse: {
        distance: 80,
        duration: 0.4,
      },
    },
  },
  particles: {
    number: {
      value: 45,
      density: { enable: true, area: 800 },
    },
    color: { value: ['#9c6eff', '#48d5ff', '#ffb97a'] },
    links: {
      enable: true,
      distance: 140,
      color: '#9aa3ce',
      opacity: 0.25,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      outModes: 'out',
    },
    opacity: { value: 0.5, random: true },
    size: { value: { min: 1, max: 4 } },
  },
}

const variantOverrides = {
  hero: {
    particles: {
      number: { value: 60 },
      move: { speed: 1.5 },
    },
  },
  timeline: {
    particles: {
      number: { value: 40 },
      links: { color: '#48d5ff', opacity: 0.35 },
    },
  },
  memories: {
    particles: {
      number: { value: 55 },
      color: { value: ['#ffb97a', '#ff6fb7', '#48d5ff'] },
    },
  },
  wishes: {
    particles: {
      number: { value: 45 },
      color: { value: ['#9c6eff', '#48d5ff'] },
    },
  },
  outro: {
    particles: {
      number: { value: 35 },
      color: { value: ['#ffb97a', '#ff6fb7'] },
      move: { speed: 1.7 },
    },
  },
}

const mergeOptions = (base, override) => {
  if (!override) return base
  const merged = {
    ...base,
    particles: {
      ...base.particles,
      ...(override.particles || {}),
      number: {
        ...base.particles.number,
        ...(override.particles?.number || {}),
      },
      color: override.particles?.color || base.particles.color,
      move: {
        ...base.particles.move,
        ...(override.particles?.move || {}),
      },
      links: {
        ...base.particles.links,
        ...(override.particles?.links || {}),
      },
    },
  }
  return merged
}

const SectionParticles = ({ variant = 'hero', className = '' }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const options = mergeOptions(baseOptions, variantOverrides[variant])

  return (
    <Particles
      className={`section-particles ${className}`}
      init={particlesInit}
      options={options}
    />
  )
}

export default SectionParticles


