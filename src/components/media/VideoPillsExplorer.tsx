'use client'

import {useState} from 'react'
import type {Locale} from '@/i18n/routing'
import type {VideoPill, VideoPillCategoryId} from '@/lib/content/types'
import {VideoPillsGrid} from './VideoPills'
import styles from './VideoPills.module.css'

type ActiveCategory = 'all' | VideoPillCategoryId

export function VideoPillsExplorer({items, locale, categories, labels}: {
  items: VideoPill[]
  locale: Locale
  categories: Array<{id: VideoPillCategoryId; label: string}>
  labels: {
    filter: string
    all: string
    read: string
    videoTemplate: string
  }
}) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all')
  const visibleItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <div>
      <div aria-label={labels.filter} className={styles.filters} role="group">
        <button
          aria-pressed={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          type="button"
        >
          {labels.all}
        </button>
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category.id}
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <VideoPillsGrid
          categories={categories}
          items={visibleItems}
          locale={locale}
          readLabel={labels.read}
          videoLabelTemplate={labels.videoTemplate}
        />
      </div>
    </div>
  )
}
