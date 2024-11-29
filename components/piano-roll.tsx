'use client'

import { useEffect, useRef, useState } from 'react'
import { usePianoRoll } from '@/contexts/piano-roll-context'

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NOTE_HEIGHT = 20
const BEAT_WIDTH = 20

interface Note {
  pitch: number;
  start: number;
  duration: number;
}

export function PianoRoll() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const { zoom } = usePianoRoll()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = '#2a2a2a'
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += BEAT_WIDTH * zoom) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += NOTE_HEIGHT) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      ctx.fillStyle = '#a78bfa' // Soft purple color
      notes.forEach(note => {
        ctx.fillRect(
          note.start * BEAT_WIDTH * zoom,
          canvas.height - (note.pitch + 1) * NOTE_HEIGHT,
          note.duration * BEAT_WIDTH * zoom,
          NOTE_HEIGHT
        )
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const pitch = Math.floor((canvas.height - y) / NOTE_HEIGHT)
      const start = x / (BEAT_WIDTH * zoom)

      setNotes([...notes, { pitch, start, duration: 1 }])
    }

    drawGrid()
    canvas.addEventListener('mousedown', handleMouseDown)

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawGrid()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousedown', handleMouseDown)
    }
  }, [zoom, notes])

  return (
    <div className="h-full bg-gray-900 text-gray-100">
      <div className="h-full border-l border-gray-700">
        <div className="flex">
          <div className="w-16 bg-gray-800 border-r border-gray-700">
            {Array.from({ length: 36 }).map((_, i) => {
              const noteIndex = (11 - (i % 12))
              const octave = 5 - Math.floor(i / 12)
              const isBlackKey = [1, 3, 6, 8, 10].includes(noteIndex)
              return (
                <div
                  key={i}
                  className={`h-[20px] border-b border-gray-600 flex items-center justify-end pr-1 text-xs ${
                    isBlackKey
                      ? 'bg-gray-700 h-[10px] border-r border-gray-600' 
                      : 'bg-gray-800'
                  }`}
                >
                  {!isBlackKey && `${NOTES[noteIndex]}${octave}`}
                </div>
              )
            })}
          </div>
          <div className="flex-1">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

