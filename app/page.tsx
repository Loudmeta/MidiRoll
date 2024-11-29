import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Music, AudioWaveformIcon as Waveform, Share2, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-800 text-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center">
            <Music className="mr-2 text-purple-400" />
            PianoRoll Pro
          </div>
          <div className="space-x-4">
            <Link href="#features" className="hover:text-purple-400">Features</Link>
            <Link href="#pricing" className="hover:text-purple-400">Pricing</Link>
            <Link href="/piano-roll" className="bg-purple-600 hover:bg-purple-700 text-gray-100 font-bold py-2 px-4 rounded">
              Try Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-green-400">Compose Like Never Before</h1>
          <p className="text-xl mb-8 text-gray-300">Experience the future of digital music creation with PianoRoll Pro</p>
          <Link href="/piano-roll">
            <Button size="lg" className="bg-purple-600 text-gray-100 hover:bg-purple-700">
              Start Creating Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Waveform className="w-12 h-12 text-pink-400" />}
              title="Intuitive Piano Roll"
              description="Create and edit melodies with ease using our advanced piano roll interface."
            />
            <FeatureCard
              icon={<Share2 className="w-12 h-12 text-green-400" />}
              title="Collaborative Editing"
              description="Work together in real-time with musicians from around the world."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-purple-400" />}
              title="AI-Powered Assistance"
              description="Get intelligent suggestions and auto-completions for your compositions."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-green-400">Ready to Transform Your Music?</h2>
          <p className="text-xl mb-8 text-gray-300">Join thousands of musicians who are already creating with PianoRoll Pro</p>
          <Link href="/piano-roll">
            <Button size="lg" className="bg-purple-600 text-gray-100 hover:bg-purple-700">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 PianoRoll Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

