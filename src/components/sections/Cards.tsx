import type {Activity, NewsItem, Partner, Resource, Stat} from '@/lib/content/types'
import {ImagePlaceholder} from '@/components/wireframe/Wireframe'
import styles from './Cards.module.css'

export function ActivityCard({activity, imageText}: {activity: Activity; imageText: string}) {
  return (
    <article className={styles.card} data-reveal>
      <div className={styles.cardHeader}>
        <span className="meta">{activity.number}</span>
        <span className="meta">{activity.category}</span>
      </div>
      <div className={styles.cardBody}>
        <h3>{activity.title}</h3>
        <p className="body-copy">{activity.summary}</p>
      </div>
      <div className={styles.activityMedia}>
        <ImagePlaceholder description={activity.imageLabel} label={imageText} />
      </div>
      <footer className={`${styles.cardFooter} meta`}>{activity.date}</footer>
    </article>
  )
}

export function PartnerCard({partner, logoText, logoDescription}: {partner: Partner; logoText: string; logoDescription: string}) {
  return (
    <article className={styles.card} data-reveal>
      <div className={styles.partnerLogo} role="img" aria-label={logoDescription}>
        <span className={styles.logoMark} aria-hidden="true">{logoText}</span>
      </div>
      <div className={styles.cardBody}>
        <span className="meta">{partner.type}</span>
        <h3>{partner.name}</h3>
        <p className="body-copy">{partner.role}</p>
      </div>
    </article>
  )
}

export function ResultStat({stat}: {stat: Stat}) {
  return (
    <article className={styles.stat} data-reveal>
      <strong>{stat.value}</strong>
      <h3>{stat.label}</h3>
      <p className="body-copy">{stat.detail}</p>
    </article>
  )
}

export function ResourceCard({resource, action, unavailable}: {resource: Resource; action: string; unavailable: string}) {
  return (
    <article className={styles.resource} data-reveal>
      <span className="meta">{resource.type}</span>
      <h3>{resource.title}</h3>
      <p className="body-copy">{resource.description}</p>
      <button className={styles.disabled} disabled title={unavailable} type="button">{action} · {unavailable}</button>
    </article>
  )
}

export function NewsCard({item}: {item: NewsItem}) {
  return (
    <article className={styles.news} data-reveal>
      <div className={styles.cardHeader}>
        <span className="meta">{item.category}</span>
        <time className="meta">{item.date}</time>
      </div>
      <h3>{item.title}</h3>
      <p className="body-copy">{item.excerpt}</p>
    </article>
  )
}
