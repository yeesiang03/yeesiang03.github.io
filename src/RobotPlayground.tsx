import { useRef, useEffect, useCallback } from 'react'

/* ------------------------------------------------------------------ */
/*  RobotPlayground — Full-hero interactive canvas                    */
/*  - Transparent overlay covering the entire hero section             */
/*  - Ball bounces off text element bounding boxes with color burst    */
/* ------------------------------------------------------------------ */

interface Point { x: number; y: number }
interface Rect { x: number; y: number; w: number; h: number }
function dist(a: { x: number; y: number }, b: { x: number; y: number }) { return Math.hypot(a.x - b.x, a.y - b.y) }
function angleBetween(a: { x: number; y: number }, b: { x: number; y: number }) { return Math.atan2(b.y - a.y, b.x - a.x) }
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

const SPIN_EFFECT_COLORS = [
  '#ff4fd8', '#8a68ff', '#46d9ff', '#58f5ad', '#f5ef67', '#ff8a55',
]

interface RobotPlaygroundProps {
  textRefs?: React.RefObject<HTMLElement>[]
}

/* ---- Happy burst particle ----------------------------------------- */
interface BurstParticle {
  x: number; y: number; vx: number; vy: number
  life: number; maxLife: number
  size: number; type: 'spark' | 'ring' | 'plus'
  rotation: number; rotSpeed: number
  color: string
}

/* ---- Robot state -------------------------------------------------- */
interface RobotState {
  x: number; y: number; scale: number
  blinkTimer: number; blinkState: number; blinkDuration: number
  expression: 'happy' | 'curious' | 'surprised' | 'sleepy' | 'ecstatic' | 'sad'
  armReach: number
  bounceY: number; bounceVel: number
  holdingBall: boolean
  holdTimer: number
  catchFlash: number
  walkSpeed: number
  wheelRotation: number
  facing: number // -1 left, 1 right
}

