import type {SiteContent} from '../types'
import {editorialImages, localizeEditorialImage} from '../editorial-images'
import {videoPillSlugs} from '@/i18n/routing'
import materials from '../materials/en'

const content = {
  home: {
    lead: {eyebrow: 'International cooperation · 2026–2028', title: 'Different distances, common ground.', intro: 'Odessa is a demonstration project connecting communities, institutions and young professionals in Italy and Ukraine.'},
    heroImage: localizeEditorialImage(editorialImages.opera, 'The Odesa National Opera and Ballet Theatre seen from the square', 'Odesa Opera Theatre · contextual photograph'),
    project: {title: 'A platform for lasting relationships', paragraphs: ['The project combines field research, training and cultural production to turn exchange into shared tools.'], image: localizeEditorialImage(editorialImages.coast, 'Waves on the Black Sea coast in Odesa', 'Odesa Black Sea coast · contextual photograph')},
    culture: {
      title: 'Art, care and regeneration',
      paragraphs: ['Material culture becomes a place of encounter: observing, conserving and reinterpreting heritage means building shared skills and new relationships between territories.'],
      images: [
        localizeEditorialImage(editorialImages.artMuseum, 'Exhibition room inside the Odesa Fine Arts Museum', 'Odesa Fine Arts Museum · contextual photograph'),
        localizeEditorialImage(editorialImages.sunnyDay, 'Sunny Day, a painting by Émile Claus from 1895', 'Sunny Day, Émile Claus, 1895 · Odesa Museum of Western and Eastern Art'),
        localizeEditorialImage(editorialImages.frescoRestoration, 'Restoration setup for a fresco from Sant Climent de Taüll', 'Context image · fresco restoration, MNAC, Barcelona'),
      ],
    },
    activities: {title: 'Activities connecting people and skills', paragraphs: ['Six coordinated actions take the project from early research to the public sharing of results.']},
    results: {title: 'Readable, verifiable impact', paragraphs: ['Simple indicators describe participation, collaborations and materials produced throughout the programme.']},
    partners: {title: 'A multidisciplinary network', paragraphs: ['Public bodies, universities and civic organizations contribute complementary perspectives.']},
    media: {title: 'The project as it unfolds', paragraphs: ['News, images and videos document meetings, workshops and public presentations.'], image: localizeEditorialImage(editorialImages.passage, 'Architectural decorations inside the Odesa Passage', 'Odesa Passage · contextual photograph')},
    videoPills: {title: 'Short stories from the project', paragraphs: ['A series of video shorts introduces Odessa’s people, places, gestures and tools in just a few minutes.']},
    contact: {title: 'Would you like to join the journey?', paragraphs: ['Contact us to learn about upcoming activities or propose a collaboration.']},
  },
  project: {
    lead: {eyebrow: 'The project', title: 'Cooperation means designing together.', intro: 'Odessa creates an operational space where research, education and culture can generate shared answers to real needs.'},
    context: {title: 'Context', paragraphs: ['Relations between European territories need tools that are more open, accessible and able to last beyond individual events.', 'The project starts by listening to communities and builds a joint programme around the priorities that emerge.']},
    objectives: {title: 'Goals', paragraphs: ['Four goals guide every activity and the evaluation of the project.'], items: ['Strengthen local skills', 'Activate international networks', 'Produce accessible knowledge', 'Support inclusive participation']},
    methodology: {title: 'Methodology', paragraphs: ['Participatory research, co-design and field experimentation form a continuous cycle. Each phase feeds evidence into the next.'], items: ['Listen', 'Co-design', 'Experiment', 'Evaluate and share']},
    audiences: {title: 'Audiences', paragraphs: ['The programme is intended for young people, cultural workers, researchers, public administrations and civic organizations in the participating territories.']},
    timelineTitle: 'Project timeline',
    timeline: [
      {marker: '01 · 2026', title: 'Research and listening', text: 'Mapping needs and creating local groups.'},
      {marker: '02 · 2027', title: 'Exchange and workshops', text: 'Training sessions, residencies and shared prototypes.'},
      {marker: '03 · 2027', title: 'Experimentation', text: 'Testing solutions in partner contexts.'},
      {marker: '04 · 2028', title: 'Public return', text: 'Evaluation, publications and open meetings.'},
    ],
    images: [
      localizeEditorialImage(editorialImages.stairs, 'Front view of the Potemkin Stairs in Odesa', 'Potemkin Stairs · contextual photograph'),
      localizeEditorialImage(editorialImages.restorationWorkshop, 'An international group studies a decorated object together during a workshop', 'Generated editorial visual · conservation workshop'),
    ],
  },
  activities: {
    lead: {eyebrow: 'Activities', title: 'Learn, experiment, give back.', intro: 'The programme combines research, training and production to generate useful outcomes that continue beyond the project.'},
    items: [
      {id: 'research', number: '01', category: 'Research', title: 'Participatory mapping', summary: 'Interviews and working tables identify resources and needs across the territories.', date: 'September–November 2026', image: localizeEditorialImage(editorialImages.artMuseum, 'Exhibition room inside the Odesa Fine Arts Museum', 'Odesa Fine Arts Museum · contextual photograph')},
      {id: 'training', number: '02', category: 'Training', title: 'Transnational academy', summary: 'A series of modules on design, facilitation and accessible communication.', date: 'January–March 2027', image: localizeEditorialImage(editorialImages.restorationPlaster, 'Gloved hands use a fine brush on a neoclassical plaster ornament', 'Generated conceptual visual · decorative restoration')},
      {id: 'residency', number: '03', category: 'Exchange', title: 'Odessa residency', summary: 'Mixed groups work together on cases and challenges proposed by communities.', date: 'May 2027', image: localizeEditorialImage(editorialImages.passage, 'Architectural decorations inside the Odesa Passage', 'Odesa Passage · contextual photograph')},
      {id: 'labs', number: '04', category: 'Workshops', title: 'Local prototypes', summary: 'Open workshops turn ideas into tools, services and narratives.', date: 'June–October 2027', image: localizeEditorialImage(editorialImages.conservationMaterials, 'Mineral pigments, linen, tracing paper, gloves and brushes arranged on a table', 'Generated conceptual visual · conservation materials')},
      {id: 'exchange', number: '05', category: 'Mobility', title: 'Study visit in Italy', summary: 'A week of meetings with institutions, universities and civic organizations.', date: 'November 2027', image: localizeEditorialImage(editorialImages.port, 'Odesa port at sunset with a sailing boat', 'Odesa port · contextual photograph')},
      {id: 'forum', number: '06', category: 'Dissemination', title: 'Public forum', summary: 'Results, methods and perspectives are shared with an international audience.', date: 'March 2028', image: localizeEditorialImage(editorialImages.opera, 'The Odesa National Opera and Ballet Theatre seen from the square', 'Odesa Opera Theatre · contextual photograph')},
    ],
    calendar: {title: 'Essential calendar', paragraphs: ['The final calendar will be updated with venues, times and participation details.']},
    timeline: [
      {marker: 'AUT 2026', title: 'Start', text: 'Research, mapping and engagement.'},
      {marker: 'SPR 2027', title: 'Training', text: 'Academy and international residency.'},
      {marker: 'AUT 2027', title: 'Production', text: 'Workshops and study visit.'},
      {marker: 'SPR 2028', title: 'Sharing', text: 'Forum and final publication.'},
    ],
  },
  partners: {
    lead: {eyebrow: 'Partners', title: 'Different skills, shared responsibility.', intro: 'The demonstration network brings together organizations with complementary roles in research, training and local engagement.'},
    items: [
      {id: 'lead', name: 'Bridge Foundation', type: 'Lead partner · Italy', role: 'Coordination, administration and institutional relations.'},
      {id: 'civic', name: 'Civic Odessa Lab', type: 'Civic organization · Ukraine', role: 'Community engagement and coordination of local activities.'},
      {id: 'university', name: 'Adriatic University', type: 'University · Italy', role: 'Research, evaluation and methodological documentation.'},
      {id: 'culture', name: 'Culture Forward', type: 'Social enterprise · Ukraine', role: 'Cultural production and participant training.'},
      {id: 'municipality', name: 'Open City', type: 'Public body · Italy', role: 'Connection with public services and territorial networks.'},
      {id: 'network', name: 'East–West Network', type: 'European network', role: 'International dissemination and exchange of practices.'},
    ],
    collaboration: {title: 'How we collaborate', paragraphs: ['A joint committee takes strategic decisions, while mixed working groups manage activities, communication and evaluation. Documents and results follow open and accessible criteria.'], items: ['Transparent decisions', 'Distributed responsibility', 'Regular review', 'Open knowledge']},
  },
  results: {
    lead: {eyebrow: 'Results', title: 'Measure what changes.', intro: 'These demonstration figures show how Odessa will make participation, learning and collaboration capacity visible.'},
    stats: [
      {value: '180', label: 'participants', detail: 'involved in local and international activities'},
      {value: '24', label: 'training sessions', detail: 'including workshops, visits and laboratories'},
      {value: '12', label: 'prototypes', detail: 'developed and tested with communities'},
      {value: '6', label: 'organizations', detail: 'connected through a transnational network'},
    ],
    deliverables: {title: 'Results and deliverables', paragraphs: ['Final outputs will be designed for consultation, reuse and adaptation by other territories.'], items: ['Map of needs and resources', 'Facilitation toolkit', 'Open training curriculum', 'Twelve documented prototypes', 'Evaluation report', 'Bilingual media archive']},
    resourcesTitle: 'Resources',
    resourcesIntro: 'These cards preview future documents. No real file is available at this stage.',
    resources: [
      {id: 'report', type: 'PDF · Demo', title: 'Interim report', description: 'Summary of activities, learning and indicators.'},
      {id: 'toolkit', type: 'PDF · Demo', title: 'Operational toolkit', description: 'Methods and worksheets for replicating workshops.'},
      {id: 'dataset', type: 'XLSX · Demo', title: 'Indicator dataset', description: 'Demonstration structure for monitoring.'},
    ],
    media: {
      title: 'An open archive',
      paragraphs: ['The visual story complements the data with voices, process images and public materials.'],
      images: [
        localizeEditorialImage(editorialImages.port, 'Odesa port at sunset with a sailing boat', 'Odesa port · contextual photograph'),
        localizeEditorialImage(editorialImages.artInstallation, 'A blue-and-yellow contemporary installation in a historic courtyard', 'Generated editorial visual · cultural installation'),
      ],
    },
  },
  media: {
    lead: {eyebrow: 'Media', title: 'Follow the project closely.', intro: 'A demonstration archive brings together updates, images and videos produced throughout the journey.'},
    featured: {title: 'Odessa in two minutes', paragraphs: ['An introductory video will present the people, places and questions guiding the project.'], videoLabel: 'Main project video'},
    archiveTitle: 'Archive',
    archiveIntro: 'The filters work on local content and anticipate future editorial management.',
    news: [
      {id: 'kickoff', date: '12 September 2026', category: 'News', title: 'The Odessa journey begins', excerpt: 'Partners meet to define common priorities, tools and calendar.'},
      {id: 'mapping', date: '28 October 2026', category: 'Journal', title: 'The first maps from the territories', excerpt: 'Needs, resources and relationships emerge from local listening tables.'},
      {id: 'academy', date: '15 January 2027', category: 'Press release', title: 'Applications open for the Academy', excerpt: 'Thirty places for young professionals and people working in partner communities.'},
    ],
    gallery: [
      {id: 'photo-01', label: 'Odesa Fine Arts Museum', ratio: 'landscape', image: localizeEditorialImage(editorialImages.artMuseum, 'Exhibition room inside the Odesa Fine Arts Museum', 'Odesa Fine Arts Museum · contextual photograph')},
      {id: 'photo-02', label: 'Painting from the Odesa collection', ratio: 'portrait', image: localizeEditorialImage(editorialImages.sunnyDay, 'Sunny Day, a painting by Émile Claus from 1895', 'Sunny Day, Émile Claus, 1895 · Odesa Museum of Western and Eastern Art')},
      {id: 'photo-03', label: 'Pigments and conservation tools', ratio: 'square', image: localizeEditorialImage(editorialImages.restorationMaterials, 'Pigments, samples and tools arranged as a material archive', 'Generated editorial visual · pigment archive')},
      {id: 'photo-04', label: 'Fresco restoration', ratio: 'landscape', image: localizeEditorialImage(editorialImages.frescoRestoration, 'Conservation setup for a fresco from Sant Climent de Taüll', 'Context image · fresco restoration, MNAC, Barcelona')},
      {id: 'photo-05', label: 'Conservation detail', ratio: 'portrait', image: localizeEditorialImage(editorialImages.restorationFresco, 'Close view of conservation work on a painted surface', 'Generated editorial visual · fresco conservation')},
      {id: 'photo-06', label: 'Contemporary installation', ratio: 'square', image: localizeEditorialImage(editorialImages.contemporaryHeritageArt, 'Suspended material fragments with translucent blue layers and yellow light', 'Generated editorial visual · material memory')},
      {id: 'photo-07', label: 'Odesa Passage', ratio: 'landscape', image: localizeEditorialImage(editorialImages.passage, 'Architectural decorations inside the Odesa Passage', 'Odesa Passage · contextual photograph')},
      {id: 'photo-08', label: 'Potemkin Stairs', ratio: 'portrait', image: localizeEditorialImage(editorialImages.stairs, 'Front view of the Potemkin Stairs in Odesa', 'Potemkin Stairs · contextual photograph')},
    ],
  },
  videoPills: {
    lead: {eyebrow: 'Video shorts', title: 'The project, one story at a time.', intro: 'Short videos to meet the people, step inside the workshops and follow ideas and skills as they take shape.'},
    seriesTitle: 'Watch the series',
    seriesIntro: 'Six episodes serve different editorial roles: orient, teach, give people a voice and reveal the process.',
    platformLabel: 'Project video platform',
    categories: [
      {id: 'discover', label: 'Discover Odessa'},
      {id: 'learning', label: 'Learning'},
      {id: 'voices', label: 'Voices and stories'},
      {id: 'behindScenes', label: 'Behind the scenes'},
    ],
    items: [
      {
        id: 'intro', slug: videoPillSlugs.intro.en, number: '01', category: 'discover', featured: true,
        title: 'Odessa in two minutes', summary: 'The people, places and questions guiding the shared journey between Italy and Ukraine.', duration: '02:00',
        body: ['Odessa turns cooperation into a concrete experience built with communities, not simply for them.', 'This opening story introduces the territories, partners and questions that will guide research, learning and cultural production.'],
        video: {},
        attachments: [{id: 'transcript', title: 'Episode transcript', format: 'PDF', meta: 'Italian · English · Ukrainian'}],
      },
      {
        id: 'care', slug: videoPillSlugs.care.en, number: '02', category: 'learning', featured: true,
        title: 'Why care matters', summary: 'One gesture, one material and one skill reveal the value of conservation.', duration: '01:30',
        body: ['Conservation is not about freezing things in place. It means understanding materials and stories in order to accompany them through time.', 'The video observes one technical gesture and connects it to a cultural responsibility shared by professionals, institutions and citizens.'],
        video: {},
        attachments: [{id: 'learning-sheet', title: 'Learning sheet: care and conservation', format: 'PDF', meta: '4 pages'}],
      },
      {
        id: 'voices', slug: videoPillSlugs.voices.en, number: '03', category: 'voices', featured: true,
        title: 'Voices from the territories', summary: 'Different perspectives explain the needs, resources and hopes of participating communities.', duration: '02:15',
        body: ['Project priorities emerge by listening to people who live, study and work in the participating territories.', 'Their voices are not a final commentary: they become project material and guide activities, tools and evaluation criteria.'],
        video: {},
        attachments: [{id: 'voices-transcript', title: 'Testimony transcript', format: 'DOCX', meta: '3 languages'}],
      },
      {
        id: 'workshop', slug: videoPillSlugs.workshop.en, number: '04', category: 'behindScenes', featured: false,
        title: 'Inside the workshop', summary: 'Techniques, tools and dialogue turn learning into shared practice.', duration: '01:45',
        body: ['In the workshop, knowledge moves through observation, trials, errors and dialogue between different skills.', 'The camera follows the process closely to reveal what often remains invisible in the final outcome.'],
        video: {},
        attachments: [{id: 'tools', title: 'Workshop tools and materials', format: 'PDF', meta: 'Illustrated sheet'}],
      },
      {
        id: 'words', slug: videoPillSlugs.words.en, number: '05', category: 'learning', featured: false,
        title: 'Shared words', summary: 'Italian and Ukrainian terms open a small vocabulary of cooperation.', duration: '01:20',
        body: ['The words used for care, heritage and cooperation do not always align perfectly across languages and contexts.', 'Comparing them becomes a learning tool for recognising differences, equivalents and new shared meanings.'],
        video: {},
        attachments: [{id: 'glossary', title: 'Essential Italian–Ukrainian glossary', format: 'PDF', meta: 'Bilingual edition'}],
      },
      {
        id: 'outcomes', slug: videoPillSlugs.outcomes.en, number: '06', category: 'discover', featured: false,
        title: 'What remains', summary: 'Experiences, relationships and tools become accessible resources beyond the project.', duration: '02:00',
        body: ['A project ends, but it can leave methods, relationships and materials that continue to circulate.', 'This story connects measurable outputs with less visible changes: trust, autonomy and the ability to work together.'],
        video: {},
        attachments: [{id: 'outcomes-note', title: 'Expected outcomes summary', format: 'PDF', meta: 'Editorial note'}],
      },
    ],
  },
  materials,
  contact: {
    lead: {eyebrow: 'Contact', title: 'Starting new conversations.', intro: 'Use the demonstration details or form to ask about activities and collaboration opportunities.'},
    detailsTitle: 'Project contacts',
    details: [
      {label: 'Email', value: 'info@odessa-project.example'},
      {label: 'Coordination', value: 'Bridge Foundation, Italy'},
      {label: 'Operational office', value: '12 Via del Porto, 00100 Rome'},
      {label: 'Hours', value: 'Monday–Friday, 09:00–17:00'},
    ],
    formTitle: 'Write to the team',
    formIntro: 'The form is a local simulation and does not transmit or retain any data.',
  },
  privacy: {
    lead: {eyebrow: 'Privacy', title: 'Privacy notice', intro: 'A demonstration structure for describing the future processing of personal data.'},
    notice: 'Demonstration legal content to be reviewed and replaced before publication.',
    sections: [
      {title: 'Data controller', paragraphs: ['The entity named in this section is fictional and will be replaced by the actual controller.']},
      {title: 'Data and purposes', paragraphs: ['The prototype sends no data. This section will later describe collected data, purposes and legal bases.']},
      {title: 'Retention and recipients', paragraphs: ['Retention periods, providers and transfers will be documented before real services are enabled.']},
      {title: 'Rights', paragraphs: ['The final notice will explain how to exercise access, rectification, erasure and objection rights.']},
    ],
  },
  cookie: {
    lead: {eyebrow: 'Cookie Policy', title: 'Preferences and local technologies', intro: 'The prototype uses no analytics, profiling or advertising services.'},
    notice: 'Demonstration legal content to be reviewed and replaced before publication.',
    sections: [
      {title: 'What is stored', paragraphs: ['Only the odessa-consent-v1 preference is saved in the browser local storage.']},
      {title: 'Necessary cookies', paragraphs: ['No HTTP cookie is set directly by this demonstration interface.']},
      {title: 'Optional services', paragraphs: ['There are no analytics, maps, embedded videos or other third-party services.']},
      {title: 'Managing preferences', paragraphs: ['The local preference can be removed by clearing site data in the browser.']},
    ],
  },
} satisfies SiteContent

export default content
