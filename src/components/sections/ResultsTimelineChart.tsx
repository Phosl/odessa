'use client'

import {useId, useState} from 'react'
import type {ResultsTimelineContent, ResultsTimelinePoint} from '@/lib/content/types'
import styles from './ResultsTimelineChart.module.css'

const CHART_WIDTH = 760
const CHART_HEIGHT = 320
const CHART_LEFT = 52
const CHART_RIGHT = 24
const CHART_TOP = 28
const CHART_BASELINE = 258

function getGeometry(items: ResultsTimelinePoint[]) {
  const maximum = Math.max(...items.map((item) => item.participants), 1)
  const step = items.length > 1
    ? (CHART_WIDTH - CHART_LEFT - CHART_RIGHT) / (items.length - 1)
    : 0
  const points = items.map((item, index) => ({
    ...item,
    x: CHART_LEFT + (step * index),
    y: CHART_BASELINE - ((item.participants / maximum) * (CHART_BASELINE - CHART_TOP)),
  }))
  return {maximum, points}
}

export function ResultsTimelineChart({content}: {content: ResultsTimelineContent}) {
  const titleId = useId()
  const descriptionId = useId()
  const [requestedIndex, setRequestedIndex] = useState(Math.max(content.items.length - 1, 0))

  if (!content.items.length) return null

  const activeIndex = Math.min(requestedIndex, content.items.length - 1)
  const active = content.items[activeIndex]
  const geometry = getGeometry(content.items)
  const activePoints = geometry.points.slice(0, activeIndex + 1)
  const fullLine = geometry.points.map(({x, y}) => `${x},${y}`).join(' ')
  const activeLine = activePoints.map(({x, y}) => `${x},${y}`).join(' ')
  const activeArea = `${CHART_LEFT},${CHART_BASELINE} ${activeLine} ${activePoints.at(-1)?.x ?? CHART_LEFT},${CHART_BASELINE}`
  const metrics = [
    {label: content.metrics.participants, value: active.participants},
    {label: content.metrics.sessions, value: active.sessions},
    {label: content.metrics.prototypes, value: active.prototypes},
    {label: content.metrics.organizations, value: active.organizations},
  ]

  return (
    <article className={styles.timeline} data-result-timeline data-reveal>
      <header className={styles.header}>
        <span className="meta">05 / 05</span>
        <div>
          <h3 id={titleId}>{content.title}</h3>
          <p id={descriptionId}>{content.intro}</p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.plot}>
          <svg aria-labelledby={`${titleId} ${descriptionId}`} role="img" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
            {[0, 1 / 3, 2 / 3, 1].map((ratio) => {
              const y = CHART_BASELINE - (ratio * (CHART_BASELINE - CHART_TOP))
              return (
                <g key={ratio}>
                  <line className={styles.gridLine} x1={CHART_LEFT} x2={CHART_WIDTH - CHART_RIGHT} y1={y} y2={y} />
                  <text className={styles.axisValue} textAnchor="end" x={CHART_LEFT - 12} y={y + 4}>{Math.round(geometry.maximum * ratio)}</text>
                </g>
              )
            })}
            <polyline className={styles.baseLine} points={fullLine} />
            <polygon className={styles.activeArea} points={activeArea} />
            <polyline className={styles.activeLine} points={activeLine} />
            {geometry.points.map((point, index) => (
              <circle
                className={index === activeIndex ? styles.activePoint : styles.point}
                cx={point.x}
                cy={point.y}
                key={point.id}
                r={index === activeIndex ? 8 : 4}
              />
            ))}
          </svg>
          <ol className={styles.phaseList}>
            {content.items.map((item, index) => (
              <li key={item.id}>
                <button aria-pressed={index === activeIndex} onClick={() => setRequestedIndex(index)} type="button">
                  <span>{item.label}</span>
                  <small>{item.date}</small>
                </button>
              </li>
            ))}
          </ol>
          <label className={styles.rangeLabel}>
            <span className="sr-only">{content.controlLabel}</span>
            <input
              aria-valuetext={`${active.label}, ${active.date}`}
              max={content.items.length - 1}
              min="0"
              onChange={(event) => setRequestedIndex(Number(event.target.value))}
              step="1"
              type="range"
              value={activeIndex}
            />
          </label>
        </div>

        <div aria-live="polite" className={styles.readout}>
          <div className={styles.activePhase}>
            <span className="meta">{active.date}</span>
            <strong>{active.label}</strong>
          </div>
          <dl>
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className={`${styles.note} meta`}>{content.note}</p>
    </article>
  )
}
