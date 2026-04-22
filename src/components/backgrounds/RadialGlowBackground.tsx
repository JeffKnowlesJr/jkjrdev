import React from 'react'

interface RadialGlowBackgroundProps {
  color?: string
  size?: string
  position?: string
}

export default function RadialGlowBackground({
  color = 'bg-electric/10',
  size = 'w-[600px] h-[600px]',
  position = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
}: RadialGlowBackgroundProps) {
  return (
    <div className={`absolute ${position} ${size} ${color} rounded-full blur-3xl`} />
  )
}
