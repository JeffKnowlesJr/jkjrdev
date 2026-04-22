import React from 'react'

interface GridPatternBackgroundProps {
  opacity?: string
}

export default function GridPatternBackground({ opacity = 'opacity-100' }: GridPatternBackgroundProps) {
  return <div className={`absolute inset-0 grid-bg ${opacity}`} />
}
