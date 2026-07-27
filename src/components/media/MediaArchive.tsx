'use client'

import {useLayoutEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import type {GalleryItem, NewsItem} from '@/lib/content/types'
import {NewsCard} from '@/components/sections/Cards'
import {EditorialPhoto, ImagePlaceholder, VideoPlaceholder} from '@/components/wireframe/Wireframe'
import styles from './MediaArchive.module.css'

type Filter = 'all' | 'news' | 'photo' | 'video'

export function MediaArchive({news, gallery, featured, labels}: {
  news: NewsItem[]
  gallery: GalleryItem[]
  featured: {title: string; intro: string; videoText: string; videoDescription: string}
  labels: {
    filter: string
    all: string
    news: string
    photo: string
    video: string
    empty: string
    imageTemplate: string
    imageDescriptionTemplate: string
  }
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const archiveRef = useRef<HTMLDivElement>(null)
  const options: Array<{value: Filter; label: string}> = [
    {value: 'all', label: labels.all},
    {value: 'news', label: labels.news},
    {value: 'photo', label: labels.photo},
    {value: 'video', label: labels.video},
  ]
  const showVideo = filter === 'all' || filter === 'video'
  const showNews = filter === 'all' || filter === 'news'
  const showPhotos = filter === 'all' || filter === 'photo'

  useLayoutEffect(() => {
    const items = archiveRef.current?.children
    if (!items || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(items, {opacity: 0, y: 12}, {opacity: 1, y: 0, stagger: 0.035, duration: 0.32, ease: 'power2.out', clearProps: 'opacity,transform'})
  }, [filter])

  return (
    <div>
      <div className={styles.filters} aria-label={labels.filter} role="group">
        {options.map((option) => (
          <button aria-pressed={filter === option.value} key={option.value} onClick={() => setFilter(option.value)} type="button">{option.label}</button>
        ))}
      </div>
      <div className={styles.archive} ref={archiveRef} aria-live="polite">
        {showVideo ? (
          <article className={styles.featured}>
            <div className={styles.featuredCopy}><h3>{featured.title}</h3><p className="body-copy">{featured.intro}</p></div>
            <VideoPlaceholder description={featured.videoDescription} label={featured.videoText} />
          </article>
        ) : null}
        {showNews ? news.map((item) => <NewsCard item={item} key={item.id} />) : null}
        {showPhotos ? gallery.map((item, index) => (
          <div className={styles.galleryItem} data-gallery-item key={item.id}>
            {item.image ? (
              <EditorialPhoto
                image={item.image}
                ratio={item.ratio}
                sizes="(min-width: 72rem) 24rem, (min-width: 48rem) 45vw, calc(100vw - 2rem)"
              />
            ) : (
              <ImagePlaceholder
                description={labels.imageDescriptionTemplate.replace('{number}', String(index + 1).padStart(2, '0')) + `: ${item.label}`}
                label={labels.imageTemplate.replace('{number}', String(index + 1).padStart(2, '0'))}
                ratio={item.ratio}
              />
            )}
          </div>
        )) : null}
        {!showVideo && !showNews && !showPhotos ? <p className={styles.empty}>{labels.empty}</p> : null}
      </div>
    </div>
  )
}
