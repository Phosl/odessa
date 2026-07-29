import type {RouteKey} from '@/i18n/routing'
import type {EditorialImageCredits} from '@/lib/content/editorial-images'
import {BrandLogo} from '@/components/brand/BrandLogo'
import {ImageCreditsDialog, type ImageCreditsLabels} from '@/components/layout/ImageCreditsDialog'
import {TransitionLink} from '@/components/transitions/TransitionLink'
import styles from './Layout.module.css'

type FooterItem = {route: RouteKey; href: string; label: string}

export function SiteFooter({brand, statement, navigation, legal, credits, labels}: {
  brand: string
  statement: string
  navigation: FooterItem[]
  legal: FooterItem[]
  credits: EditorialImageCredits
  labels: {project: string; legal: string; navigation: string; copyright: string; credits: ImageCreditsLabels}
}) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div>
            <BrandLogo alt={brand} className={styles.footerLogo} />
            <p className={styles.footerStatement}>{statement}</p>
          </div>
          <div className={styles.footerColumns}>
            <nav aria-label={`${labels.navigation}: ${labels.project}`}>
              <h2>{labels.project}</h2>
              {navigation.map((item) => <TransitionLink destinationLabel={item.label} href={item.href} key={item.route}>{item.label}</TransitionLink>)}
            </nav>
            <nav aria-label={`${labels.navigation}: ${labels.legal}`}>
              <h2>{labels.legal}</h2>
              {legal.map((item) => <TransitionLink destinationLabel={item.label} href={item.href} key={item.route}>{item.label}</TransitionLink>)}
            </nav>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>{labels.copyright}</span>
          <ImageCreditsDialog credits={credits} labels={labels.credits} />
        </div>
      </div>
    </footer>
  )
}
