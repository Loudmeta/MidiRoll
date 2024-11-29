import React, { useRef, useEffect, useState } from 'react';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7];
const NOTE_HEIGHT = 20;
const BEAT_WIDTH = 100;

interface Note {
  pitch: number;
  startTime: number;
  duration: number;
}

const PianoRoll: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw horizontal lines
      for (let i = 0; i <= NOTES.length * OCTAVES.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * NOTE_HEIGHT);
        ctx.lineTo(canvas.width, i * NOTE_HEIGHT);
        ctx.strokeStyle = i % 12 === 0 ? '#555' : '#333';
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = 0; i <= canvas.width / BEAT_WIDTH; i++) {
        ctx.beginPath();
        ctx.moveTo(i * BEAT_WIDTH, 0);
        ctx.lineTo(i * BEAT_WIDTH, canvas.height);
        ctx.strokeStyle = i % 4 === 0 ? '#555' : '#333';
        ctx.stroke();
      }

      // Draw notes
      ctx.fillStyle = '#8b5cf6';
      notes.forEach(note => {
        ctx.fillRect(
          note.startTime * BEAT_WIDTH,
          canvas.height - (note.pitch + 1) * NOTE_HEIGHT,
          note.duration * BEAT_WIDTH,
          NOTE_HEIGHT
        );
      });

      // Draw playhead
      if (isPlaying) {
        ctx.beginPath();
        ctx.moveTo(currentTime * BEAT_WIDTH, 0);
        ctx.lineTo(currentTime * BEAT_WIDTH, canvas.height);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
      }
    };

    drawGrid();

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const pitch = Math.floor((canvas.height - y) / NOTE_HEIGHT);
      const startTime = Math.floor(x / BEAT_WIDTH);

      const newNote = { pitch, startTime, duration: 1 };
      setNotes([...notes, newNote]);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [notes, isPlaying, currentTime]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (isPlaying) {
        setCurrentTime(prevTime => (prevTime + 0.016) % (16 * 4)); // Loop every 16 beats (4 bars)
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  return (
    <div className="flex h-full">
      <div className="w-16 bg-gray-700 flex flex-col-reverse">
        {OCTAVES.map(octave =>
          NOTES.map(note => (
            <div
              key={`${note}${octave}`}
              className="h-5 flex items-center justify-center text-xs border-b border-gray-600"
            >
              {note === 'C' && `${note}${octave}`}
            </div>
          ))
        )}
      </div>
      <div className="flex-1 overflow-auto">
        <canvas
          ref={canvasRef}
          width={16 * 4 * BEAT_WIDTH}
          height={NOTES.length * OCTAVES.length * NOTE_HEIGHT}
          className="bg-gray-900"
        />
      </div>
    </div>
  );
};

export default PianoRoll;

