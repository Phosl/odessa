import type {SiteContent} from '../types'
import {editorialImages, localizeEditorialImage} from '../editorial-images'
import {videoPillSlugs} from '@/i18n/routing'
import materials from '../materials/it'

const content = {
  home: {
    lead: {
      eyebrow: 'Cooperazione internazionale · 2026–2028',
      title: 'Distanze diverse, un terreno comune.',
      intro: 'Odessa è un progetto dimostrativo di collaborazione tra comunità, istituzioni e giovani professionisti in Italia e Ucraina.',
    },
    heroImage: localizeEditorialImage(editorialImages.opera, 'Il Teatro Nazionale dell’Opera e del Balletto di Odessa visto dalla piazza', 'Teatro dell’Opera di Odessa · fotografia di contesto'),
    project: {
      title: 'Una piattaforma per costruire relazioni durature',
      paragraphs: ['Il progetto unisce ricerca sul campo, formazione e produzione culturale per trasformare lo scambio in strumenti condivisi.'],
      image: localizeEditorialImage(editorialImages.coast, 'Onde sulla costa del Mar Nero a Odessa', 'Costa del Mar Nero a Odessa · fotografia di contesto'),
    },
    culture: {
      title: 'Arte, cura e rigenerazione',
      paragraphs: ['La cultura materiale diventa uno spazio di incontro: osservare, conservare e reinterpretare il patrimonio significa costruire competenze condivise e nuove relazioni tra territori.'],
      images: [
        localizeEditorialImage(editorialImages.artMuseum, 'Sala espositiva del Museo Nazionale d’Arte di Odessa', 'Museo Nazionale d’Arte di Odessa · fotografia di contesto'),
        localizeEditorialImage(editorialImages.sunnyDay, 'Sunny Day, dipinto di Émile Claus del 1895', 'Sunny Day, Émile Claus, 1895 · Museo d’Arte Occidentale e Orientale di Odessa'),
        localizeEditorialImage(editorialImages.frescoRestoration, 'Allestimento per il restauro di un affresco di Sant Climent de Taüll', 'Immagine di contesto · restauro di affreschi, MNAC, Barcellona'),
      ],
    },
    activities: {
      title: 'Attività che collegano persone e competenze',
      paragraphs: ['Sei azioni coordinate accompagnano il progetto dalla ricerca iniziale alla condivisione pubblica dei risultati.'],
    },
    results: {
      title: 'Un impatto leggibile e verificabile',
      paragraphs: ['Indicatori semplici raccontano partecipazione, collaborazioni e materiali prodotti durante il percorso.'],
    },
    partners: {
      title: 'Una rete multidisciplinare',
      paragraphs: ['Enti pubblici, università e organizzazioni civiche contribuiscono con prospettive complementari.'],
    },
    media: {
      title: 'Il progetto, mentre accade',
      paragraphs: ['Notizie, immagini e video documentano incontri, laboratori e momenti di restituzione.'],
      image: localizeEditorialImage(editorialImages.passage, 'Decorazioni architettoniche del Passage di Odessa', 'Passage di Odessa · fotografia di contesto'),
    },
    videoPills: {
      title: 'Storie brevi dal progetto',
      paragraphs: ['Una serie di pillole video racconta persone, luoghi, gesti e strumenti di Odessa in pochi minuti.'],
    },
    contact: {
      title: 'Vuoi prendere parte al percorso?',
      paragraphs: ['Scrivici per conoscere le prossime attività o proporre una collaborazione.'],
    },
  },
  project: {
    lead: {
      eyebrow: 'Il progetto',
      title: 'Cooperare significa progettare insieme.',
      intro: 'Odessa crea uno spazio operativo dove ricerca, educazione e cultura possono generare risposte condivise a bisogni reali.',
    },
    context: {
      title: 'Contesto',
      paragraphs: [
        'Le relazioni tra territori europei richiedono oggi strumenti più aperti, accessibili e capaci di durare oltre i singoli eventi.',
        'Il progetto parte dall’ascolto delle comunità e costruisce un programma comune attorno alle priorità emerse.',
      ],
    },
    objectives: {
      title: 'Obiettivi',
      paragraphs: ['Quattro obiettivi orientano tutte le attività e la valutazione del progetto.'],
      items: ['Rafforzare competenze locali', 'Attivare reti internazionali', 'Produrre conoscenza accessibile', 'Favorire una partecipazione inclusiva'],
    },
    methodology: {
      title: 'Metodologia',
      paragraphs: ['Ricerca partecipata, co-design e sperimentazione sul campo formano un ciclo continuo. Ogni fase restituisce evidenze alla successiva.'],
      items: ['Ascoltare', 'Co-progettare', 'Sperimentare', 'Valutare e condividere'],
    },
    audiences: {
      title: 'Destinatari',
      paragraphs: ['Il programma si rivolge a giovani, operatori culturali, ricercatori, amministrazioni e organizzazioni civiche dei territori coinvolti.'],
    },
    timelineTitle: 'Timeline del progetto',
    timeline: [
      {marker: '01 · 2026', title: 'Ricerca e ascolto', text: 'Mappatura dei bisogni e formazione dei gruppi locali.'},
      {marker: '02 · 2027', title: 'Scambio e laboratori', text: 'Sessioni formative, residenze e prototipi condivisi.'},
      {marker: '03 · 2027', title: 'Sperimentazione', text: 'Test delle soluzioni nei contesti partner.'},
      {marker: '04 · 2028', title: 'Restituzione', text: 'Valutazione, pubblicazioni e incontri aperti.'},
    ],
    images: [
      localizeEditorialImage(editorialImages.stairs, 'Vista frontale della Scalinata Potëmkin a Odessa', 'Scalinata Potëmkin · fotografia di contesto'),
      localizeEditorialImage(editorialImages.restorationWorkshop, 'Un gruppo internazionale osserva insieme un manufatto decorato durante un laboratorio', 'Visuale editoriale generata · laboratorio di conservazione'),
    ],
  },
  activities: {
    lead: {
      eyebrow: 'Attività',
      title: 'Imparare, sperimentare, restituire.',
      intro: 'Il programma combina momenti di ricerca, formazione e produzione per generare risultati utili anche dopo la conclusione del progetto.',
    },
    items: [
      {id: 'research', number: '01', category: 'Ricerca', title: 'Mappatura partecipata', summary: 'Interviste e tavoli di lavoro per riconoscere risorse e bisogni dei territori.', date: 'Settembre–Novembre 2026', image: localizeEditorialImage(editorialImages.artMuseum, 'Sala espositiva del Museo Nazionale d’Arte di Odessa', 'Museo Nazionale d’Arte di Odessa · fotografia di contesto')},
      {id: 'training', number: '02', category: 'Formazione', title: 'Academy transnazionale', summary: 'Un ciclo di moduli su progettazione, facilitazione e comunicazione accessibile.', date: 'Gennaio–Marzo 2027', image: localizeEditorialImage(editorialImages.restorationPlaster, 'Mani guantate intervengono con un pennello fine su un ornamento neoclassico in gesso', 'Visuale concettuale generata · restauro decorativo')},
      {id: 'residency', number: '03', category: 'Scambio', title: 'Residenza a Odessa', summary: 'Gruppi misti lavorano insieme su casi e sfide proposte dalle comunità.', date: 'Maggio 2027', image: localizeEditorialImage(editorialImages.passage, 'Decorazioni architettoniche all’interno del Passage di Odessa', 'Passage di Odessa · fotografia di contesto')},
      {id: 'labs', number: '04', category: 'Laboratori', title: 'Prototipi locali', summary: 'Laboratori aperti trasformano le idee in strumenti, servizi e narrazioni.', date: 'Giugno–Ottobre 2027', image: localizeEditorialImage(editorialImages.conservationMaterials, 'Pigmenti minerali, lino, carta da lucido, guanti e pennelli disposti su un tavolo', 'Visuale concettuale generata · materiali di conservazione')},
      {id: 'exchange', number: '05', category: 'Mobilità', title: 'Visita studio in Italia', summary: 'Una settimana di incontri con istituzioni, università e realtà civiche.', date: 'Novembre 2027', image: localizeEditorialImage(editorialImages.port, 'Il porto di Odessa al tramonto con una barca a vela', 'Porto di Odessa · fotografia di contesto')},
      {id: 'forum', number: '06', category: 'Disseminazione', title: 'Forum pubblico', summary: 'Risultati, metodi e prospettive vengono condivisi con una platea internazionale.', date: 'Marzo 2028', image: localizeEditorialImage(editorialImages.opera, 'Il Teatro Nazionale dell’Opera e del Balletto di Odessa visto dalla piazza', 'Teatro dell’Opera di Odessa · fotografia di contesto')},
    ],
    calendar: {
      title: 'Calendario essenziale',
      paragraphs: ['Il calendario definitivo verrà aggiornato con luoghi, orari e modalità di partecipazione.'],
    },
    timeline: [
      {marker: 'AUT 2026', title: 'Avvio', text: 'Ricerca, mappatura e coinvolgimento.'},
      {marker: 'PRI 2027', title: 'Formazione', text: 'Academy e residenza internazionale.'},
      {marker: 'AUT 2027', title: 'Produzione', text: 'Laboratori e visita studio.'},
      {marker: 'PRI 2028', title: 'Condivisione', text: 'Forum e pubblicazione finale.'},
    ],
  },
  partners: {
    lead: {
      eyebrow: 'Partner',
      title: 'Competenze diverse, responsabilità condivise.',
      intro: 'La rete dimostrativa riunisce organizzazioni con ruoli complementari nella ricerca, nella formazione e nel coinvolgimento dei territori.',
    },
    items: [
      {id: 'lead', name: 'Fondazione Ponte', type: 'Capofila · Italia', role: 'Coordinamento, amministrazione e relazioni istituzionali.'},
      {id: 'civic', name: 'Civic Odessa Lab', type: 'Organizzazione civica · Ucraina', role: 'Coinvolgimento delle comunità e coordinamento delle attività locali.'},
      {id: 'university', name: 'Università Adriatica', type: 'Università · Italia', role: 'Ricerca, valutazione e documentazione metodologica.'},
      {id: 'culture', name: 'Culture Forward', type: 'Impresa sociale · Ucraina', role: 'Produzione culturale e formazione dei partecipanti.'},
      {id: 'municipality', name: 'Città Aperta', type: 'Ente pubblico · Italia', role: 'Connessione con servizi pubblici e reti territoriali.'},
      {id: 'network', name: 'East–West Network', type: 'Rete europea', role: 'Disseminazione internazionale e scambio di pratiche.'},
    ],
    collaboration: {
      title: 'Come collaboriamo',
      paragraphs: ['Un comitato comune assume le decisioni strategiche, mentre gruppi di lavoro misti seguono attività, comunicazione e valutazione. Documenti e risultati sono condivisi con criteri aperti e accessibili.'],
      items: ['Decisioni trasparenti', 'Responsabilità distribuite', 'Verifica periodica', 'Conoscenza aperta'],
    },
  },
  results: {
    lead: {
      eyebrow: 'Risultati',
      title: 'Misurare ciò che cambia.',
      intro: 'Questi dati dimostrativi mostrano come Odessa renderà leggibili partecipazione, apprendimento e capacità di collaborazione.',
    },
    indicators: {
      title: 'Il programma in numeri',
      intro: 'Quattro indicatori rendono immediatamente visibili la scala prevista delle attività e la rete che le sostiene.',
    },
    stats: [
      {value: 180, label: 'partecipanti', detail: 'coinvolti nelle attività locali e internazionali', visual: 'participants'},
      {value: 24, label: 'sessioni formative', detail: 'tra workshop, visite e laboratori', visual: 'sessions'},
      {value: 12, label: 'prototipi', detail: 'sviluppati e testati con le comunità', visual: 'prototypes'},
      {value: 6, label: 'organizzazioni', detail: 'riunite in una rete transnazionale', visual: 'network'},
    ],
    deliverables: {
      title: 'Risultati e deliverable',
      paragraphs: ['I prodotti finali saranno pensati per essere consultabili, riutilizzabili e adattabili da altri territori.'],
      items: ['Mappa dei bisogni e delle risorse', 'Toolkit per la facilitazione', 'Curriculum formativo aperto', 'Dodici prototipi documentati', 'Report di valutazione', 'Archivio multimediale bilingue'],
    },
    resourcesTitle: 'Risorse',
    resourcesIntro: 'Le card anticipano documenti futuri. In questa fase non è disponibile alcun file reale.',
    resources: [
      {id: 'report', type: 'PDF · Demo', title: 'Report intermedio', description: 'Sintesi di attività, apprendimenti e indicatori.'},
      {id: 'toolkit', type: 'PDF · Demo', title: 'Toolkit operativo', description: 'Metodi e schede per replicare i laboratori.'},
      {id: 'dataset', type: 'XLSX · Demo', title: 'Dataset degli indicatori', description: 'Struttura dimostrativa per il monitoraggio.'},
    ],
    media: {
      title: 'Un archivio aperto',
      paragraphs: ['Il racconto visivo accompagna i dati con testimonianze, immagini di processo e materiali pubblici.'],
      images: [
        localizeEditorialImage(editorialImages.port, 'Il porto di Odessa al tramonto con una barca a vela', 'Porto di Odessa · fotografia di contesto'),
        localizeEditorialImage(editorialImages.artInstallation, 'Installazione contemporanea blu e gialla in un cortile storico', 'Visuale editoriale generata · installazione culturale'),
      ],
    },
  },
  media: {
    lead: {
      eyebrow: 'Media',
      title: 'Seguire il progetto da vicino.',
      intro: 'Un archivio dimostrativo raccoglie aggiornamenti, immagini e video prodotti lungo tutto il percorso.',
    },
    featured: {
      title: 'Odessa in due minuti',
      paragraphs: ['Un video introduttivo presenterà le persone, i luoghi e le domande che guidano il progetto.'],
      videoLabel: 'Video principale del progetto',
    },
    archiveTitle: 'Archivio',
    archiveIntro: 'I filtri funzionano sui contenuti locali e anticipano una futura gestione editoriale.',
    news: [
      {id: 'kickoff', date: '12 settembre 2026', category: 'News', title: 'Inizia il percorso di Odessa', excerpt: 'I partner si incontrano per definire priorità, strumenti e calendario comune.'},
      {id: 'mapping', date: '28 ottobre 2026', category: 'Diario', title: 'Le prime mappe dai territori', excerpt: 'Bisogni, risorse e relazioni emergono dai tavoli di ascolto locali.'},
      {id: 'academy', date: '15 gennaio 2027', category: 'Comunicati', title: 'Aperte le candidature all’Academy', excerpt: 'Trenta posti per giovani professionisti e operatori delle comunità partner.'},
    ],
    gallery: [
      {id: 'photo-01', label: 'Museo d’Arte di Odessa', ratio: 'landscape', image: localizeEditorialImage(editorialImages.artMuseum, 'Sala espositiva del Museo Nazionale d’Arte di Odessa', 'Museo Nazionale d’Arte di Odessa · fotografia di contesto')},
      {id: 'photo-02', label: 'Dipinto della collezione di Odessa', ratio: 'portrait', image: localizeEditorialImage(editorialImages.sunnyDay, 'Sunny Day, dipinto di Émile Claus del 1895', 'Sunny Day, Émile Claus, 1895 · Museo d’Arte Occidentale e Orientale di Odessa')},
      {id: 'photo-03', label: 'Pigmenti e strumenti di conservazione', ratio: 'square', image: localizeEditorialImage(editorialImages.restorationMaterials, 'Pigmenti, campioni e strumenti disposti come un archivio materico', 'Visuale editoriale generata · archivio di pigmenti')},
      {id: 'photo-04', label: 'Restauro di affreschi', ratio: 'landscape', image: localizeEditorialImage(editorialImages.frescoRestoration, 'Allestimento per il restauro di un affresco di Sant Climent de Taüll', 'Immagine di contesto · restauro di affreschi, MNAC, Barcellona')},
      {id: 'photo-05', label: 'Dettaglio di conservazione', ratio: 'portrait', image: localizeEditorialImage(editorialImages.restorationFresco, 'Dettaglio ravvicinato di un intervento su una superficie dipinta', 'Visuale editoriale generata · conservazione di un affresco')},
      {id: 'photo-06', label: 'Installazione contemporanea', ratio: 'square', image: localizeEditorialImage(editorialImages.contemporaryHeritageArt, 'Frammenti materici sospesi con strati blu traslucidi e luce gialla', 'Visuale editoriale generata · memoria materica')},
      {id: 'photo-07', label: 'Passage di Odessa', ratio: 'landscape', image: localizeEditorialImage(editorialImages.passage, 'Decorazioni architettoniche all’interno del Passage di Odessa', 'Passage di Odessa · fotografia di contesto')},
      {id: 'photo-08', label: 'Scalinata Potëmkin', ratio: 'portrait', image: localizeEditorialImage(editorialImages.stairs, 'Vista frontale della Scalinata Potëmkin a Odessa', 'Scalinata Potëmkin · fotografia di contesto')},
    ],
  },
  videoPills: {
    lead: {
      eyebrow: 'Pillole video',
      title: 'Il progetto, una storia alla volta.',
      intro: 'Video brevi per incontrare le persone, entrare nei laboratori e seguire come idee e competenze prendono forma.',
    },
    seriesTitle: 'Guarda le pillole',
    seriesIntro: 'Sei episodi presentano il progetto con funzioni diverse: orientare, insegnare, dare voce e mostrare i processi.',
    platformLabel: 'Piattaforma video del progetto',
    categories: [
      {id: 'discover', label: 'Conosci Odessa'},
      {id: 'learning', label: 'Didattica'},
      {id: 'voices', label: 'Voci e testimonianze'},
      {id: 'behindScenes', label: 'Dietro le quinte'},
    ],
    items: [
      {
        id: 'intro', slug: videoPillSlugs.intro.it, number: '01', category: 'discover', featured: true,
        title: 'Odessa in due minuti', summary: 'Persone, luoghi e domande che orientano il percorso comune tra Italia e Ucraina.', duration: '02:00',
        body: ['Odessa nasce per trasformare la cooperazione in un’esperienza concreta, costruita con le comunità e non soltanto per loro.', 'Questa prima storia introduce il territorio, i partner e le domande che accompagneranno ricerca, formazione e produzione culturale.'],
        video: {},
        attachments: [{id: 'transcript', title: 'Trascrizione dell’episodio', format: 'PDF', meta: 'Italiano · Inglese · Ucraino'}],
      },
      {
        id: 'care', slug: videoPillSlugs.care.it, number: '02', category: 'learning', featured: true,
        title: 'Perché prendersi cura', summary: 'Un gesto, un materiale e una competenza raccontano il valore della conservazione.', duration: '01:30',
        body: ['Conservare non significa immobilizzare: significa conoscere materiali e storie per scegliere come accompagnarli nel tempo.', 'La pillola osserva un gesto tecnico e lo collega alla responsabilità culturale condivisa tra professionisti, istituzioni e cittadini.'],
        video: {},
        attachments: [{id: 'learning-sheet', title: 'Scheda didattica: cura e conservazione', format: 'PDF', meta: '4 pagine'}],
      },
      {
        id: 'voices', slug: videoPillSlugs.voices.it, number: '03', category: 'voices', featured: true,
        title: 'Voci dai territori', summary: 'Prospettive diverse spiegano bisogni, risorse e aspettative delle comunità coinvolte.', duration: '02:15',
        body: ['Le priorità del progetto emergono dall’ascolto di chi vive, studia e lavora nei territori coinvolti.', 'Le testimonianze non sono un commento finale: diventano materiale di progetto e orientano attività, strumenti e criteri di valutazione.'],
        video: {},
        attachments: [{id: 'voices-transcript', title: 'Trascrizione delle testimonianze', format: 'DOCX', meta: '3 lingue'}],
      },
      {
        id: 'workshop', slug: videoPillSlugs.workshop.it, number: '04', category: 'behindScenes', featured: false,
        title: 'Dentro il laboratorio', summary: 'Tecniche, strumenti e confronto trasformano l’apprendimento in pratica condivisa.', duration: '01:45',
        body: ['Nel laboratorio la conoscenza passa attraverso osservazione, prove, errori e confronto tra competenze diverse.', 'La camera segue il processo da vicino per mostrare ciò che spesso resta invisibile nel risultato finale.'],
        video: {},
        attachments: [{id: 'tools', title: 'Strumenti e materiali del laboratorio', format: 'PDF', meta: 'Scheda illustrata'}],
      },
      {
        id: 'words', slug: videoPillSlugs.words.it, number: '05', category: 'learning', featured: false,
        title: 'Parole condivise', summary: 'Termini italiani e ucraini aprono un piccolo vocabolario della cooperazione.', duration: '01:20',
        body: ['Le parole con cui descriviamo cura, patrimonio e collaborazione non coincidono sempre perfettamente tra lingue e contesti.', 'Il confronto linguistico diventa uno strumento didattico per riconoscere differenze, equivalenze e nuovi significati condivisi.'],
        video: {},
        attachments: [{id: 'glossary', title: 'Glossario essenziale italiano–ucraino', format: 'PDF', meta: 'Versione bilingue'}],
      },
      {
        id: 'outcomes', slug: videoPillSlugs.outcomes.it, number: '06', category: 'discover', featured: false,
        title: 'Quello che resta', summary: 'Esperienze, relazioni e strumenti diventano risorse accessibili oltre il progetto.', duration: '02:00',
        body: ['Un progetto termina, ma può lasciare metodi, relazioni e materiali capaci di continuare a circolare.', 'Questa storia collega i risultati misurabili alle trasformazioni meno visibili: fiducia, autonomia e capacità di lavorare insieme.'],
        video: {},
        attachments: [{id: 'outcomes-note', title: 'Sintesi dei risultati attesi', format: 'PDF', meta: 'Nota editoriale'}],
      },
    ],
  },
  materials,
  contact: {
    lead: {
      eyebrow: 'Contatti',
      title: 'Apriamo nuove conversazioni.',
      intro: 'Usa i recapiti dimostrativi o il form per chiedere informazioni sulle attività e sulle possibilità di collaborazione.',
    },
    detailsTitle: 'Riferimenti del progetto',
    details: [
      {label: 'Email', value: 'info@odessa-project.example'},
      {label: 'Coordinamento', value: 'Fondazione Ponte, Italia'},
      {label: 'Sede operativa', value: 'Via del Porto 12, 00100 Roma'},
      {label: 'Orari', value: 'Lunedì–Venerdì, 09:00–17:00'},
    ],
    formTitle: 'Scrivi al team',
    formIntro: 'Il form è una simulazione locale e non trasmette né conserva alcun dato.',
  },
  privacy: {
    lead: {eyebrow: 'Privacy', title: 'Informativa privacy', intro: 'Una struttura dimostrativa per descrivere il futuro trattamento dei dati personali.'},
    notice: 'Contenuto legale dimostrativo da verificare e sostituire prima della pubblicazione.',
    sections: [
      {title: 'Titolare del trattamento', paragraphs: ['Il soggetto indicato in questa sezione è fittizio e verrà sostituito con il titolare effettivo.']},
      {title: 'Dati e finalità', paragraphs: ['Il prototipo non invia dati. In futuro questa sezione descriverà dati raccolti, finalità e basi giuridiche.']},
      {title: 'Conservazione e destinatari', paragraphs: ['Tempi di conservazione, fornitori e trasferimenti saranno documentati prima dell’attivazione di servizi reali.']},
      {title: 'Diritti', paragraphs: ['L’informativa definitiva spiegherà come esercitare accesso, rettifica, cancellazione e opposizione.']},
    ],
  },
  cookie: {
    lead: {eyebrow: 'Cookie Policy', title: 'Preferenze e tecnologie locali', intro: 'Il prototipo non utilizza analytics, profilazione o servizi pubblicitari.'},
    notice: 'Contenuto legale dimostrativo da verificare e sostituire prima della pubblicazione.',
    sections: [
      {title: 'Cosa viene memorizzato', paragraphs: ['Viene salvata soltanto la preferenza odessa-consent-v1 nel local storage del browser.']},
      {title: 'Cookie necessari', paragraphs: ['Nessun cookie HTTP viene impostato direttamente da questa interfaccia dimostrativa.']},
      {title: 'Servizi opzionali', paragraphs: ['Non sono presenti analytics, mappe, video incorporati o altri servizi di terze parti.']},
      {title: 'Gestione delle preferenze', paragraphs: ['La preferenza locale può essere eliminata cancellando i dati del sito dal browser.']},
    ],
  },
} satisfies SiteContent

export default content
