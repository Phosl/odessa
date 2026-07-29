import type {Locale} from '@/i18n/routing'
import {getVideoPillHref} from '@/i18n/routing'
import type {VideoPill, VideoPillCategoryId} from '@/lib/content/types'
import {TransitionLink} from '@/components/transitions/TransitionLink'
import {VideoPlaceholder} from '@/components/wireframe/Wireframe'
import styles from './VideoPills.module.css'

export function VideoPillsGrid({items, locale, categories, readLabel, videoLabelTemplate}: {
  items: VideoPill[]
  locale: Locale
  categories: Array<{id: VideoPillCategoryId; label: string}>
  readLabel: string
  videoLabelTemplate: string
}) {
  return (
    <div className={styles.grid} data-testid="video-pills-grid">
      {items.map((item) => {
        const videoLabel = videoLabelTemplate.replace('{number}', item.number)
        const categoryLabel = categories.find((category) => category.id === item.category)?.label ?? item.category

        return (
          <article className={styles.card} data-reveal key={item.id}>
            <TransitionLink
              className={styles.cardLink}
              destinationLabel={item.title}
              href={getVideoPillHref(locale, item.slug)}
            >
              <VideoPlaceholder
                description={`${item.title}. ${item.summary}`}
                label={`${videoLabel} · ${item.duration}`}
              />
              <div className={styles.copy}>
                <p className={`${styles.meta} meta`}>
                  <span>{categoryLabel}</span>
                  <span>{item.duration}</span>
                </p>
                <h3>{item.title}</h3>
                <p className="body-copy">{item.summary}</p>
                <span className={styles.read}>{readLabel}</span>
              </div>
            </TransitionLink>
          </article>
        )
      })}
    </div>
  )
}
