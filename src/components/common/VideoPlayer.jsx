import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const formatTime = seconds => {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const seekingRef = useRef(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    seekingRef.current = isSeeking
  }, [isSeeking])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = volume
    video.muted = isMuted
  }, [volume, isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsLoading(true)
    setError(null)
    setIsPlaying(false)
    setDuration(0)
    setCurrentTime(0)

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      if (!seekingRef.current) {
        setCurrentTime(video.currentTime || 0)
      }
    }

    const handleError = () => {
      setError('Video playback error')
      setIsLoading(false)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('error', handleError)

    video.pause()
    video.currentTime = 0
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('error', handleError)
    }
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && isPlaying && entry.intersectionRatio < 0.1) {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '50px',
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [isPlaying])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
      return
    }

    try {
      setIsLoading(false)
      await video.play()
      setIsPlaying(true)
    } catch (err) {
      console.error('Video playback error:', err)
      setError('Playback failed')
      setIsLoading(false)
    }
  }

  const handleTimelineChange = event => {
    const video = videoRef.current
    if (!video || !duration) return
    const value = Number(event.target.value)
    const newTime = (value / 100) * duration
    setCurrentTime(newTime)
    video.currentTime = newTime
  }

  const handleTimelineMouseDown = () => {
    setIsSeeking(true)
  }

  const handleTimelineMouseUp = () => {
    setIsSeeking(false)
  }

  const handleMuteToggle = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    video.muted = nextMuted
  }

  const handleVolumeChange = event => {
    const video = videoRef.current
    if (!video) return
    const value = Number(event.target.value) / 100
    setVolume(value)
    video.volume = value
    if (value > 0 && isMuted) {
      setIsMuted(false)
      video.muted = false
    }
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="video-player" ref={containerRef}>
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="metadata"
        controls={false}
        onClick={togglePlay}
        onPlay={() => {
          setIsPlaying(true)
          setIsLoading(false)
        }}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          setIsLoading(false)
        }}
        onError={e => {
          console.error('Video load error:', e)
          setError('Failed to load video')
          setIsLoading(false)
        }}
      />

      {isLoading && (
        <div className="video-loading">
          <div className="video-loading-spinner" />
        </div>
      )}

      {error && (
        <div className="video-error">
          <p>Video loading error</p>
        </div>
      )}

      <motion.div
        className="video-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {!isPlaying && (
          <motion.button
            className="video-play-btn"
            type="button"
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.button>
        )}
      </motion.div>

      <div className="video-controls">
        <button className="video-control-btn" type="button" onClick={togglePlay}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="video-timeline-wrapper">
          <input
            className="video-timeline"
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progressPercent}
            onChange={handleTimelineChange}
            onMouseDown={handleTimelineMouseDown}
            onMouseUp={handleTimelineMouseUp}
          />
          <div className="video-timeline-track">
            <div className="video-timeline-progress" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <span className="video-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <button className="video-control-btn" type="button" onClick={handleMuteToggle}>
          {isMuted || volume === 0 ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12L19 9.5 17.6 8.1 15.1 10.6 12.6 8.1 11.2 9.5 13.7 12 11.2 14.5 12.6 15.9 15.1 13.4 17.6 15.9 19 14.5 16.5 12z" />
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path d="M16 8.82v6.36c1.21-.91 2-2.35 2-3.99s-.79-3.08-2-3.99z" />
            </svg>
          )}
        </button>

        <div className="video-volume-wrapper">
          <input
            className="video-volume"
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume * 100}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <div className="video-glow" />
    </div>
  )
}

export default VideoPlayer