export default function RobotPlayground({ textRefs = [] }: RobotPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRectsRef = useRef<Rect[]>([])
  const textRefsRef = useRef(textRefs)
  textRefsRef.current = textRefs
  const stateRef = useRef({
    ball: { x: 0, y: 0, r: 16, dragging: false, vx: 0, vy: 0, released: false, squash: 0, rotation: 0, rotSpeed: 0 },
    robot: {
      x: 0, y: 0, scale: 2.2,
      blinkTimer: 0, blinkState: 0, blinkDuration: 0,
      expression: 'happy' as RobotState['expression'],
      armReach: 0,
      bounceY: 0, bounceVel: 0,
      holdingBall: false,
      holdTimer: 0,
      catchFlash: 0,
      walkSpeed: 0,
      wheelRotation: 0,
      facing: -1,
    } as RobotState,
    bursts: [] as BurstParticle[],
    mouse: { x: -1000, y: -1000, down: false },
    width: 0, height: 0, dpr: 1,
    lastBallPos: { x: 0, y: 0 },
    ballTrail: [] as { x: number; y: number; life: number }[],
  })
  const rafRef = useRef<number>(0)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = stateRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    s.dpr = dpr
    const rect = canvas.getBoundingClientRect()
    s.width = rect.width
    s.height = rect.height
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Only set initial ball/robot position on first init (when positions are 0)
    if (s.robot.x === 0 && s.robot.y === 0) {
      s.robot.x = rect.width * 0.72
      s.robot.y = rect.height * 0.55
      s.ball.x = rect.width * 0.15
      s.ball.y = rect.height * 0.4
      s.lastBallPos = { x: s.ball.x, y: s.ball.y }
    }

    // Compute text element bounding rects relative to canvas
    const canvasRect = canvas.getBoundingClientRect()
    textRectsRef.current = textRefsRef.current
      .map((ref) => {
        const el = ref.current
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          x: r.left - canvasRect.left,
          y: r.top - canvasRect.top,
          w: r.width,
          h: r.height,
        }
      })
      .filter((r): r is Rect => r !== null)
  }, [])

  useEffect(() => {
    init()
    const handleResize = () => init()
    window.addEventListener('resize', handleResize)
    // Recompute text rects after layout settles (fonts/images may shift positions)
    const delayed = setTimeout(init, 300)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(delayed)
    }
  }, [init])

  /* ---- Pointer handling ------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = stateRef.current

    const getPos = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onDown = (e: PointerEvent) => {
      const p = getPos(e)
      s.mouse.down = true
      s.mouse.x = p.x
      s.mouse.y = p.y
      const d = dist(p, { x: s.ball.x, y: s.ball.y })
      if (d < s.ball.r + 32) {
        s.ball.dragging = true
        s.ball.vx = 0
        s.ball.vy = 0
        s.ball.released = false
        s.robot.holdingBall = false
        try { canvas.setPointerCapture(e.pointerId) } catch { /* ignore */ }
      }
    }

    const onMove = (e: PointerEvent) => {
      const p = getPos(e)
      s.mouse.x = p.x
      s.mouse.y = p.y
      if (s.ball.dragging) {
        const newX = clamp(p.x, s.ball.r, s.width - s.ball.r)
        const newY = clamp(p.y, s.ball.r, s.height - s.ball.r)
        // Track velocity for release toss
        s.ball.vx = (newX - s.ball.x) * 0.6
        s.ball.vy = (newY - s.ball.y) * 0.6
        s.ball.x = newX
        s.ball.y = newY
      }
    }

    const onUp = (e: PointerEvent) => {
      s.mouse.down = false
      if (s.ball.dragging) {
        s.ball.dragging = false
        s.ball.released = true
      }
      try { canvas.releasePointerCapture(e.pointerId) } catch { /* ignore */ }
    }

    const preventTouch = (e: TouchEvent) => {
      if (e.target === canvas) e.preventDefault()
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('touchstart', preventTouch, { passive: false })
    canvas.addEventListener('touchmove', preventTouch, { passive: false })

    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('touchstart', preventTouch)
      canvas.removeEventListener('touchmove', preventTouch)
    }
  }, [])

  /* ---- Spawn colorful spin burst on text collision ---------------- */
  const spawnSpinBurst = (cx: number, cy: number) => {
    const s = stateRef.current
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.2
      const speed = 2 + Math.random() * 4
      const color = SPIN_EFFECT_COLORS[Math.floor(Math.random() * SPIN_EFFECT_COLORS.length)]
      s.bursts.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 50 + Math.random() * 30,
        maxLife: 80,
        size: 3 + Math.random() * 4,
        type: 'spark',
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        color,
      })
    }
    // Neon rings
    for (let c = 0; c < 3; c++) {
      const color = SPIN_EFFECT_COLORS[c % SPIN_EFFECT_COLORS.length]
      s.bursts.push({
        x: cx, y: cy, vx: 0, vy: 0,
        life: 35 + c * 10, maxLife: 35 + c * 10,
        size: 10 + c * 5, type: 'ring',
        rotation: 0, rotSpeed: 0,
        color,
      })
    }
    // Color plus signs
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2
      const color = SPIN_EFFECT_COLORS[Math.floor(Math.random() * SPIN_EFFECT_COLORS.length)]
      s.bursts.push({
        x: cx + Math.cos(angle) * 25, y: cy + Math.sin(angle) * 25,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        life: 40 + Math.random() * 20,
        maxLife: 60,
        size: 6 + Math.random() * 4,
        type: 'plus',
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        color,
      })
    }
  }

  /* ---- Animation Loop --------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const s = stateRef.current

    /* ================================================================ */
    /*  Redesigned Robot — geometric, minimalist, stylish               */
    /* ================================================================ */
    const drawRobot = (time: number) => {
      const r = s.robot
      const { x, scale } = r
      const floatY = Math.sin(time * 0.0025) * 3 * scale + r.bounceY
      const ry = r.y + floatY

      // Compact floating companion proportions
      const bodyW = 64 * scale
      const bodyH = 48 * scale
      const headR = 34 * scale
      const eyeR = 7 * scale
      const hue = 242 + Math.sin(time * 0.0012) * 28
      const neon = `hsl(${hue}, 100%, 70%)`

      ctx.save()

      /* ---- Soft hover shadow ---- */
      const shadow = ctx.createRadialGradient(x, ry + bodyH, 0, x, ry + bodyH, bodyW * 0.75)
      shadow.addColorStop(0, 'rgba(115,105,255,0.22)')
      shadow.addColorStop(0.5, 'rgba(80,220,255,0.08)')
      shadow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = shadow
      ctx.beginPath()
      ctx.ellipse(x, ry + bodyH / 2 + 24 * scale, bodyW * 0.72, 13 * scale, 0, 0, Math.PI * 2)
      ctx.fill()

      /* ---- Hover engine ---- */
      const engineGrad = ctx.createLinearGradient(x - 18 * scale, 0, x + 18 * scale, 0)
      engineGrad.addColorStop(0, '#46d9ff')
      engineGrad.addColorStop(0.35, '#548dff')
      engineGrad.addColorStop(0.7, '#806dff')
      engineGrad.addColorStop(1, '#b45cff')
      ctx.strokeStyle = engineGrad
      ctx.lineWidth = 3 * scale
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(x - 17 * scale, ry + bodyH / 2 + 7 * scale)
      ctx.lineTo(x + 17 * scale, ry + bodyH / 2 + 7 * scale)
      ctx.stroke()

      /* ---- Body — dark glass capsule with a chromatic edge ---- */
      const bodyGrad = ctx.createLinearGradient(x - bodyW / 2, ry - bodyH / 2, x + bodyW / 2, ry + bodyH / 2)
      bodyGrad.addColorStop(0, '#20232b')
      bodyGrad.addColorStop(0.5, '#111319')
      bodyGrad.addColorStop(1, '#07080c')
      ctx.fillStyle = bodyGrad
      roundRect(ctx, x - bodyW / 2, ry - bodyH / 2, bodyW, bodyH, 19 * scale)
      ctx.fill()
      ctx.strokeStyle = engineGrad
      ctx.lineWidth = 1.4 * scale
      roundRect(ctx, x - bodyW / 2, ry - bodyH / 2, bodyW, bodyH, 19 * scale)
      ctx.stroke()

      /* ---- Chest display ---- */
      const chestW = 38 * scale
      const chestH = 16 * scale
      const chestX = x - chestW / 2
      const chestY = ry - chestH / 2
      ctx.fillStyle = 'rgba(0,0,0,0.72)'
      roundRect(ctx, chestX, chestY, chestW, chestH, 8 * scale)
      ctx.fill()

      ctx.fillStyle = r.holdingBall ? '#64e9ff' : neon
      ctx.font = `bold ${7 * scale}px "Courier New", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const statusText = r.holdingBall ? 'YAY!' : Math.sin(time * 0.003) > 0.8 ? 'hi!' : 'AI'
      ctx.fillText(statusText, x, ry + 1 * scale)

      // Status LED
      ctx.fillStyle = r.holdingBall ? '#64e9ff' : '#8a68ff'
      ctx.beginPath()
      ctx.arc(x + chestW / 2 - 3 * scale, chestY + 3 * scale, 1.5 * scale, 0, Math.PI * 2)
      ctx.fill()

      /* ---- Floating neck light ---- */
      ctx.strokeStyle = '#47d7ff'
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.moveTo(x, ry - bodyH / 2)
      ctx.lineTo(x, ry - bodyH / 2 - 6 * scale)
      ctx.stroke()

      /* ---- Head — soft ceramic shell ---- */
      const headW = 72 * scale
      const headH = 56 * scale
      const headCY = ry - bodyH / 2 - 6 * scale - headH * 0.5
      const headX = x - headW / 2
      const headY = headCY - headH / 2
      const headGrad = ctx.createLinearGradient(headX, headY, headX, headY + headH)
      headGrad.addColorStop(0, '#fbfcff')
      headGrad.addColorStop(0.48, '#dfe3eb')
      headGrad.addColorStop(1, '#9ba2b1')
      ctx.fillStyle = headGrad
      roundRect(ctx, headX, headY, headW, headH, 23 * scale)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.72)'
      ctx.lineWidth = 1.2 * scale
      roundRect(ctx, headX + 1 * scale, headY + 1 * scale, headW - 2 * scale, headH - 2 * scale, 22 * scale)
      ctx.stroke()

      /* ---- Floating neon halo ---- */
      const haloY = headY - 10 * scale
      ctx.strokeStyle = engineGrad
      ctx.lineWidth = 2.2 * scale
      ctx.beginPath()
      ctx.ellipse(x, haloY, (22 + Math.sin(time * 0.003) * 2) * scale, 5 * scale, 0, 0, Math.PI * 2)
      ctx.stroke()
      if (r.holdingBall) {
        const glowGrad = ctx.createRadialGradient(x, haloY, 0, x, haloY, 30 * scale)
        glowGrad.addColorStop(0, 'rgba(126,104,255,0.25)')
        glowGrad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(x, haloY, 30 * scale, 0, Math.PI * 2)
        ctx.fill()
      }

      /* ---- Face screen — inset pill ---- */
      const faceW = 58 * scale
      const faceH = 40 * scale
      const faceX = x - faceW / 2
      const faceY = headCY - faceH / 2
      const faceGrad = ctx.createLinearGradient(faceX, faceY, faceX, faceY + faceH)
      faceGrad.addColorStop(0, '#090a10')
      faceGrad.addColorStop(1, '#020306')
      ctx.fillStyle = faceGrad
      roundRect(ctx, faceX, faceY, faceW, faceH, 16 * scale)
      ctx.fill()
      ctx.strokeStyle = 'rgba(124,248,255,0.22)'
      ctx.lineWidth = 0.8 * scale
      roundRect(ctx, faceX, faceY, faceW, faceH, 16 * scale)
      ctx.stroke()

      /* ---- Eyes ---- */
      const eyeOffsetX = 10 * scale
      const eyeY = headCY - 2 * scale
      const expr = r.expression

      // Pupil tracking
      const lookAngle = angleBetween({ x, y: headCY }, { x: s.ball.x, y: s.ball.y })
      const lookDist = Math.min(dist({ x, y: headCY }, { x: s.ball.x, y: s.ball.y }) * 0.03, 3 * scale)
      const px = Math.cos(lookAngle) * lookDist
      const py = Math.sin(lookAngle) * lookDist

      if (r.blinkState === 1) {
        // Blinking — horizontal lines
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 1.5 * scale
        ctx.lineCap = 'round'
        for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
          ctx.beginPath()
          ctx.moveTo(ex - eyeR * 0.7, eyeY)
          ctx.lineTo(ex + eyeR * 0.7, eyeY)
          ctx.stroke()
        }
      } else if (expr === 'ecstatic' || expr === 'happy') {
        // Happy — upward arc eyes (^^)
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2 * scale
        ctx.lineCap = 'round'
        for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
          ctx.beginPath()
          ctx.arc(ex + px * 0.3, eyeY + py * 0.3 + 2 * scale, eyeR * 0.6, Math.PI * 1.15, Math.PI * 1.85)
          ctx.stroke()
        }
        if (expr === 'ecstatic') {
          // Extra sparkle in eyes
          ctx.fillStyle = `rgba(255,255,255,${0.6 + Math.sin(time * 0.02) * 0.3})`
          for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
            ctx.beginPath()
            ctx.arc(ex + eyeR * 0.4, eyeY - eyeR * 0.3, 1.5 * scale, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      } else if (expr === 'surprised') {
        // Surprised — wide circles
        ctx.fillStyle = '#fff'
        for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
          ctx.beginPath()
          ctx.arc(ex + px, eyeY + py, eyeR * 0.75, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (expr === 'curious') {
        // Curious — one eye bigger (winking-ish)
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(x - eyeOffsetX + px, eyeY + py, eyeR * 0.65, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 1.5 * scale
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.arc(x + eyeOffsetX + px * 0.5, eyeY + py * 0.5 + 1 * scale, eyeR * 0.5, Math.PI * 1.15, Math.PI * 1.85)
        ctx.stroke()
      } else if (expr === 'sad') {
        // Sad — downward arc eyes (\ \) with tears
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2 * scale
        ctx.lineCap = 'round'
        for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
          ctx.beginPath()
          ctx.arc(ex + px * 0.3, eyeY + py * 0.3 - 2 * scale, eyeR * 0.6, Math.PI * 0.15, Math.PI * 0.85)
          ctx.stroke()
        }
        // Tears
        const tearAlpha = 0.5 + Math.sin(time * 0.01) * 0.2
        ctx.fillStyle = `rgba(180,200,255,${tearAlpha})`
        for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
          const tearY = eyeY + 4 * scale + (Math.sin(time * 0.005 + ex) * 2 * scale)
          ctx.beginPath()
          ctx.ellipse(ex, tearY, 1.5 * scale, 3 * scale, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        // Sleepy — half-lidded
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2 * scale
        ctx.lineCap = 'round'
        for (const ex of [x - eyeOffsetX, x + eyeOffsetX]) {
          ctx.beginPath()
          ctx.moveTo(ex - eyeR * 0.6, eyeY - 1 * scale)
          ctx.lineTo(ex + eyeR * 0.6, eyeY + 1 * scale)
          ctx.stroke()
        }
      }

      /* ---- Mouth ---- */
      const mouthY = headCY + 10 * scale
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.5 * scale
      ctx.lineCap = 'round'
      ctx.beginPath()
      if (expr === 'ecstatic') {
        // Big open smile
        ctx.arc(x, mouthY - 1 * scale, 7 * scale, 0.15 * Math.PI, 0.85 * Math.PI)
        ctx.fillStyle = '#fff'
        ctx.fill()
        // Tongue / inner
        ctx.fillStyle = '#0a0a0a'
        ctx.beginPath()
        ctx.arc(x, mouthY + 3 * scale, 4 * scale, 0.1 * Math.PI, 0.9 * Math.PI)
        ctx.fill()
      } else if (expr === 'happy') {
        ctx.arc(x, mouthY, 5 * scale, 0.2 * Math.PI, 0.8 * Math.PI)
      } else if (expr === 'surprised') {
        ctx.arc(x, mouthY + 2 * scale, 3 * scale, 0, Math.PI * 2)
      } else if (expr === 'curious') {
        ctx.moveTo(x - 4 * scale, mouthY + 1 * scale)
        ctx.lineTo(x + 2 * scale, mouthY + 1 * scale)
      } else if (expr === 'sad') {
        // Sad — downward arc frown
        ctx.arc(x, mouthY + 6 * scale, 5 * scale, 1.2 * Math.PI, 1.8 * Math.PI)
      } else {
        ctx.arc(x, mouthY + 2 * scale, 3 * scale, 0.1 * Math.PI, 0.9 * Math.PI)
      }
      ctx.stroke()

      /* ---- Cheek marks when ecstatic ---- */
      if (expr === 'ecstatic') {
        ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.sin(time * 0.01) * 0.05})`
        for (const ex of [x - headR * 0.65, x + headR * 0.65]) {
          ctx.beginPath()
          ctx.arc(ex, headCY + 4 * scale, 3 * scale, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      /* ---- Arms — reach toward ball ---- */
      const shoulderY = ry - bodyH * 0.05
      const shoulderLeft = { x: x - bodyW / 2 - 2 * scale, y: shoulderY }
      const shoulderRight = { x: x + bodyW / 2 + 2 * scale, y: shoulderY }
      const armLen = 40 * scale
      const ballDir = angleBetween({ x, y: ry }, { x: s.ball.x, y: s.ball.y })
      const ballDist = dist({ x, y: ry }, { x: s.ball.x, y: s.ball.y })
      const reachTarget = ballDist < 130 * scale ? ballDist * 0.5 : armLen * 0.8
      r.armReach += (reachTarget - r.armReach) * 0.08
      const reachAngle = ballDir

      const leftHand = {
        x: shoulderLeft.x + Math.cos(reachAngle - 0.25) * r.armReach,
        y: shoulderLeft.y + Math.sin(reachAngle - 0.25) * r.armReach,
      }
      const rightHand = {
        x: shoulderRight.x + Math.cos(reachAngle + 0.25) * r.armReach,
        y: shoulderRight.y + Math.sin(reachAngle + 0.25) * r.armReach,
      }

      // Arms — slim chromatic cables
      ctx.strokeStyle = engineGrad
      ctx.lineWidth = 3 * scale
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (const [sh, hd] of [[shoulderLeft, leftHand], [shoulderRight, rightHand]] as [Point, Point][]) {
        const elbow = {
          x: (sh.x + hd.x) / 2 + Math.sin(reachAngle) * 6 * scale,
          y: (sh.y + hd.y) / 2 - 6 * scale,
        }
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(elbow.x, elbow.y)
        ctx.lineTo(hd.x, hd.y)
        ctx.stroke()
        // Joint light
        ctx.fillStyle = '#47d7ff'
        ctx.beginPath()
        ctx.arc(elbow.x, elbow.y, 2.4 * scale, 0, Math.PI * 2)
        ctx.fill()
      }

      /* ---- Hands — small luminous pods ---- */
      for (const hd of [leftHand, rightHand]) {
        ctx.fillStyle = '#11131a'
        ctx.strokeStyle = neon
        ctx.lineWidth = 1.4 * scale
        ctx.beginPath()
        ctx.arc(hd.x, hd.y, 5 * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      /* ---- Catch flash — radial burst around robot ---- */
      if (r.catchFlash > 0) {
        const flashAlpha = r.catchFlash / 20
        const flashR = (1 - r.catchFlash / 20) * 80 * scale + 20
        const flashGrad = ctx.createRadialGradient(x, ry, 0, x, ry, flashR)
        flashGrad.addColorStop(0, `rgba(255,255,255,${flashAlpha * 0.3})`)
        flashGrad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = flashGrad
        ctx.beginPath()
        ctx.arc(x, ry, flashR, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    /* ---- Draw ball ---- */
    const drawBall = () => {
      const { x, y, r } = s.ball
      const sq = s.ball.squash
      const isSpinning = Math.abs(s.ball.rotSpeed) > 0.01
      ctx.save()

      // Trail
      for (let i = 0; i < s.ballTrail.length; i++) {
        const t = s.ballTrail[i]
        const alpha = (t.life / 15) * 0.15
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(t.x, t.y, r * (t.life / 15) * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // The ball stays white; only the spinning aura becomes colorful.
      const glow = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 3)
      glow.addColorStop(0, isSpinning ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.2)')
      glow.addColorStop(0.45, isSpinning ? 'rgba(138,104,255,0.14)' : 'rgba(255,255,255,0.06)')
      glow.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, r * 3, 0, Math.PI * 2)
      ctx.fill()

      // Ball body — with squash/stretch on bounce + rotation
      ctx.translate(x, y)
      ctx.rotate(s.ball.rotation)
      ctx.scale(1 + sq, 1 - sq)
      ctx.translate(-x, -y)

      const ballGrad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.08, x, y, r)
      ballGrad.addColorStop(0, '#ffffff')
      ballGrad.addColorStop(0.72, '#f2f4f8')
      ballGrad.addColorStop(1, '#cfd4df')
      ctx.fillStyle = ballGrad
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.stroke()

      // Rainbow rotation effect drawn over the white ball.
      if (isSpinning) {
        const spinGrad = ctx.createConicGradient(0, x, y)
        spinGrad.addColorStop(0, '#ff4fd8')
        spinGrad.addColorStop(0.17, '#8a68ff')
        spinGrad.addColorStop(0.34, '#46d9ff')
        spinGrad.addColorStop(0.51, '#58f5ad')
        spinGrad.addColorStop(0.68, '#f5ef67')
        spinGrad.addColorStop(0.84, '#ff8a55')
        spinGrad.addColorStop(1, '#ff4fd8')
        ctx.strokeStyle = spinGrad
        ctx.lineWidth = 2.2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.arc(x, y, r * 0.72, -0.2, 1.35)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x, y, r * 0.72, Math.PI - 0.2, Math.PI + 1.15)
        ctx.stroke()
      }

      // Subtle rotation marker
      ctx.strokeStyle = isSpinning ? 'rgba(0,0,0,0.14)' : 'rgba(0,0,0,0.26)'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(x, y - r * 0.55)
      ctx.lineTo(x, y + r * 0.55)
      ctx.stroke()

      ctx.restore()
    }

    /* ---- Draw burst particles ---- */
    const drawBursts = () => {
      ctx.save()
      for (const p of s.bursts) {
        const alpha = p.life / p.maxLife
        const col = p.color || '#fff'
        if (p.type === 'spark') {
          ctx.fillStyle = col
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === 'ring') {
          ctx.strokeStyle = col
          ctx.globalAlpha = alpha * 0.6
          ctx.lineWidth = 2 * alpha
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.stroke()
        } else if (p.type === 'plus') {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.strokeStyle = col
          ctx.globalAlpha = alpha
          ctx.lineWidth = 1.5 * alpha
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(-p.size, 0)
          ctx.lineTo(p.size, 0)
          ctx.moveTo(0, -p.size)
          ctx.lineTo(0, p.size)
          ctx.stroke()
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
      ctx.restore()
    }

    /* ---- Draw hint ---- */
    const drawHint = () => {
      ctx.save()
      ctx.font = '11px "Inter", sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.textAlign = 'center'
      ctx.fillText('drag the ball to play', s.width / 2, s.height - 16)
      ctx.restore()
    }

    /* ---- Main loop ---- */
    const loop = (time: number) => {
      const dpr = s.dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, s.width, s.height)

      // Ball trail
      if (s.ball.dragging) {
        s.ballTrail.push({ x: s.ball.x, y: s.ball.y, life: 15 })
      }
      for (let i = s.ballTrail.length - 1; i >= 0; i--) {
        s.ballTrail[i].life--
        if (s.ballTrail[i].life <= 0) s.ballTrail.splice(i, 1)
      }
      if (s.ballTrail.length > 20) s.ballTrail.shift()

      // Ball bounce physics when released (not dragging, not held by robot)
      const r = s.robot
      if (s.ball.released && !r.holdingBall) {
        // Check if currently overlapping a text rect (slower fall through text)
        let inText = false
        for (const tr of textRectsRef.current) {
          const cx = clamp(s.ball.x, tr.x, tr.x + tr.w)
          const cy = clamp(s.ball.y, tr.y, tr.y + tr.h)
          if ((s.ball.x - cx) ** 2 + (s.ball.y - cy) ** 2 < s.ball.r * s.ball.r) {
            inText = true
            break
          }
        }
        s.ball.vy += inText ? 0.12 : 0.45 // gravity (gentler while falling through text)
        s.ball.vx *= 0.99 // air friction
        s.ball.x += s.ball.vx
        s.ball.y += s.ball.vy

        const floorY = s.height - s.ball.r
        const ceilY = s.ball.r
        const leftX = s.ball.r
        const rightX = s.width - s.ball.r

        // Floor bounce
        if (s.ball.y > floorY) {
          s.ball.y = floorY
          if (Math.abs(s.ball.vy) > 0.5) {
            s.ball.vy *= -0.72
            s.ball.squash = Math.min(Math.abs(s.ball.vy) * 0.04, 0.5)
            spawnSpinBurst(s.ball.x, floorY)
          } else {
            s.ball.vy = 0
          }
          s.ball.vx *= 0.85 // floor friction
        }
        // Ceiling bounce
        if (s.ball.y < ceilY) {
          s.ball.y = ceilY
          s.ball.vy *= -0.6
          spawnSpinBurst(s.ball.x, ceilY)
        }
        // Wall bounce
        if (s.ball.x < leftX) {
          s.ball.x = leftX
          s.ball.vx *= -0.7
          s.ball.squash = Math.min(Math.abs(s.ball.vx) * 0.04, 0.4)
          spawnSpinBurst(leftX, s.ball.y)
        }
        if (s.ball.x > rightX) {
          s.ball.x = rightX
          s.ball.vx *= -0.7
          s.ball.squash = Math.min(Math.abs(s.ball.vx) * 0.04, 0.4)
          spawnSpinBurst(rightX, s.ball.y)
        }

        // Text rect collision — rotate and slowly fall through (no bounce)
        for (const tr of textRectsRef.current) {
          const closestX = clamp(s.ball.x, tr.x, tr.x + tr.w)
          const closestY = clamp(s.ball.y, tr.y, tr.y + tr.h)
          const dx = s.ball.x - closestX
          const dy = s.ball.y - closestY
          const d2 = dx * dx + dy * dy
          if (d2 < s.ball.r * s.ball.r) {
            // Start spinning if not already
            if (Math.abs(s.ball.rotSpeed) < 0.05) {
              s.ball.rotSpeed = (Math.random() > 0.5 ? 1 : -1) * (0.12 + Math.random() * 0.18)
            }
            // Kill any upward velocity, enforce slow downward fall
            if (s.ball.vy < 0.8) s.ball.vy = 0.8
            s.ball.vx *= 0.82
            s.ball.squash = 0.2
            // Rainbow burst at contact point
            spawnSpinBurst(closestX, closestY)
            break
          }
        }

        // Settle to rest
        if (Math.abs(s.ball.vy) < 0.3 && Math.abs(s.ball.vx) < 0.1 && s.ball.y >= floorY - 1) {
          s.ball.vy = 0
          s.ball.vx = 0
          s.ball.released = false
        }
      }

      // Squash decay
      s.ball.squash *= 0.85
      // Rotation decay (air friction slows spin)
      s.ball.rotation += s.ball.rotSpeed
      s.ball.rotSpeed *= 0.992
      if (Math.abs(s.ball.rotSpeed) < 0.002) s.ball.rotSpeed = 0

      // Robot logic — check if ball is close enough to "catch"
      const ballDist = dist({ x: r.x, y: r.y }, { x: s.ball.x, y: s.ball.y })
      const catchRadius = 50

      if (ballDist < catchRadius && !r.holdingBall && !s.ball.dragging) {
        // Robot catches the ball!
        r.holdingBall = true
        r.holdTimer = 0
        r.catchFlash = 20
        r.bounceVel = -4
        spawnSpinBurst(r.x, r.y - 20)
      }

      if (r.holdingBall) {
        r.holdTimer++
        // Ball sticks to robot hands
        if (!s.ball.dragging) {
          const targetX = r.x
          const targetY = r.y - 10
          s.ball.x = lerp(s.ball.x, targetX, 0.15)
          s.ball.y = lerp(s.ball.y, targetY, 0.15)
        }
        // Release after a while if user drags
        if (s.ball.dragging) {
          r.holdingBall = false
        }
        // Periodic mini-bursts while holding
        if (r.holdTimer % 40 === 0 && r.holdTimer < 120) {
          spawnSpinBurst(r.x + (Math.random() - 0.5) * 30, r.y - 15 + (Math.random() - 0.5) * 20)
        }
        // Auto-release after 2 seconds
        if (r.holdTimer > 120) {
          r.holdingBall = false
          // Fling ball back to left
          s.ball.x = lerp(s.ball.x, s.width * 0.25, 0.01)
        }
      }

      // Bounce physics
      r.bounceVel += 0.3
      r.bounceY += r.bounceVel
      if (r.bounceY > 0) {
        r.bounceY = 0
        r.bounceVel = 0
      }

      // Catch flash decay
      if (r.catchFlash > 0) r.catchFlash--

      // Expression logic
      if (r.holdingBall) {
        r.expression = 'ecstatic'
      } else if (ballDist < 65) {
        r.expression = 'surprised'
      } else if (ballDist < 110) {
        r.expression = 'happy'
      } else if (ballDist < 170) {
        r.expression = 'curious'
      } else if (ballDist > 220) {
        r.expression = 'sad'
      } else {
        r.expression = 'sleepy'
      }

      // Blink
      r.blinkTimer++
      if (r.blinkState === 0 && r.blinkTimer > 140 + Math.random() * 220) {
        r.blinkState = 1
        r.blinkDuration = 0
        r.blinkTimer = 0
      }
      if (r.blinkState === 1) {
        r.blinkDuration++
        if (r.blinkDuration > 7) {
          r.blinkState = 0
          r.blinkTimer = 0
        }
      }

      // Update burst particles
      for (let i = s.bursts.length - 1; i >= 0; i--) {
        const p = s.bursts[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08 // gravity
        p.vx *= 0.98
        p.rotation += p.rotSpeed
        if (p.type === 'ring') {
          p.size += 1.5
        }
        p.life--
        if (p.life <= 0) s.bursts.splice(i, 1)
      }

      drawRobot(time)
      drawBall()
      drawBursts()
      drawHint()

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />
    </div>
  )
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.lineTo(x + w - rr, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr)
  ctx.lineTo(x + w, y + h - rr)
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h)
  ctx.lineTo(x + rr, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr)
  ctx.lineTo(x, y + rr)
  ctx.quadraticCurveTo(x, y, x + rr, y)
  ctx.closePath()
}
