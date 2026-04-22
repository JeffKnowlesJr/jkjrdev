import React from 'react'

interface Orb {
  color: string
  size: string
  position: string
  blur?: string
}

interface GradientOrbsBackgroundProps {
  orbs?: Orb[]
}

const defaultOrbs: Orb[] = [
  { color: 'bg-electric/20', size: 'w-96 h-96', position: 'top-1/4 -left-32' },
  { color: 'bg-mint/20', size: 'w-96 h-96', position: 'bottom-1/4 -right-32' }
]

export default function GradientOrbsBackground({ orbs = defaultOrbs }: GradientOrbsBackgroundProps) {
  return (
    <>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.position} ${orb.size} ${orb.color} rounded-full ${orb.blur || 'blur-3xl'}`}
        />
      ))}
    </>
  )
}
