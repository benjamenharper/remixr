import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ToolColumn from '../components/ToolColumn';
import WhiteboardColumn from '../components/WhiteboardColumn';

const MainLayout: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [whiteboardMessages, setWhiteboardMessages] = useState<Array<{ role: string; content: string; type?: string }>>([]);

  const handleInsertToWhiteboard = (content: string) => {
    setWhiteboardMessages(prevMessages => [...prevMessages, { role: 'user', content, type: 'text' }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu onSelectTool={setSelectedTool} />
        <div className="flex flex-1">
          <ToolColumn 
            selectedTool={selectedTool} 
            onInsertToWhiteboard={handleInsertToWhiteboard} 
            className="w-1/2 border-r border-gray-300"
          />
          <WhiteboardColumn 
            messages={whiteboardMessages} 
            setMessages={setWhiteboardMessages} 
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;