import Image from 'next/image'

type BrandLogoProps = {
  alt: string
  className?: string
  priority?: boolean
}

export function BrandLogo({alt, className, priority = false}: BrandLogoProps) {
  return (
    <Image
      alt={alt}
      className={className}
      height={184}
      priority={priority}
      src="/assets/odessa_logo.svg"
      width={564}
    />
  )
}
