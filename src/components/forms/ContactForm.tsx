'use client'

import {useRef, useState, type FormEvent} from 'react'
import styles from './ContactForm.module.css'

type FieldName = 'name' | 'email' | 'message' | 'consent'
type Errors = Partial<Record<FieldName, string>>

export function ContactForm({labels}: {
  labels: {
    name: string
    email: string
    organization: string
    message: string
    consent: string
    submit: string
    submitting: string
    successTitle: string
    successMessage: string
    sendAnother: string
    errorSummary: string
    errors: Record<FieldName, string>
  }
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name) nextErrors.name = labels.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = labels.errors.email
    if (message.length < 10) nextErrors.message = labels.errors.message
    if (data.get('consent') !== 'yes') nextErrors.consent = labels.errors.consent
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }

    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setSubmitting(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className={styles.success} aria-live="polite" data-testid="form-success">
        <h3>{labels.successTitle}</h3>
        <p>{labels.successMessage}</p>
        <button className="button-control" onClick={() => {setSuccess(false); setErrors({})}} type="button">{labels.sendAnother}</button>
      </div>
    )
  }

  return (
    <form className={styles.form} noValidate onSubmit={submit} ref={formRef}>
      {Object.keys(errors).length ? <p className={styles.summary} role="alert">{labels.errorSummary}</p> : null}
      <div className={styles.row}>
        <Field error={errors.name} id="name" label={labels.name}>
          <input aria-describedby={errors.name ? 'name-error' : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" id="name" name="name" />
        </Field>
        <Field error={errors.email} id="email" label={labels.email}>
          <input aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" id="email" inputMode="email" name="email" type="email" />
        </Field>
      </div>
      <Field id="organization" label={labels.organization}>
        <input autoComplete="organization" id="organization" name="organization" />
      </Field>
      <Field error={errors.message} id="message" label={labels.message}>
        <textarea aria-describedby={errors.message ? 'message-error' : undefined} aria-invalid={Boolean(errors.message)} id="message" name="message" />
      </Field>
      <label className={styles.consent}>
        <input aria-describedby={errors.consent ? 'consent-error' : undefined} aria-invalid={Boolean(errors.consent)} name="consent" type="checkbox" value="yes" />
        <span>{labels.consent}</span>
      </label>
      {errors.consent ? <p className={styles.error} id="consent-error">{errors.consent}</p> : null}
      <button className={`button-control ${styles.submit}`} disabled={submitting} type="submit">{submitting ? labels.submitting : labels.submit}</button>
    </form>
  )
}

function Field({id, label, error, children}: {id: string; label: string; error?: string; children: React.ReactNode}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <p className={styles.error} id={`${id}-error`}>{error}</p> : null}
    </div>
  )
}
