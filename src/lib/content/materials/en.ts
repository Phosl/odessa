import type {MaterialsContent} from '../types'

const materials = {
  lead: {
    eyebrow: 'Visual identity · working materials',
    title: 'Four directions, one shared language.',
    intro: 'The proposals are organized to make mark, colour, graphic system and project voice easy to compare before a final direction is selected.',
  },
  indexLabel: 'Identity materials index',
  logos: {
    title: 'Logo concepts',
    intro: 'Four concepts explore the relationship between heritage, cooperation, place and opportunity. Each retains an institutional character while developing a distinct metaphor.',
  },
  colors: {
    title: 'Palettes and colour directions',
    intro: 'Blue, yellow and grey form the common base. Variations range from a direct reference to the Ukrainian flag to interpretations inspired by the sea, gold and Odessa’s landscape.',
    note: 'RGB values sampled from the PDF boards. They should be validated against the source files and converted to the required print profiles before production.',
  },
  elements: {
    title: 'Graphic elements and icons',
    intro: 'Each symbol can work independently from the wordmark as a social icon, section marker, pattern, indicator or transition device.',
  },
  voice: {
    title: 'Claims and tone of voice',
    intro: 'The proposals move between two complementary narratives: protecting heritage and turning knowledge into skills, work and future opportunity.',
    principlesTitle: 'Voice principles',
    principles: [
      'Concrete before celebratory: show actions, skills and results.',
      'Cooperative and equal: describe shared work without a charitable tone.',
      'Expert but accessible: use precise language and short sentences.',
      'Future-facing: connect heritage, training and opportunity.',
    ],
  },
  typographyLabel: 'Typographic directions',
  source: {
    label: 'Open the complete document',
    meta: 'PDF · 6 pages · original document',
    note: 'Exploratory material for discussion and selection. Mark, typefaces and palettes should not yet be considered final.',
  },
  concepts: [
    {
      id: 'stratigraphy',
      number: '01',
      title: 'Stratigraphy and Ukrainian colours',
      description: 'Layered horizontal blocks recall plaster, pigment and the accumulated surfaces of restoration. A symmetrical bridge forms around a yellow centre representing shared heritage.',
      elementDescription: 'Modular bars, a central axis and circle can generate patterns, frames and sequential motion. This is the direction closest to the Odessa identity already in use.',
      image: {src: '/assets/materials/concept-01.png', alt: 'Logo concept 1 with a layered blue symbol and yellow centre', width: 1200, height: 700},
      mark: {src: '/assets/materials/mark-01.png', alt: 'Layered blue symbol with a central yellow sun', width: 280, height: 380},
      typography: ['Aglet Sans Semibold', 'Helvetica Neue Medium'],
      palette: [
        {name: 'Ukrainian blue', hex: '#009FE3'},
        {name: 'Sun yellow', hex: '#FFEE00'},
        {name: 'Neutral grey', hex: '#878787'},
      ],
      claims: ['Restoring Together.', 'Knowledge that connects.', 'Heritage as a common language.', 'Cooperating to conserve.'],
    },
    {
      id: 'sea-arch',
      number: '02',
      title: 'The O as an arch, the sea as context',
      description: 'Two golden curves rise from an institutional blue field. The mark combines the Black Sea, the memory of an anchor and a bridge connecting shores, cultures and skills.',
      elementDescription: 'The rising curve suggests direction and growth; the square provides a stable frame for icons, numbering and photographic windows.',
      image: {src: '/assets/materials/concept-02.png', alt: 'Logo concept 2 with a golden arch on a blue field', width: 1120, height: 840},
      mark: {src: '/assets/materials/mark-02.png', alt: 'Blue square icon with two golden curves', width: 300, height: 380},
      typography: ['Bodoni 72 Bold', 'Brandon Grotesque'],
      palette: [
        {name: 'Institutional blue', hex: '#1D71B8'},
        {name: 'Sea blue', hex: '#36A9E1'},
        {name: 'Warm gold', hex: '#F9B234'},
        {name: 'Neutral grey', hex: '#878787'},
      ],
      claims: ['Heritage creates opportunities.', 'Skills for Heritage. Jobs for the Future.', 'Culture. Skills. Future.', 'Knowledge that creates work.'],
    },
    {
      id: 'open-path',
      number: '03',
      title: 'The O as a path, the tricolour as presence',
      description: 'An open O projects towards the horizon like a path without a fixed endpoint. The tricolour band discreetly signs the Italian presence while yellow indicates energy and direction.',
      elementDescription: 'The open circle, perspective and diagonal band create a dynamic vocabulary for arrows, routes, maps and progress indicators.',
      image: {src: '/assets/materials/concept-03.png', alt: 'Logo concept 3 with an open O, tricolour band and yellow direction', width: 1160, height: 760},
      mark: {src: '/assets/materials/mark-03.png', alt: 'Open blue O crossed by a tricolour and yellow band', width: 350, height: 380},
      typography: ['Brandon Grotesque', 'Brandon Grotesque Medium'],
      palette: [
        {name: 'Institutional blue', hex: '#1D71B8'},
        {name: 'Sea blue', hex: '#36A9E1'},
        {name: 'Direction yellow', hex: '#FCEA10'},
        {name: 'Neutral grey', hex: '#878787'},
      ],
      claims: ['Knowledge for heritage conservation.', 'Cultural heritage, skills, future.', 'Conservation and training for sustainable development.'],
    },
    {
      id: 'anchor-bridge',
      number: '04',
      title: 'The sea, the anchor, the bridge',
      description: 'The O becomes a narrative container: an arch faces an essential sea, while the city name in Cyrillic establishes geographic belonging. The circle communicates continuity and care.',
      elementDescription: 'Arch, waves and circular perimeter create a recognizable seal for stamps, badges, institutional icons and signage.',
      image: {src: '/assets/materials/concept-04.png', alt: 'Logo concept 4 with an arch, waves and Odesa in Cyrillic', width: 1120, height: 880},
      mark: {src: '/assets/materials/mark-04.png', alt: 'Blue and orange circular seal with arch and waves', width: 350, height: 420},
      typography: ['Skia Bold', 'Brandon Grotesque'],
      palette: [
        {name: 'Institutional blue', hex: '#1D71B8'},
        {name: 'Sea blue', hex: '#36A9E1'},
        {name: 'Warm orange', hex: '#F9B234'},
        {name: 'Neutral grey', hex: '#878787'},
      ],
      claims: ['Restoring Heritage. Building Futures.', 'Conserve heritage. Build the future.', 'Heritage creates opportunities.'],
    },
  ],
} satisfies MaterialsContent

export default materials
