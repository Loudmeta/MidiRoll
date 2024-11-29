import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Square, Pencil, Eraser, ZoomIn, ZoomOut, Volume2, MessageSquarePlus } from 'lucide-react';

interface LeftSidebarProps {
  onOpenLLMPrompt: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onOpenLLMPrompt }) => {
  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Prompt</h2>
        <div className="flex space-x-2">
          <Button onClick={onOpenLLMPrompt} size="icon">
            <MessageSquarePlus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Playback</h2>
        <div className="flex space-x-2">
          <Button size="icon"><Play className="h-4 w-4" /></Button>
          <Button size="icon"><Square className="h-4 w-4" /></Button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Tools</h2>
        <div className="flex space-x-2">
          <Button size="icon"><Pencil className="h-4 w-4" /></Button>
          <Button size="icon"><Eraser className="h-4 w-4" /></Button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Zoom</h2>
        <div className="flex space-x-2">
          <Button size="icon"><ZoomIn className="h-4 w-4" /></Button>
          <Button size="icon"><ZoomOut className="h-4 w-4" /></Button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Volume</h2>
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4" />
          <Slider defaultValue={[50]} max={100} step={1} className="w-32" />
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;

