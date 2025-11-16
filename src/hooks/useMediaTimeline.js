import { useMemo } from 'react'

import sleighRidePoster from '../assets/BirthdayPhotoAndVid/2014-12-24_snow-fun.jpg'
import robotBuildPoster from '../assets/BirthdayPhotoAndVid/2015-04-02_robot-club.jpg'
import starPerformancePoster from '../assets/BirthdayPhotoAndVid/2018-11-20_science-fair.jpg'

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp']
const videoExtensions = ['mp4', 'webm', 'mov']

// Усі фото
const mediaModules = import.meta.glob(
  '../assets/BirthdayPhotoAndVid/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
  },
)

// Усі конвертовані відео
const convertedVideos = import.meta.glob(
  '../assets/BirthdayPhotoAndVid/converted/*.mp4',
  {
    eager: true,
  },
)

const allMediaModules = { ...mediaModules, ...convertedVideos }

// Опис, рік і порядок для кожного медіафайлу
const mediaDescriptions = {
  // 1 фото
  '2009-05-01_first-step.jpg': {
    label:
      'Свято 1 класу: щасливий першокласник у вишиванці разом з татом.',
    description:
      'Памʼятне шкільне свято першого класу: щасливий першокласник у вишиванці разом з люблячим татом перед новою сторінкою життя.',
    year: '2016',
    displayDate: '2016 рік',
    order: 1,
  },
  // 2 фото – нове: брат з мамою
  '2011-05-10_with-mom.jpg': {
    label: 'Мамині обійми та спокій брата.',
    description:
      'Теплий родинний момент: брат сидить поруч із мамою, у її обіймах відчувається безпека, турбота та справжнє домашнє тепло.',
    year: '2011',
    displayDate: '2011 рік',
    order: 2,
  },
  // 3 фото
  '2010-03-14_first-bike.jpg': {
    label:
      'Сімейна подорож: відпочинок біля озера з братом та сестрою.',
    description:
      'Теплий спогад про сімейну подорож: відпочинок біля спокійного озера разом із братом та сестрою, сміх, жарти й справжня родинна гармонія.',
    year: '2013',
    displayDate: '2013 рік',
    order: 3,
  },
  // 4 фото
  '2011-09-01_first-school-day.jpg': {
    label: 'Відпочинок у санаторії «Квітка полонини», Закарпаття.',
    description:
      'Затишний відпочинок у санаторії «Квітка полонини» в Закарпатті: свіже гірське повітря, красиві краєвиди та час, проведений із найріднішими.',
    year: '2013',
    displayDate: '2013 рік',
    order: 4,
  },
  // 1 відео
  '2011-12-10_sleigh-ride.mp4': {
    label:
      'Країна потребує майбутніх захисників: виставка зброї в місті Мукачево.',
    description:
      'Виставка військової техніки та зброї в місті Мукачево: цікаві експонати, жива історія та перші думки про силу і захист своєї країни.',
    year: '2011',
    displayDate: '2011 рік',
    poster: sleighRidePoster,
    order: 5,
  },
  // 5 фото
  '2012-06-18_family-trip.jpg': {
    label: 'Перші кроки до спорту разом із старшою сестрою.',
    description:
      'Перші впевнені кроки до спорту поруч зі старшою сестрою: підтримка, мотивація та щира дитяча радість від руху й гри.',
    year: '2012',
    displayDate: '2012 рік',
    order: 6,
  },
  // 6 фото
  '2013-07-15_sea-trip.jpg': {
    label:
      'Шопінг по-дитячому: весела подорож за покупками із сестрою.',
    description:
      'Дитячий шопінг перетворюється на пригоду: весела подорож за покупками із сестрою, пакети, усмішки й невеликі приємні сюрпризи.',
    year: '2012',
    displayDate: '2012 рік',
    order: 7,
  },
  // 2 відео
  '2014-05-22_robot-build.mp4': {
    label:
      'Наш сімейний дует: змагання зі співом із старшим братом.',
    description:
      'Сімейний дует на сцені: змагання зі співом із старшим братом, хвилювання перед виступом, оплески глядачів і відчуття справжньої творчої єдності.',
    year: '2011',
    displayDate: '2011 рік',
    poster: robotBuildPoster,
    order: 8,
  },
  // 7 фото
  '2015-04-02_robot-club.jpg': {
    label:
      'Дитинство — це коли язик наперед, а посмішка до вух.',
    description:
      'Непосидюче дитинство: кумедний вираз обличчя, язик наперед, посмішка до вух і жодних турбот — лише гра та щирий сміх.',
    year: '2011',
    displayDate: '2011 рік',
    order: 9,
  },
  // 8 фото
  '2016-08-20_summer-camp.jpg': {
    label:
      'Усмішка, що зігріває серце — щастя багато не буває.',
    description:
      'Тепла, сонячна усмішка, яка зігріває серця рідних: ще один доказ того, що щастя в дитинстві справді ніколи не буває забагато.',
    year: '2011',
    displayDate: '2011 рік',
    order: 10,
  },
  // 9 фото
  '2017-10-31_space-costume.jpg': {
    label:
      'Новорічне свято в садочку — перший Новий рік із братом та сестрою.',
    description:
      'Казкове новорічне свято в садочку: перший спільний Новий рік разом із братом та сестрою, ялинка, подарунки та відчуття дива навколо.',
    year: '2011',
    displayDate: '2011 рік',
    order: 11,
  },
  // 3 відео
  '2018-06-30_star-performance.mp4': {
    label:
      'Є час збирати каміння й час розкидати: забава зі старшим братом на річці.',
    description:
      'Весела гра на березі річки: є час збирати каміння й час розкидати його у воду разом зі старшим братом, бризки, сміх і безтурботні літні миті.',
    year: '2011',
    displayDate: '2011 рік',
    poster: starPerformancePoster,
    order: 12,
  },
  // 10 фото
  '2018-11-20_science-fair.jpg': {
    label:
      'Щасливе дитинство поруч із бабусями — наш родинний зв’язок.',
    description:
      'Затишні миті поряд із бабусями: теплі обійми, мудрі історії та справжній родинний звʼязок, що дарує відчуття захищеності й любові.',
    year: '2011',
    displayDate: '2011 рік',
    order: 13,
  },
  // 11 фото
  '2019-09-05_first-goal.jpg': {
    label: 'Зимові снігові забави на санчатах.',
    description:
      'Зимові пригоди на санчатах: сміх, холодні щічки, сніг під ногами та шлейф яскравих спогадів про дитячі снігові забави.',
    year: '2011',
    displayDate: '2011 рік',
    order: 14,
  },
  // 6 фото – має бути в кінці
  '2014-12-24_snow-fun.jpg': {
    label:
      'Щасливий дитячий погляд та щира усмішка, відкритий до всесвіту гарна посмішка.',
    description:
      'Щирий дитячий погляд і відкрита до всесвіту усмішка: чиста радість, довіра до світу й тепло, яке відчувається в кожній рисі обличчя.',
    year: '2011',
    displayDate: '2011 рік',
    order: 15,
  },
}

