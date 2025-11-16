import { useEffect, useState } from 'react'

// Прелоудер для всіх фото й відео таймлайну.
// Для відео чекаємо canplaythrough, щоб під час реального програвання було менше підвантажень.
const usePreloadMedia = (mediaItems = []) => {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mediaItems || mediaItems.length === 0) {
      setIsLoaded(true)
      setProgress(100)
      return
    }

    let cancelled = false
    const total = mediaItems.length
    let loadedCount = 0

    const handleLoaded = () => {
      if (cancelled) return
      loadedCount += 1
      const nextProgress = Math.round((loadedCount / total) * 100)
      setProgress(nextProgress)

      if (loadedCount >= total) {
        // Трохи затримки, щоб лоадер не зникав миттєво
        setTimeout(() => {
          if (!cancelled) setIsLoaded(true)
        }, 400)
      }
    }

    const loaders = mediaItems.map((item) => {
      if (item.type === 'image') {
        const img = new Image()
        img.onload = handleLoaded
        img.onerror = handleLoaded
        img.src = item.src
        return img
      }

      const video = document.createElement('video')

      const onLoaded = () => {
        video.removeEventListener('canplaythrough', onLoaded)
        video.removeEventListener('error', onLoaded)
        handleLoaded()
      }

      video.preload = 'auto'
      video.addEventListener('canplaythrough', onLoaded)
      video.addEventListener('error', onLoaded)
      video.src = item.src
      // Явно запускаємо завантаження
      video.load()
      return video
    })

    // Захист від вічного лоадера: якщо за 10 секунд не все готово, все одно стартуємо
    const timeout = setTimeout(() => {
      if (!cancelled) {
        setIsLoaded(true)
        setProgress(100)
      }
    }, 10000)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      loaders.forEach((loader) => {
        if (loader && loader.removeAttribute) {
          loader.removeAttribute('src')
        }
      })
    }
  }, [mediaItems])

  return { isLoaded, progress }
}

export default usePreloadMedia

