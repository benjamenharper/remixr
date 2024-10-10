import React, { useState, useEffect } from 'react';
import WhiteboardColumn from './WhiteboardColumn';

interface FloatingWhiteboardProps {
  messages: Array<{ role: string; content: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string }>>>;
  onClose: () => void;
}

const FloatingWhiteboard: React.FC<FloatingWhiteboardProps> = ({ messages, setMessages, onClose }) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      className="fixed bg-white rounded-lg shadow-lg overflow-hidden"
      style={{
        width: '600px',
        height: '80vh',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div
        className="bg-gray-200 p-2 cursor-move flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-lg font-bold">Whiteboard</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          ×
        </button>
      </div>
      <div className="h-full overflow-hidden">
        <WhiteboardColumn messages={messages} setMessages={setMessages} className="h-full" />
      </div>
    </div>
  );
};

export default FloatingWhiteboard;