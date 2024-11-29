import React, { useState } from 'react';
import TopNavigation from './components/TopNavigation';
import LeftSidebar from './components/LeftSidebar';
import PianoRoll from './components/PianoRoll';
import LLMPrompt from './components/LLMPrompt';

const App: React.FC = () => {
  const [isLLMPromptOpen, setIsLLMPromptOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <TopNavigation />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar onOpenLLMPrompt={() => setIsLLMPromptOpen(true)} />
        <main className="flex-1 overflow-auto relative">
          <PianoRoll />
        </main>
      </div>
      <LLMPrompt open={isLLMPromptOpen} onOpenChange={setIsLLMPromptOpen} />
    </div>
  );
};

export default App;