const formatLabel = (raw, fileName) => {
  const meta = mediaDescriptions[fileName]
  if (meta?.label) return meta.label

  return raw
    .split(/[-_]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const parseEntry = (filePath, module) => {
  const fileName = filePath.split('/').pop()
  if (!fileName) return null

  // Для відео з суфіксом -converted.mp4 беремо «оригінальну» назву файлу
  const originalFileName = fileName.replace('-converted.mp4', '.mp4')

  const match = originalFileName.match(
    /^(\d{4}-\d{2}-\d{2})[_-](.+)\.(\w+)$/i,
  )
  if (!match) return null

  const [, date, rawLabel, ext] = match
  const extension = ext.toLowerCase()

  const type = imageExtensions.includes(extension)
    ? 'image'
    : videoExtensions.includes(extension)
      ? 'video'
      : null

  if (!type) return null

  const src = module?.default ?? module
  const meta = mediaDescriptions[originalFileName] || {}

  const yearFromDate = date?.split('-')[0]
  const year = meta.year || yearFromDate
  const displayDate = meta.displayDate || (year ? `${year} рік` : '??.??.????')
  const sortOrder =
    typeof meta.order === 'number' ? meta.order : new Date(date).getTime()

  const label = formatLabel(rawLabel, originalFileName)

  return {
    id: originalFileName,
    src,
    type,
    date,
    year,
    displayDate,
    label,
    description: meta.description || label,
    poster: meta.poster,
    timestamp: new Date(date).getTime(),
    sortOrder,
  }
}

const useMediaTimeline = () =>
  useMemo(() => {
    const parsedItems = Object.entries(allMediaModules)
      .map(([path, mod]) => parseEntry(path, mod))
      .filter(Boolean)
      .sort((a, b) => a.sortOrder - b.sortOrder)

    return parsedItems
  }, [])

export default useMediaTimeline
