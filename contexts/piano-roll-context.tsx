'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PianoRollContextType {
  zoom: number
  setZoom: (zoom: number) => void
}

const PianoRollContext = createContext<PianoRollContextType | undefined>(undefined)

export function PianoRollProvider({ children }: { children: ReactNode }) {
  const [zoom, setZoom] = useState(1)

  return (
    <PianoRollContext.Provider value={{ zoom, setZoom }}>
      {children}
    </PianoRollContext.Provider>
  )
}

export function usePianoRoll() {
  const context = useContext(PianoRollContext)
  if (context === undefined) {
    throw new Error('usePianoRoll must be used within a PianoRollProvider')
  }
  return context
} 