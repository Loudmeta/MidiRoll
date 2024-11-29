import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PianoRoll Pro - Advanced Music Composition Tool',
  description: 'Create, collaborate, and compose music like never before with PianoRoll Pro, the ultimate digital music creation platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

