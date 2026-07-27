import type {MaterialsContent} from '../types'

const materials = {
  lead: {
    eyebrow: 'Identità visiva · materiale di lavoro',
    title: 'Quattro direzioni, un linguaggio condiviso.',
    intro: 'Le proposte vengono ordinate per rendere confrontabili segno, colore, sistema grafico e voce del progetto prima della scelta finale.',
  },
  indexLabel: 'Indice dei materiali di identità',
  logos: {
    title: 'Ipotesi di logo',
    intro: 'Quattro concept esplorano il rapporto tra patrimonio, cooperazione, territorio e opportunità. Ogni proposta conserva un carattere istituzionale, ma sviluppa una metafora diversa.',
  },
  colors: {
    title: 'Palette e ipotesi di colore',
    intro: 'Blu, giallo e grigio sono la base comune. Le variazioni distinguono un registro più vicino alla bandiera ucraina da interpretazioni legate al mare, all’oro e al paesaggio di Odessa.',
    note: 'Valori RGB campionati dalle tavole PDF. Prima della produzione definitiva andranno validati nei file sorgente e convertiti nei profili di stampa necessari.',
  },
  elements: {
    title: 'Elementi grafici e icone',
    intro: 'Ogni simbolo può vivere anche senza il logotipo: come icona social, segno di sezione, pattern, indicatore o dispositivo di transizione.',
  },
  voice: {
    title: 'Claim e linee di tono',
    intro: 'Le proposte oscillano tra due territori narrativi complementari: conservare il patrimonio e trasformare la conoscenza in competenze e futuro.',
    principlesTitle: 'Principi di voce',
    principles: [
      'Concreto prima che celebrativo: mostrare azioni, competenze e risultati.',
      'Cooperativo e paritario: parlare di lavoro condiviso, evitando il tono assistenziale.',
      'Competente ma accessibile: usare termini precisi e frasi brevi.',
      'Orientato al futuro: collegare patrimonio, formazione e opportunità.',
    ],
  },
  typographyLabel: 'Ipotesi tipografiche',
  source: {
    label: 'Apri il documento completo',
    meta: 'PDF · 6 pagine · documento originale',
    note: 'Materiale esplorativo per discussione e selezione. Marchio, font e palette non sono ancora da considerarsi definitivi.',
  },
  concepts: [
    {
      id: 'stratigraphy',
      number: '01',
      title: 'Stratigrafie e colori ucraini',
      description: 'Blocchi orizzontali sovrapposti richiamano intonaci, pigmenti e sedimentazioni del restauro. La struttura simmetrica forma un ponte tra culture attorno a un nucleo giallo, simbolo del patrimonio condiviso.',
      elementDescription: 'Barre modulari, asse centrale e cerchio possono generare pattern, cornici e animazioni in sequenza. È il sistema più vicino all’identità Odessa già in uso.',
      image: {src: '/assets/materials/concept-01.png', alt: 'Proposta logo 1 con simbolo stratificato blu e nucleo giallo', width: 1200, height: 700},
      mark: {src: '/assets/materials/mark-01.png', alt: 'Simbolo stratificato blu con sole giallo centrale', width: 280, height: 380},
      typography: ['Aglet Sans Semibold', 'Helvetica Neue Medium'],
      palette: [
        {name: 'Azzurro ucraino', hex: '#009FE3'},
        {name: 'Giallo sole', hex: '#FFEE00'},
        {name: 'Grigio neutro', hex: '#878787'},
      ],
      claims: ['Restoring Together.', 'Conoscenze che uniscono.', 'Il patrimonio come linguaggio comune.', 'Cooperare per conservare.'],
    },
    {
      id: 'sea-arch',
      number: '02',
      title: 'La O come arco, il mare come contesto',
      description: 'Due curve dorate emergono da un campo blu istituzionale. Il segno unisce la superficie del Mar Nero, la memoria di un’ancora e un ponte che connette sponde, culture e competenze.',
      elementDescription: 'La curva ascendente suggerisce direzione e crescita; il riquadro offre una matrice stabile per icone, numerazioni e finestre fotografiche.',
      image: {src: '/assets/materials/concept-02.png', alt: 'Proposta logo 2 con arco dorato su campo blu', width: 1120, height: 840},
      mark: {src: '/assets/materials/mark-02.png', alt: 'Icona quadrata blu con due curve dorate', width: 300, height: 380},
      typography: ['Bodoni 72 Bold', 'Brandon Grotesque'],
      palette: [
        {name: 'Blu istituzionale', hex: '#1D71B8'},
        {name: 'Azzurro mare', hex: '#36A9E1'},
        {name: 'Oro caldo', hex: '#F9B234'},
        {name: 'Grigio neutro', hex: '#878787'},
      ],
      claims: ['Il patrimonio crea opportunità.', 'Skills for Heritage. Jobs for the Future.', 'Cultura. Competenze. Futuro.', 'Il sapere che genera lavoro.'],
    },
    {
      id: 'open-path',
      number: '03',
      title: 'La O come percorso, il tricolore come presenza',
      description: 'Una O aperta si proietta verso l’orizzonte come un percorso senza chiusura. La banda tricolore firma con discrezione la presenza italiana, mentre il giallo indica energia e direzione.',
      elementDescription: 'Cerchio aperto, prospettiva e banda diagonale costruiscono un alfabeto dinamico per frecce, percorsi, mappe e indicatori di avanzamento.',
      image: {src: '/assets/materials/concept-03.png', alt: 'Proposta logo 3 con O aperta, banda tricolore e direzione gialla', width: 1160, height: 760},
      mark: {src: '/assets/materials/mark-03.png', alt: 'O blu aperta attraversata da una banda tricolore e gialla', width: 350, height: 380},
      typography: ['Brandon Grotesque', 'Brandon Grotesque Medium'],
      palette: [
        {name: 'Blu istituzionale', hex: '#1D71B8'},
        {name: 'Azzurro mare', hex: '#36A9E1'},
        {name: 'Giallo direzione', hex: '#FCEA10'},
        {name: 'Grigio neutro', hex: '#878787'},
      ],
      claims: ['Conoscenza per la conservazione del patrimonio.', 'Patrimonio culturale, competenze, futuro.', 'Conservazione e formazione per lo sviluppo sostenibile.'],
    },
    {
      id: 'anchor-bridge',
      number: '04',
      title: 'Il mare, l’ancora, il ponte',
      description: 'La O diventa un contenitore narrativo: un arco guarda un mare essenziale, mentre il nome della città in cirillico costruisce appartenenza geografica. Il cerchio comunica continuità e cura.',
      elementDescription: 'Arco, onde e perimetro circolare offrono un sigillo riconoscibile per timbri, badge, icone istituzionali e segnaletica.',
      image: {src: '/assets/materials/concept-04.png', alt: 'Proposta logo 4 con arco, onde e nome Odesa in cirillico', width: 1120, height: 880},
      mark: {src: '/assets/materials/mark-04.png', alt: 'Sigillo circolare blu e arancio con arco e onde', width: 350, height: 420},
      typography: ['Skia Bold', 'Brandon Grotesque'],
      palette: [
        {name: 'Blu istituzionale', hex: '#1D71B8'},
        {name: 'Azzurro mare', hex: '#36A9E1'},
        {name: 'Arancio caldo', hex: '#F9B234'},
        {name: 'Grigio neutro', hex: '#878787'},
      ],
      claims: ['Restoring Heritage. Building Futures.', 'Conservare il patrimonio. Costruire il futuro.', 'Il patrimonio crea opportunità.'],
    },
  ],
} satisfies MaterialsContent

export default materials
