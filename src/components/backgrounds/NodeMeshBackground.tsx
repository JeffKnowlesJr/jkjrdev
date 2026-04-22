'use client'

import React, { useRef, useEffect, useCallback } from 'react'

const FPS = 30
const FRAME_MS = 1000 / FPS

interface NodeMeshBackgroundProps {
  /** Lower = more particles. Pixels² per particle. 4000 ≈ very dense, 10000 ≈ sparse. */
  density?: number
  /** Drift speed multiplier. 0.08 is glacial, 0.3 is noticeable. */
  speed?: number
  /** Max distance (px) for drawing connection lines. */
  connectionDistance?: number
  /** Particle draw radius. */
  particleRadius?: number
  /** Base particle alpha (0–1). */
  particleAlpha?: number
  /** Base line alpha at zero distance (0–1). Fades linearly to 0 at connectionDistance. */
  lineAlpha?: number
  /** Radius (px) around the cursor where particles and lines shift color. */
  mouseHighlightRadius?: number
  /** How much lines brighten under the cursor (alpha multiplier, applied on top of color shift). */
  mouseHighlightIntensity?: number
  /** When true, nodes are spawned inside a circle and bounce off its boundary. */
  circleConstraint?: boolean
  /** Outer radius (px) of the constraint circle / ring. Defaults to 520. */
  circleRadiusPx?: number
  /**
   * When true with `circleConstraint`, outer radius is computed from the viewport so the
   * disk always covers all four corners (no empty rounded “frame”). Ignores fixed `circleRadiusPx`.
   */
  circleCoverViewport?: boolean
  /**
   * Inner radius (px) for a donut/ring constraint.
   * When set (and circleConstraint is true), nodes are confined to the annular
   * region between innerRadiusPx and circleRadiusPx, leaving the center clear.
   */
  innerRadiusPx?: number
  /**
   * Rotation speed in radians per frame (at 30 fps).
   * 0.0005 ≈ one full revolution every ~7 minutes. Defaults to 0 (no rotation).
   */
  rotationSpeed?: number
  /**
   * Base color for nodes and lines as an RGB triplet string, e.g. "6, 182, 212".
   * Defaults to electric cyan.
   */
  nodeColor?: string
  /**
   * Color to lerp toward when the mouse is nearby, as an RGB triplet string.
   * Defaults to nodeColor (no color shift, only brightness).
   */
  highlightColor?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

function parseRgb(triplet: string): [number, number, number] {
  const parts = triplet.split(',').map((s) => parseFloat(s.trim()))
  return [parts[0], parts[1], parts[2]]
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export default function NodeMeshBackground({
  density = 4000,
  speed = 0.12,
  connectionDistance = 140,
  particleRadius = 1.5,
  particleAlpha = 0.55,
  lineAlpha = 0.18,
  mouseHighlightRadius = 200,
  mouseHighlightIntensity = 2.5,
  circleConstraint = false,
  circleRadiusPx = 520,
  circleCoverViewport = false,
  innerRadiusPx,
  rotationSpeed = 0,
  nodeColor = '6, 182, 212',
  highlightColor
}: NodeMeshBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const nodesRef = useRef<Node[]>([])
  const lastTimeRef = useRef(0)
  const rotationRef = useRef(0)
  // Tracks whether circle/donut mode is currently active (false on mobile)
  const isCircleActiveRef = useRef(false)
  /** Effective outer radius for circle mode (updated on resize). */
  const effectiveOuterRadiusRef = useRef(circleRadiusPx)

  const buildNodes = useCallback((w: number, h: number, useCircle: boolean, outerR: number) => {
    const count = Math.max(60, Math.floor((w * h) / density))
    if (useCircle) {
      const cx = w / 2
      const cy = h / 2
      const innerR = innerRadiusPx ?? 0
      // Uniform distribution in an annulus: r = sqrt(rand * (R²-r²) + r²)
      const outerR2 = outerR * outerR
      const innerR2 = innerR * innerR
      nodesRef.current = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.sqrt(Math.random() * (outerR2 - innerR2) + innerR2)
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: particleRadius * (0.7 + Math.random() * 0.6)
        }
      })
    } else {
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: particleRadius * (0.7 + Math.random() * 0.6)
      }))
    }
  }, [density, speed, particleRadius, innerRadiusPx])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animId: number

    // Pre-parse colors once, not per frame
    const [baseR, baseG, baseB] = parseRgb(nodeColor)
    const hlColor = highlightColor ?? nodeColor
    const [hlR, hlG, hlB] = parseRgb(hlColor)

    let prevW = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Donut/rotation only on desktop (md breakpoint = 768px)
      const shouldCircle = circleConstraint && w >= 768
      isCircleActiveRef.current = shouldCircle

      const outerR =
        shouldCircle && circleCoverViewport
          ? Math.hypot(w / 2, h / 2) + 48
          : circleRadiusPx
      effectiveOuterRadiusRef.current = outerR

      if (prevW === 0 || Math.abs(w - prevW) > 20) {
        // Real layout change (first load or width changed) — rebuild nodes
        buildNodes(w, h, shouldCircle, outerR)
      } else {
        // Height-only change (mobile address bar show/hide) — keep existing nodes, just clamp
        for (const n of nodesRef.current) {
          if (n.x > w) n.x = w - 2
          if (n.y > h) n.y = h - 2
        }
      }
      prevW = w
    }

    resize()

    const onResize = () => resize()

    // Track mouse via window so hovering over z-10 content doesn't drop the highlight.
    // Null-out when cursor leaves the canvas bounding rect.
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y }
      } else {
        mouseRef.current = null
      }
    }

    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })

    let visible = true
    const onVis = () => { visible = document.visibilityState === 'visible' }
    document.addEventListener('visibilitychange', onVis)

    const connDistSq = connectionDistance * connectionDistance
    const highlightRSq = mouseHighlightRadius * mouseHighlightRadius

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw)
      if (!visible) return
      if (now - lastTimeRef.current < FRAME_MS) return
      lastTimeRef.current = now

      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const hasMouse = mouse !== null
      const cx = w / 2
      const cy = h / 2

      // Slowly spin the ring by rotating the canvas transform each frame (desktop only)
      if (rotationSpeed && isCircleActiveRef.current) {
        rotationRef.current += rotationSpeed
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rotationRef.current)
        ctx.translate(-cx, -cy)
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy

        if (isCircleActiveRef.current) {
          const dx = a.x - cx
          const dy = a.y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const outerBound = effectiveOuterRadiusRef.current
          if (dist > outerBound) {
            // Bounce off outer wall — reflect inward
            const nx = dx / dist
            const ny = dy / dist
            const dot = a.vx * nx + a.vy * ny
            a.vx -= 2 * dot * nx
            a.vy -= 2 * dot * ny
            a.x = cx + nx * (outerBound - 0.5)
            a.y = cy + ny * (outerBound - 0.5)
          } else if (innerRadiusPx && dist < innerRadiusPx) {
            // Bounce off inner hole wall — reflect outward
            const nx = dist > 0 ? dx / dist : 1
            const ny = dist > 0 ? dy / dist : 0
            const dot = a.vx * nx + a.vy * ny
            a.vx -= 2 * dot * nx
            a.vy -= 2 * dot * ny
            a.x = cx + nx * (innerRadiusPx + 0.5)
            a.y = cy + ny * (innerRadiusPx + 0.5)
          }
        } else {
          if (a.x < 0 || a.x > w) a.vx *= -1
          if (a.y < 0 || a.y > h) a.vy *= -1
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq > connDistSq) continue

          const dist = Math.sqrt(distSq)
          let alpha = (1 - dist / connectionDistance) * lineAlpha
          let proximity = 0

          if (hasMouse) {
            const mx = (a.x + b.x) * 0.5 - mouse!.x
            const my = (a.y + b.y) * 0.5 - mouse!.y
            const mdSq = mx * mx + my * my
            if (mdSq < highlightRSq) {
              proximity = 1 - Math.sqrt(mdSq) / mouseHighlightRadius
              alpha *= 1 + proximity * (mouseHighlightIntensity - 1)
            }
          }

          const r = Math.round(lerp(baseR, hlR, proximity))
          const g = Math.round(lerp(baseG, hlG, proximity))
          const b2 = Math.round(lerp(baseB, hlB, proximity))

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b2}, ${Math.min(alpha, 0.5)})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        let alpha = particleAlpha
        let proximity = 0

        if (hasMouse) {
          const dx = n.x - mouse!.x
          const dy = n.y - mouse!.y
          const dSq = dx * dx + dy * dy
          if (dSq < highlightRSq) {
            proximity = 1 - Math.sqrt(dSq) / mouseHighlightRadius
            alpha = Math.min(alpha * (1 + proximity * (mouseHighlightIntensity - 1)), 1)
          }
        }

        const r = Math.round(lerp(baseR, hlR, proximity))
        const g = Math.round(lerp(baseG, hlG, proximity))
        const b2 = Math.round(lerp(baseB, hlB, proximity))

        ctx.globalAlpha = alpha
        ctx.fillStyle = `rgb(${r}, ${g}, ${b2})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (rotationSpeed && isCircleActiveRef.current) ctx.restore()
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [buildNodes, connectionDistance, lineAlpha, particleAlpha, mouseHighlightRadius, mouseHighlightIntensity, circleConstraint, circleRadiusPx, circleCoverViewport, innerRadiusPx, rotationSpeed, nodeColor, highlightColor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
