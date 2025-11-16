import { useMemo } from 'react'

import sleighRidePoster from '../assets/BirthdayPhotoAndVid/2014-12-24_snow-fun.jpg'
import robotBuildPoster from '../assets/BirthdayPhotoAndVid/2015-04-02_robot-club.jpg'
import starPerformancePoster from '../assets/BirthdayPhotoAndVid/2018-11-20_science-fair.jpg'

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp']
const videoExtensions = ['mp4', 'webm', 'mov']

const mediaModules = import.meta.glob('../assets/BirthdayPhotoAndVid/*', {
  eager: true,
})

// Конвертовані відео файли для кращої продуктивності
const convertedVideos = import.meta.glob('../assets/BirthdayPhotoAndVid/converted/*', {
  eager: true,
})

// Опис кожного файлу — щоб картки мали осмислені заголовки й тексти.
const mediaDescriptions = {
  '2009-05-01_first-step.jpg': {
    label: 'Перший крок',
    description:
      'Перші невпевнені кроки по кімнаті й величезні очі, які відкривають світ. Саме з цього моменту твоя власна подорож офіційно стартувала.',
  },
  '2010-03-14_first-bike.jpg': {
    label: 'Перший велосипед',
    description:
      'Шолом трохи з’їхав на лоба, але усмішка — на всі щоки. День, коли поміч батьків відступила на крок убік і ти поїхав самостійно.',
  },
  '2011-09-01_first-school-day.jpg': {
    label: 'Перший день у школі',
    description:
      'Букети, новий рюкзак і хвилювання перед першим дзвоником. Тут почалася історія з друзями, улюбленими вчителями й тетрадками з мріями.',
  },
  '2011-12-10_sleigh-ride.mp4': {
    label: 'Санчата та хурделиця',
    description:
      'Заметіль, червоні щоки і сміх, який гучніший за хрускіт снігу. Зимове відео, де швидкість не вимірюється кілометрами, а кількістю щасливих вигуків.',
    poster: sleighRidePoster,
  },
  '2012-06-18_family-trip.jpg': {
    label: 'Сімейна подорож',
    description:
      'Валізи, дорога й музика з вікна авто. Спільні жарти, зупинки на перекус і фотографії, які нагадують: головне — хто поруч.',
  },
  '2013-07-15_sea-trip.jpg': {
    label: 'Морська пригода',
    description:
      'Теплий пісок, мокрі від моря кросівки й башти з піску, що постійно змиває хвиля. Кадр, який пахне сонцезахисним кремом і свободою.',
  },
  '2014-05-22_robot-build.mp4': {
    label: 'Перший робот',
    description:
      'Деталі, схеми й очі, що світяться цікавістю. Відео з клубу робототехніки, де маленький проєкт уперше ожив завдяки твоїм рукам.',
    poster: robotBuildPoster,
  },
  '2014-12-24_snow-fun.jpg': {
    label: 'Зимові забави',
    description:
      'Сніжки, сміх і сніговик із трохи кривою морквою. Ідеальний зимовий день, коли додому повертаєшся мокрий, але неймовірно щасливий.',
  },
  '2015-04-02_robot-club.jpg': {
    label: 'Клуб робототехніки',
    description:
      'Перше знайомство з командами, схемами та спільними перемогами. Місце, де ти зрозумів: технології — це не лише про залізо, а й про дружбу.',
  },
  '2016-08-20_summer-camp.jpg': {
    label: 'Літній табір',
    description:
      'Гітара біля вогнища, лампові історії вночі й нові друзі. Табір, після якого ти повернувся додому трохи старшим і набагато сміливішим.',
  },
  '2017-10-31_space-costume.jpg': {
    label: 'Космічний костюм',
    description:
      'Шолом, зіркові нашивки й відчуття, що ти готовий у справжній політ. Фото, де дитяча фантазія виглядає переконливіше за будь-яку графіку.',
  },
  '2018-06-30_star-performance.mp4': {
    label: 'Зоряний виступ',
    description:
      'Сцена, прожектори й зал, який завмирає під час твоєї появи. У цьому відео чути, як упевненість росте з кожним рухом і кожною нотою.',
    poster: starPerformancePoster,
  },
  '2018-11-20_science-fair.jpg': {
    label: 'Науковий ярмарок',
    description:
      'Стенди з дослідами, цікаві запитання й здивовані погляди журі. День, коли твої ідеї довели: наука може бути одночасно серйозною і веселою.',
  },
  '2019-09-05_first-goal.jpg': {
    label: 'Перший гол',
    description:
      'М’яч у сітці, крик «Є!» і команда, що підкидає тебе вище за всіх. Мить, у якій зустрілися наполегливість, тренування й чиста радість.',
  },
}

const formatLabel = (raw, fileName) => {
  if (mediaDescriptions[fileName]?.label) {
    return mediaDescriptions[fileName].label
  }

  return raw
    .split(/[-_]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatDate = (dateString) => {
  if (!dateString) return '??.??.????'
  const [year, month, day] = dateString.split('-')
  return `${day}.${month}.${year}`
}

const parseEntry = (filePath, module) => {
  const fileName = filePath.split('/').pop()
  if (!fileName) return null

  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})[_-](.+)\.(\w+)$/i)
  if (!match) return null

  const [, date, rawLabel, ext] = match
  const extension = ext.toLowerCase()
  const type = imageExtensions.includes(extension)
    ? 'image'
    : videoExtensions.includes(extension)
      ? 'video'
      : null

  if (!type) return null

  // Перевіряємо, чи є конвертована версія відео
  let src = module?.default ?? module
  if (type === 'video') {
    const convertedFileName = fileName.replace('.mp4', '-converted.mp4')
    const convertedPath = `../assets/BirthdayPhotoAndVid/converted/${convertedFileName}`
    const convertedModule = convertedVideos[convertedPath]
    if (convertedModule) {
      src = convertedModule?.default ?? convertedModule
    }
  }

  const meta = mediaDescriptions[fileName] || {}

  return {
    id: fileName,
    src,
    type,
    date,
    displayDate: formatDate(date),
    label: formatLabel(rawLabel, fileName),
    description:
      meta.description ||
      `${formatLabel(rawLabel, fileName)} — теплий момент, який залишився з тобою назавжди.`,
    poster: meta.poster,
    timestamp: new Date(date).getTime(),
  }
}

const useMediaTimeline = () =>
  useMemo(() => {
    const parsedItems = Object.entries(mediaModules)
      .map(([path, mod]) => parseEntry(path, mod))
      .filter(Boolean)
      .sort((a, b) => a.timestamp - b.timestamp)

    return parsedItems
  }, [])

export default useMediaTimeline
