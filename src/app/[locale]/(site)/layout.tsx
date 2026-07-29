import type {ReactNode} from 'react'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref, type RouteKey} from '@/i18n/routing'
import {PageTransitionProvider} from '@/components/transitions/PageTransitionProvider'
import {SiteHeader} from '@/components/layout/SiteHeader'
import {SiteFooter} from '@/components/layout/SiteFooter'
import {CookieBanner} from '@/components/layout/CookieBanner'
import {collectEditorialImageCredits} from '@/lib/content/editorial-images'
import {getSiteContent} from '@/lib/content/repository'

const mainRoutes: RouteKey[] = ['home', 'project', 'activities', 'partners', 'results', 'media', 'materials', 'contact']
const legalRoutes: RouteKey[] = ['privacy', 'cookie']

export default async function SiteLayout({children, params}: {children: ReactNode; params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [t, content] = await Promise.all([getTranslations(), getSiteContent(locale)])
  const credits = collectEditorialImageCredits(content)
  const navigation = mainRoutes.map((route) => ({route, href: getRouteHref(route, locale), label: t(`navigation.${route}`)}))
  const videoPillsLink = {route: 'videoPills' as const, href: getRouteHref('videoPills', locale), label: t('navigation.videoPills')}
  const legal = legalRoutes.map((route) => ({route, href: getRouteHref(route, locale), label: t(`navigation.${route}`)}))
  const languages = [
    {locale: 'it' as const, short: 'IT', label: t('common.languageIt')},
    {locale: 'en' as const, short: 'EN', label: t('common.languageEn')},
    {locale: 'uk' as const, short: 'UKR', label: t('common.languageUk')},
  ]

  return (
    <PageTransitionProvider announcement={t.raw('common.pageOpened')} openingAnnouncement={t.raw('common.pageOpening')}>
      <a className="skip-link" href="#main-content">{t('common.skip')}</a>
      <SiteHeader
        brand={t('common.brand')}
        labels={{primary: t('common.primaryNavigation'), mobile: t('common.mobileNavigation'), language: t('common.languageNavigation'), open: t('common.openMenu'), close: t('common.closeMenu')}}
        languages={languages}
        locale={locale}
        navigation={navigation}
      />
      {children}
      <SiteFooter
        brand={t('common.brand')}
        credits={credits}
        labels={{
          project: t('footer.projectLabel'),
          legal: t('footer.legalLabel'),
          navigation: t('common.footerNavigation'),
          copyright: t('footer.copyright'),
          credits: {
            button: t('footer.credits.button'),
            title: t('footer.credits.title'),
            intro: t('footer.credits.intro'),
            author: t('footer.credits.author'),
            source: t('footer.credits.source'),
            license: t('footer.credits.license'),
            generated: t('footer.credits.generated'),
            close: t('footer.credits.close'),
          },
        }}
        legal={legal}
        navigation={[...navigation.slice(1), videoPillsLink]}
        statement={t('footer.statement')}
      />
      <CookieBanner accept={t('cookie.accept')} necessary={t('cookie.necessary')} regionLabel={t('cookie.regionLabel')} text={t('cookie.text')} title={t('cookie.title')} />
    </PageTransitionProvider>
  )
}
