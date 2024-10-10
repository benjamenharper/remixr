import React, { useEffect } from 'react';
import ChatAssistantTool from './ChatAssistantTool';

interface ToolColumnProps {
  selectedTool: string | null;
  onInsertToWhiteboard: (content: string) => void;
  className?: string;
}

const ToolColumn: React.FC<ToolColumnProps> = ({ selectedTool, onInsertToWhiteboard, className }) => {
  useEffect(() => {
    console.log('ToolColumn rendered');
  }, []);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <h2 className="text-xl font-bold p-4">Tool: {selectedTool || 'Chat Assistant'}</h2>
      <div className="flex-1 overflow-y-auto p-4">
        <ChatAssistantTool onInsertToWhiteboard={onInsertToWhiteboard} />
      </div>
    </div>
  );
};

export default ToolColumn;