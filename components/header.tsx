"use client"

import { Button } from "@/components/ui/button"
import { 
  PlayCircle, 
  StopCircle, 
  Save,
  Download,
  Settings,
  Music
} from "lucide-react"

export function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold flex items-center">
            <Music className="mr-2 text-purple-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-green-400">
              PianoRoll Pro
            </span>
          </div>
          <div className="flex items-center gap-2 ml-8">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-gray-100 hover:text-purple-400 hover:bg-gray-700"
            >
              <PlayCircle className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              className="text-gray-100 hover:text-purple-400 hover:bg-gray-700"
            >
              <StopCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-100 hover:text-purple-400 hover:bg-gray-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-100 hover:text-purple-400 hover:bg-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-100 hover:text-purple-400 hover:bg-gray-700"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
} 