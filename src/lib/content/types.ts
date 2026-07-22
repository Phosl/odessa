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

export type Activity = {
  id: string
  number: string
  category: string
  title: string
  summary: string
  date: string
  imageLabel: string
}

export type Partner = {
  id: string
  name: string
  type: string
  role: string
}

export type Stat = {
  value: string
  label: string
  detail: string
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

export type GalleryItem = {
  id: string
  label: string
  ratio: 'landscape' | 'portrait' | 'square'
}

export type SiteContent = {
  home: {
    lead: PageLead
    videoLabel: string
    project: TextSection & {imageLabel: string}
    activities: TextSection
    results: TextSection
    partners: TextSection
    media: TextSection & {imageLabel: string}
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
    imageLabel: string
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
    stats: Stat[]
    deliverables: TextSection
    resourcesTitle: string
    resourcesIntro: string
    resources: Resource[]
    media: TextSection & {mediaLabel: string}
  }
  media: {
    lead: PageLead
    featured: TextSection & {videoLabel: string}
    archiveTitle: string
    archiveIntro: string
    news: NewsItem[]
    gallery: GalleryItem[]
  }
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
