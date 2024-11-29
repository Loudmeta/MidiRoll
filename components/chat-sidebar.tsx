'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Play, Music } from 'lucide-react'
import { callOpenRouterLLM } from '@/utils/api'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  melody?: [string, number, number][] // [note, octave, duration][]
}

export function ChatSidebar() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const tryParseJSON = (text: string): [string, number, number][] | undefined => {
    try {
      const parsed = JSON.parse(text)
      // Validate the melody format
      if (Array.isArray(parsed) && parsed.every(note => 
        Array.isArray(note) && 
        note.length === 3 &&
        typeof note[0] === 'string' &&
        typeof note[1] === 'number' &&
        typeof note[2] === 'number'
      )) {
        return parsed as [string, number, number][]
      }
    } catch (e) {}
    return undefined
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    setIsLoading(true)
    try {
      // Get AI response
      const response = await callOpenRouterLLM(userMessage)
      const parsedMelody = tryParseJSON(response)
      
      // Add AI response to chat
      const newMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        melody: parsedMelody
      }
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      console.error('Failed to get AI response:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatMelody = (melody: [string, number, number][]) => {
    return melody.map(([note, octave, duration]) => (
      `${note}${octave} (${duration}ms)`
    )).join(', ')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-purple-500/20 ml-4' 
                : 'bg-gray-700/50 mr-4'
            }`}
          >
            {message.role === 'user' ? (
              <div className="flex items-center gap-2">
                <span>{message.content}</span>
              </div>
            ) : message.melody ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Music className="h-4 w-4" />
                  <span>Generated Melody</span>
                </div>
                <div className="text-sm text-gray-300 break-all">
                  {formatMelody(message.melody)}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="mt-2 text-green-400 hover:text-green-300"
                  onClick={() => {
                    // TODO: Implement playback functionality
                    console.log('Play melody:', message.melody)
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Melody
                </Button>
              </div>
            ) : (
              <div className="text-red-400">
                {message.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Describe a melody..."
          disabled={isLoading}
          className="bg-gray-700/50 border-gray-600"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

