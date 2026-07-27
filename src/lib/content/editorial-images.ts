import type {EditorialImage} from './types'

type ImageSource = Omit<EditorialImage, 'alt'>

export const editorialImages = {
  opera: {
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
    src: '/assets/photos/odesa-port.jpg',
    width: 1920,
    height: 1280,
    author: 'Jan Wolanski',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Odessa_Sea_Port_Jpg_(143580307).jpeg',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    objectPosition: '50% 55%',
  },
} as const satisfies Record<string, ImageSource>

export function withLocalizedAlt(image: ImageSource, alt: string): EditorialImage {
  return {...image, alt}
}
