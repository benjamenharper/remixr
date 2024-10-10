import React, { useState } from 'react';
import Menu from '../components/Menu';
import ToolColumn from '../components/ToolColumn';
import AssistantColumn from '../components/AssistantColumn';

const PlaygroundPage: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: string; content: string }>>([]);

  const handleInsertToAssistant = (content: string) => {
    setAssistantMessages(prevMessages => [...prevMessages, { role: 'user', content }]);
  };

  return (
    <div className="flex h-full">
      <Menu onSelectTool={setSelectedTool} />
      <ToolColumn selectedTool={selectedTool} onInsertToAssistant={handleInsertToAssistant} />
      <AssistantColumn messages={assistantMessages} setMessages={setAssistantMessages} />
    </div>
  );
};

export default PlaygroundPage;