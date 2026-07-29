import type {EditorialImage, SiteContent} from './types'

type LicensedImageSource = Omit<Extract<EditorialImage, {provenance: 'licensed'}>, 'alt' | 'caption'>
type GeneratedImageSource = Omit<Extract<EditorialImage, {provenance: 'generated'}>, 'alt' | 'caption'>
type ImageSource = LicensedImageSource | GeneratedImageSource
type LicensedEditorialImage = Extract<EditorialImage, {provenance: 'licensed'}>

export type EditorialImageCredits = {
  licensed: Array<Pick<LicensedEditorialImage, 'src' | 'caption' | 'author' | 'sourceUrl' | 'license' | 'licenseUrl'>>
  hasGenerated: boolean
}

export const editorialImages = {
  opera: {
    provenance: 'licensed',
    src: '/assets/photos/odesa-opera.jpg',
    width: 1920,
    height: 1303,
    author: 'Posterrr',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Odesa_Opera_and_Ballet_Theatre_(Panorama-4).jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    objectPosition: '50% 58%',
  },
  coast: {
    provenance: 'licensed',
    src: '/assets/photos/odesa-coast.jpg',
    width: 1920,
    height: 1440,
    author: 'Юлія Рядченко',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Odesa_Black_Sea_coast.jpg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    objectPosition: '50% 58%',
  },
  passage: {
    provenance: 'licensed',
    src: '/assets/photos/odesa-passage.jpg',
    width: 1920,
    height: 1080,
    author: 'Сіліч Марія',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Odessa_Passage.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    objectPosition: '48% 50%',
  },
  stairs: {
    provenance: 'licensed',
    src: '/assets/photos/odesa-stairs.jpg',
    width: 1920,
    height: 1440,
    author: 'Oleh Kushch',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Potemkin_Stairs,_Odessa.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    objectPosition: '50% 54%',
  },
  port: {
    provenance: 'licensed',
    src: '/assets/photos/odesa-port.jpg',
    width: 1920,
    height: 1280,
    author: 'Jan Wolanski',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Odessa_Sea_Port_Jpg_(143580307).jpeg',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    objectPosition: '50% 55%',
  },
  artMuseum: {
    provenance: 'licensed',
    src: '/assets/photos/odesa-art-museum-interior.jpg',
    width: 1920,
    height: 1440,
    author: 'Adrian1111',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Interior_of_Odesa_Fine_Arts_Museum.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    objectPosition: '50% 48%',
  },
  sunnyDay: {
    provenance: 'licensed',
    src: '/assets/photos/emile-claus-sunny-day.jpg',
    width: 900,
    height: 705,
    author: 'Émile Claus',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Emile_Claus,_Sunny_Day,_1895,_oil_on_canvas,_65,5_x_81,6_cm,_Odesa_Museum_of_Western_and_Eastern_Art,_inv._no._%D0%97%D0%96-123.jpg',
    license: 'Public Domain Mark 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    objectPosition: '50% 50%',
  },
  frescoRestoration: {
    provenance: 'licensed',
    src: '/assets/photos/fresco-restoration-mnac.jpg',
    width: 1920,
    height: 1280,
    author: 'Joe Mabel',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Restoration_work_on_the_frescos_of_Sant_Climent_de_Ta%C3%BCll_01.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    objectPosition: '51% 48%',
  },
  restorationPlaster: {
    provenance: 'generated',
    src: '/assets/photos/restoration-plaster-concept.jpg',
    width: 1536,
    height: 1024,
    objectPosition: '50% 50%',
  },
  conservationMaterials: {
    provenance: 'generated',
    src: '/assets/photos/conservation-materials-concept.jpg',
    width: 1254,
    height: 1254,
    objectPosition: '50% 50%',
  },
  restorationFresco: {
    provenance: 'generated',
    src: '/assets/editorial/generated-fresco-detail.jpg',
    width: 1672,
    height: 941,
    objectPosition: '50% 50%',
  },
  restorationMaterials: {
    provenance: 'generated',
    src: '/assets/editorial/generated-pigment-archive.jpg',
    width: 1672,
    height: 941,
    objectPosition: '50% 50%',
  },
  restorationWorkshop: {
    provenance: 'generated',
    src: '/assets/editorial/generated-conservation-workshop.jpg',
    width: 1672,
    height: 941,
    objectPosition: '50% 45%',
  },
  restorationTeam: {
    provenance: 'generated',
    src: '/assets/editorial/generated-restoration-team.jpg',
    width: 1672,
    height: 941,
    objectPosition: '50% 42%',
  },
  artInstallation: {
    provenance: 'generated',
    src: '/assets/editorial/generated-art-installation.jpg',
    width: 1672,
    height: 941,
    objectPosition: '50% 50%',
  },
  contemporaryHeritageArt: {
    provenance: 'generated',
    src: '/assets/editorial/generated-contemporary-heritage-art.jpg',
    width: 1536,
    height: 1024,
    objectPosition: '50% 50%',
  },
} as const satisfies Record<string, ImageSource>

export function withLocalizedAlt(image: ImageSource, alt: string, caption = alt): EditorialImage {
  return {...image, alt, caption}
}

export const localizeEditorialImage = withLocalizedAlt

function isEditorialImage(value: unknown): value is EditorialImage {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    (candidate.provenance === 'licensed' || candidate.provenance === 'generated')
    && typeof candidate.src === 'string'
    && typeof candidate.alt === 'string'
    && typeof candidate.caption === 'string'
  )
}

export function collectEditorialImageCredits(content: SiteContent): EditorialImageCredits {
  const licensed = new Map<string, EditorialImageCredits['licensed'][number]>()
  let hasGenerated = false

  function visit(value: unknown) {
    if (isEditorialImage(value)) {
      if (value.provenance === 'generated') {
        hasGenerated = true
      } else if (!licensed.has(value.src)) {
        licensed.set(value.src, {
          src: value.src,
          caption: value.caption,
          author: value.author,
          sourceUrl: value.sourceUrl,
          license: value.license,
          licenseUrl: value.licenseUrl,
        })
      }
      return
    }

    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }

    if (value && typeof value === 'object') {
      Object.values(value).forEach(visit)
    }
  }

  visit(content)
  return {licensed: [...licensed.values()], hasGenerated}
}
