'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import type {AnchorHTMLAttributes, MouseEvent, ReactNode} from 'react'
import {usePageTransition} from './PageTransitionProvider'

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  destinationLabel: string
  replace?: boolean
  children: ReactNode
}

export function TransitionLink({href, destinationLabel, replace, children, onClick, ...props}: TransitionLinkProps) {
  const pathname = usePathname()
  const {navigate} = usePageTransition()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    const destination = new URL(event.currentTarget.href, window.location.href)
    const sameDocumentAnchor = destination.pathname === window.location.pathname && Boolean(destination.hash)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      props.download || props.target === '_blank' ||
      destination.origin !== window.location.origin ||
      sameDocumentAnchor ||
      (destination.pathname === pathname && destination.search === window.location.search) ||
      document.documentElement.classList.contains('is-transitioning')
    ) return

    event.preventDefault()
    navigate({href: destination.href, label: destinationLabel, replace})
  }

  return <Link href={href} onClick={handleClick} {...props}>{children}</Link>
}
