'use client'

import { PianoRollProvider } from '@/contexts/piano-roll-context'
import { PianoRoll } from '@/components/piano-roll'
import { ChatSidebar } from '@/components/chat-sidebar'
import { LeftSidebar } from '@/components/left-sidebar'
import { Header } from '../../components/header'
import { Play, Square, ZoomIn, ZoomOut, Pencil, Eraser, Volume2, Grid } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePianoRoll } from '@/contexts/piano-roll-context'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'

function PianoRollContent() {
  const { zoom, setZoom } = usePianoRoll()
  const [bpm, setBpm] = useState(120)
  const [length, setLength] = useState("16")
  const [velocity, setVelocity] = useState(100)
  const [snap, setSnap] = useState("1/4")

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1))
  }

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1))
  }

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= 999) {
      setBpm(value)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Header />
      
      <main className="flex-1 container mx-auto px-2 py-1">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] gap-2 h-[calc(100vh-4.5rem)] pb-2">
          <div className="border border-gray-700 rounded-lg bg-gray-800/50 shadow-md flex flex-col min-h-0">
            <div className="p-3 overflow-y-auto flex-1">
              <LeftSidebar />
            </div>
          </div>
          
          <div className="border border-gray-700 rounded-lg bg-gray-800/50 shadow-md flex flex-col min-h-0">
            <div className="h-[2%]" />
            
            <div className="px-3 overflow-y-auto" style={{ height: '71%' }}>
              <PianoRoll />
            </div>
            
            <div className="h-[2%]" />
            
            <footer className="border-t border-gray-700 bg-gray-800/50" style={{ height: '25%' }}>
              <div className="h-full p-3 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <Eraser className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleZoomOut}
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleZoomIn}
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <Slider
                        defaultValue={[75]}
                        max={100}
                        step={1}
                        className="w-24"
                      />
                    </div>

                    <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Slider
                        defaultValue={[0.25]}
                        min={0.25}
                        max={1}
                        step={0.25}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">BPM:</span>
                      <Input
                        type="number"
                        value={bpm}
                        onChange={handleBpmChange}
                        className="w-16 h-6 bg-gray-800 border-gray-700 text-purple-400"
                        min={1}
                        max={999}
                      />
                    </div>
                    <span className="text-pink-400">4/4</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">Length:</span>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger className="w-20 h-6 bg-gray-800 border-gray-700 text-green-400">
                          <SelectValue placeholder="Bars" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8 bars</SelectItem>
                          <SelectItem value="16">16 bars</SelectItem>
                          <SelectItem value="32">32 bars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">Snap:</span>
                      <Select value={snap} onValueChange={setSnap}>
                        <SelectTrigger className="w-20 h-6 bg-gray-800 border-gray-700 text-purple-400">
                          <SelectValue placeholder="Snap" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1/4">1/4</SelectItem>
                          <SelectItem value="1/3">1/3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400">Velocity:</span>
                      <Slider
                        value={[velocity]}
                        onValueChange={([value]) => setVelocity(value)}
                        max={100}
                        min={0}
                        step={1}
                        className="w-24 [&>[role=slider]]:bg-pink-400 [&>[role=slider]]:border-pink-400 [&_.relative]:bg-pink-400/20 [&>span]:bg-pink-400"
                      />
                      <span className="text-pink-400 w-8">{velocity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          <div className="border border-gray-700 rounded-lg bg-gray-800/50 shadow-md flex flex-col min-h-0">
            <div className="p-3 overflow-y-auto flex-1">
              <ChatSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PianoRollPage() {
  return (
    <PianoRollProvider>
      <PianoRollContent />
    </PianoRollProvider>
  )
}

