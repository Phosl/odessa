import type {Stat} from '@/lib/content/types'
import {SectionHeading} from '@/components/wireframe/Wireframe'
import styles from './ResultsCharts.module.css'

const PROTOTYPE_COLUMNS = [58, 82, 68, 100, 76, 48, 88, 64, 94, 72, 54, 84]
const NETWORK_NODES = [
  {x: 50, y: 16},
  {x: 82, y: 34},
  {x: 75, y: 73},
  {x: 44, y: 86},
  {x: 15, y: 65},
  {x: 19, y: 28},
]
const NETWORK_LINKS = [
  [0, 1], [0, 2], [0, 5], [1, 2], [1, 4], [2, 3],
  [2, 5], [3, 4], [4, 5], [1, 5],
] as const

function ParticipantsVisual({value}: {value: number}) {
  const units = Math.ceil(value / 10)
  return (
    <div className={styles.participantMatrix} data-chart-units={units}>
      {Array.from({length: units}, (_, index) => <i aria-hidden="true" key={index} />)}
    </div>
  )
}

function SessionsVisual({value}: {value: number}) {
  return (
    <div className={styles.sessionDial}>
      <svg aria-hidden="true" viewBox="0 0 240 240">
        <circle cx="120" cy="120" r="74" />
        {Array.from({length: value}, (_, index) => (
          <line key={index} transform={`rotate(${index * (360 / value)} 120 120)`} x1="120" x2="120" y1="18" y2="48" />
        ))}
      </svg>
      <strong>{value}</strong>
    </div>
  )
}

function PrototypesVisual({value}: {value: number}) {
  return (
    <div className={styles.prototypeBars}>
      {Array.from({length: value}, (_, index) => (
        <i
          aria-hidden="true"
          key={index}
          style={{height: `${PROTOTYPE_COLUMNS[index % PROTOTYPE_COLUMNS.length]}%`}}
        />
      ))}
    </div>
  )
}

function NetworkVisual({value}: {value: number}) {
  const nodes = NETWORK_NODES.slice(0, value)
  return (
    <svg aria-hidden="true" className={styles.network} viewBox="0 0 100 100">
      {NETWORK_LINKS.map(([from, to]) => {
        const start = nodes[from]
        const end = nodes[to]
        if (!start || !end) return null
        return <line key={`${from}-${to}`} x1={start.x} x2={end.x} y1={start.y} y2={end.y} />
      })}
      {nodes.map((node, index) => (
        <g key={index} transform={`translate(${node.x} ${node.y})`}>
          <circle r={index === 0 ? 6 : 4.5} />
          <text textAnchor="middle" x="0" y="1.3">{String(index + 1).padStart(2, '0')}</text>
        </g>
      ))}
    </svg>
  )
}

function ChartVisual({stat}: {stat: Stat}) {
  switch (stat.visual) {
    case 'participants':
      return <ParticipantsVisual value={stat.value} />
    case 'sessions':
      return <SessionsVisual value={stat.value} />
    case 'prototypes':
      return <PrototypesVisual value={stat.value} />
    case 'network':
      return <NetworkVisual value={stat.value} />
  }
}

export function ResultsCharts({title, intro, stats}: {title: string; intro: string; stats: Stat[]}) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeading intro={intro} title={title} />
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <article className={styles.chart} data-result-chart={stat.visual} data-reveal key={stat.label}>
              <header className={styles.chartHeader}>
                <span className="meta">{String(index + 1).padStart(2, '0')} / {String(stats.length).padStart(2, '0')}</span>
                {stat.visual !== 'sessions' && <strong>{stat.value}</strong>}
              </header>
              <div className={styles.visual}>
                <ChartVisual stat={stat} />
              </div>
              <footer className={styles.chartFooter}>
                <h3>{stat.label}</h3>
                <p>{stat.detail}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
