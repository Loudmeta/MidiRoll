import { PianoRoll } from '@/components/piano-roll'
import { ChatSidebar } from '@/components/chat-sidebar'
import { LeftSidebar } from '@/components/left-sidebar'
import { Header } from '../../components/header'

export default function PianoRollPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Header />
      
      <main className="flex-1 container mx-auto px-2 py-1">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] gap-2 h-[calc(100vh-4.5rem)]">
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
              <div className="h-full p-3 flex flex-col justify-center">
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400">BPM: 120</span>
                    <span className="text-pink-400">4/4</span>
                    <span className="text-green-400">Length: 16 bars</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400">Snap: 1/4</span>
                    <span className="text-pink-400">Velocity: 100</span>
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

