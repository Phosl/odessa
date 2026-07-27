import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {ContactForm} from '@/components/forms/ContactForm'
import {PageIntro, PageMain} from '@/components/wireframe/Wireframe'
import styles from '@/styles/Pages.module.css'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'contact')
}

export default async function ContactPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.contact
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="07 / 09" /></div></section>
      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.details} data-reveal>
            <h2>{page.detailsTitle}</h2>
            <dl>{page.details.map((item) => <div className={styles.detailsRow} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
          </div>
          <div className="stack" data-reveal>
            <div className={styles.formIntro}><h2>{page.formTitle}</h2><p className="body-copy">{page.formIntro}</p></div>
            <ContactForm labels={{name: t('form.name'), email: t('form.email'), organization: t('form.organization'), message: t('form.message'), consent: t('form.consent'), submit: t('form.submit'), submitting: t('form.submitting'), successTitle: t('form.successTitle'), successMessage: t('form.successMessage'), sendAnother: t('form.sendAnother'), errorSummary: t('form.errors.summary'), errors: {name: t('form.errors.name'), email: t('form.errors.email'), message: t('form.errors.message'), consent: t('form.errors.consent')}}} />
          </div>
        </div>
      </section>
    </PageMain>
  )
}
