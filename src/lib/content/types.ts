export type PageLead = {
  eyebrow: string
  title: string
  intro: string
}

export type TextSection = {
  title: string
  paragraphs: string[]
  items?: string[]
}

export type TimelineItem = {
  marker: string
  title: string
  text: string
}

type EditorialImageBase = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  objectPosition?: string
}

export type EditorialImage = EditorialImageBase & ({
  provenance: 'licensed'
  author: string
  sourceUrl: string
  license: string
  licenseUrl: string
} | {
  provenance: 'generated'
})

export type Activity = {
  id: string
  number: string
  category: string
  title: string
  summary: string
  date: string
  image: EditorialImage
}

export type Partner = {
  id: string
  name: string
  type: string
  role: string
}

export type Stat = {
  value: number
  label: string
  detail: string
  visual: 'participants' | 'sessions' | 'prototypes' | 'network'
}

export type ResultsTimelinePoint = {
  id: string
  label: string
  date: string
  participants: number
  sessions: number
  prototypes: number
  organizations: number
}

export type ResultsTimelineContent = {
  title: string
  intro: string
  note: string
  controlLabel: string
  metrics: {
    participants: string
    sessions: string
    prototypes: string
    organizations: string
  }
  items: ResultsTimelinePoint[]
}

export type Resource = {
  id: string
  type: string
  title: string
  description: string
}

export type NewsItem = {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
}

export const videoPillCategoryIds = ['discover', 'learning', 'voices', 'behindScenes'] as const
export type VideoPillCategoryId = (typeof videoPillCategoryIds)[number]

export type VideoPillAttachment = {
  id: string
  title: string
  format: string
  meta: string
  href?: string
}

export type VideoPill = {
  id: string
  slug: string
  number: string
  category: VideoPillCategoryId
  featured: boolean
  title: string
  summary: string
  duration: string
  body: string[]
  video: {
    embedUrl?: string
    externalUrl?: string
  }
  attachments: VideoPillAttachment[]
}

export type GalleryItem = {
  id: string
  label: string
  ratio: 'landscape' | 'portrait' | 'square'
  image?: EditorialImage
}

export type MaterialColor = {
  name: string
  hex: string
}

export type MaterialConcept = {
  id: string
  number: string
  title: string
  description: string
  elementDescription: string
  image: {src: string; alt: string; width: number; height: number}
  mark: {src: string; alt: string; width: number; height: number}
  typography: string[]
  palette: MaterialColor[]
  claims: string[]
}

export type MaterialsContent = {
  lead: PageLead
  tabsLabel: string
  logos: {title: string; intro: string}
  colors: {title: string; intro: string; note: string}
  elements: {title: string; intro: string}
  voice: {
    title: string
    intro: string
    principlesTitle: string
    principles: string[]
  }
  typographyLabel: string
  source: {label: string; meta: string; note: string}
  concepts: MaterialConcept[]
}

export type SiteContent = {
  home: {
    lead: PageLead
    heroImage: EditorialImage
    project: TextSection & {image: EditorialImage}
    culture: TextSection & {images: EditorialImage[]}
    activities: TextSection
    results: TextSection
    partners: TextSection
    media: TextSection & {image: EditorialImage}
    videoPills: TextSection
    contact: TextSection
  }
  project: {
    lead: PageLead
    context: TextSection
    objectives: TextSection
    methodology: TextSection
    audiences: TextSection
    timelineTitle: string
    timeline: TimelineItem[]
    images: EditorialImage[]
  }
  activities: {
    lead: PageLead
    items: Activity[]
    calendar: TextSection
    timeline: TimelineItem[]
  }
  partners: {
    lead: PageLead
    items: Partner[]
    collaboration: TextSection
  }
  results: {
    lead: PageLead
    indicators: {title: string; intro: string}
    stats: Stat[]
    timeline: ResultsTimelineContent
    deliverables: TextSection
    resourcesTitle: string
    resourcesIntro: string
    resources: Resource[]
    media: TextSection & {images: EditorialImage[]}
  }
  media: {
    lead: PageLead
    featured: TextSection & {videoLabel: string}
    archiveTitle: string
    archiveIntro: string
    news: NewsItem[]
    gallery: GalleryItem[]
  }
  videoPills: {
    lead: PageLead
    seriesTitle: string
    seriesIntro: string
    platformLabel: string
    categories: Array<{id: VideoPillCategoryId; label: string}>
    items: VideoPill[]
  }
  materials: MaterialsContent
  contact: {
    lead: PageLead
    detailsTitle: string
    details: Array<{label: string; value: string}>
    formTitle: string
    formIntro: string
  }
  privacy: {
    lead: PageLead
    notice: string
    sections: TextSection[]
  }
  cookie: {
    lead: PageLead
    notice: string
    sections: TextSection[]
  }
}
