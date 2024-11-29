import { useEffect, useRef } from 'react'

interface TimeRulerProps {
  width: number
  zoom: number
}

export function TimeRuler({ width, zoom }: TimeRulerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = 30

    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#2a2a2a'
    ctx.fillStyle = '#9d4edd'
    ctx.font = '10px Arial'
    ctx.textAlign = 'center'

    const beatWidth = 80 * zoom
    const beatsPerMeasure = 4
    const totalBeats = Math.ceil(width / beatWidth)

    for (let i = 0; i < totalBeats; i++) {
      const x = i * beatWidth
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, i % beatsPerMeasure === 0 ? 20 : 10)
      ctx.stroke()

      if (i % beatsPerMeasure === 0) {
        ctx.fillText((i / beatsPerMeasure + 1).toString(), x, 28)
      }
    }
  }, [width, zoom])

  return <canvas ref={canvasRef} className="w-full h-[30px]" />
}

