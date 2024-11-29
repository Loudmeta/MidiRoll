'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Square, ZoomIn, ZoomOut, Pencil, Eraser, Volume2, Grid, Save, Download, Upload } from 'lucide-react'

export function LeftSidebar() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil')
  const [zoom, setZoom] = useState(1)
  const [volume, setVolume] = useState(75)
  const [quantize, setQuantize] = useState(false)
  const [quantizeValue, setQuantizeValue] = useState(0.25)

  return (
    <div className="h-full p-4 flex flex-col gap-6 overflow-y-auto bg-gray-800 text-gray-100">
      {/* Playback Controls */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-400">Playback</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:bg-purple-500/20 hover:text-purple-400"
          >
            {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-400">Tools</h2>
        <div className="flex gap-2">
          <Button
            variant={tool === 'pencil' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setTool('pencil')}
            className="hover:bg-purple-500/20 hover:text-purple-400"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === 'eraser' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setTool('eraser')}
            className="hover:bg-purple-500/20 hover:text-purple-400"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-400">Zoom</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="hover:bg-purple-500/20 hover:text-purple-400"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="hover:bg-purple-500/20 hover:text-purple-400"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-400">Volume</h2>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume]}
            onValueChange={([value]) => setVolume(value)}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
      </div>

      {/* Quantization */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-400">Quantization</h2>
        <div className="space-y-2">
          <Button
            variant={quantize ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setQuantize(!quantize)}
            className="w-full justify-start hover:bg-purple-500/20 hover:text-purple-400"
          >
            <Grid className="h-4 w-4 mr-2" />
            {quantize ? 'Quantize On' : 'Quantize Off'}
          </Button>
          {quantize && (
            <Slider
              value={[quantizeValue]}
              onValueChange={([value]) => setQuantizeValue(value)}
              min={0.25}
              max={1}
              step={0.25}
              className="w-full"
            />
          )}
        </div>
      </div>

      {/* File Operations */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-400">File</h2>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-purple-500/20 hover:text-purple-400"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Project
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-purple-500/20 hover:text-purple-400"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import MIDI
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-purple-500/20 hover:text-purple-400"
          >
            <Download className="h-4 w-4 mr-2" />
            Export MIDI
          </Button>
        </div>
      </div>
    </div>
  )
}

