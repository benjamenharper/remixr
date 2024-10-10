import React, { useState, useEffect } from 'react';
import InputBar from './InputBar';
import PublishPopup from './PublishPopup';
import WhiteboardRemixBar from './WhiteboardRemixBar';
import WhiteboardAIAssistant from './WhiteboardAIAssistant';

interface WhiteboardColumnProps {
  messages: Array<{ role: string; content: string; type?: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string; type?: string }>>>;
  className?: string;
}

const WhiteboardColumn: React.FC<WhiteboardColumnProps> = ({ messages, setMessages, className }) => {
  const [showPublishPopup, setShowPublishPopup] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'system', content: 'Hello World!', type: 'text' }]);
    }
  }, []);

  const handleSubmit = (input: string, type: 'text' | 'image' | 'url' | 'assistant') => {
    setMessages(prev => [...prev, { role: 'user', content: input, type }]);
  };

  const renderMessage = (msg: { role: string; content: string; type?: string }) => {
    if (msg.type === 'image') {
      return <img src={msg.content} alt="Generated" className="max-w-full h-auto rounded" />;
    }
    return msg.content;
  };

  const handlePublish = () => {
    setShowPublishPopup(true);
  };

  const handleRemix = () => {
    console.log('Remix functionality to be implemented');
  };

  const handleEdit = (index: number) => {
    // Implement edit functionality
    console.log('Edit message:', index);
  };

  const handleRemove = (index: number) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span className={`inline-block p-2 rounded-lg flex-grow ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {renderMessage(msg)}
            </span>
            <div className="ml-2 flex">
              <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700 mr-2">
                ✎
              </button>
              <button onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <WhiteboardAIAssistant onInsertToWhiteboard={(content) => setMessages(prev => [...prev, { role: 'assistant', content, type: 'text' }])} />
        <WhiteboardRemixBar onRemix={handleRemix} onPublish={handlePublish} />
      </div>
      {showPublishPopup && (
        <PublishPopup
          content={messages.map(msg => msg.content).join('\n\n')}
          initialTitle="Whiteboard Content"
          onClose={() => setShowPublishPopup(false)}
        />
      )}
    </div>
  );
};

export default WhiteboardColumn;