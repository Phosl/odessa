import type {RouteKey} from '@/i18n/routing'
import {BrandLogo} from '@/components/brand/BrandLogo'
import {TransitionLink} from '@/components/transitions/TransitionLink'
import styles from './Layout.module.css'

type FooterItem = {route: RouteKey; href: string; label: string}

export function SiteFooter({brand, statement, navigation, legal, labels}: {
  brand: string
  statement: string
  navigation: FooterItem[]
  legal: FooterItem[]
  labels: {project: string; legal: string; navigation: string; copyright: string}
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
        <div className={styles.footerBottom}>{labels.copyright}</div>
      </div>
    </footer>
  )
}
