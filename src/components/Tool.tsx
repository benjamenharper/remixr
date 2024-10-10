import React, { useState } from 'react';
import ChatBox from './ChatBox';

interface ToolProps {
  selectedTool: string;
  messages: string[];
  onMessage: (message: string) => void;
  onSendToAI: () => void;
}

const Tool: React.FC<ToolProps> = ({ selectedTool, messages, onMessage, onSendToAI }) => {
  const [propertyValue, setPropertyValue] = useState('');

  const handleSubmitValuation = () => {
    const message = `Valuation submitted for property worth $${propertyValue}`;
    onMessage(message);
    setPropertyValue('');
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'assistant':
        return (
          <div className="flex-1 flex flex-col">
            <ChatBox messages={messages} onSubmit={onMessage} />
          </div>
        );
      case 'property-value':
        return (
          <>
            <input
              type="text"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="Enter property value"
              className="w-full p-2 mb-2 border rounded"
            />
            <button onClick={handleSubmitValuation} className="w-full p-2 bg-blue-500 text-white rounded">Submit Valuation</button>
          </>
        );
      case 'image-gen':
        return <p>Image Generation tool coming soon!</p>;
      case 'profile':
        return <p>Profile settings coming soon!</p>;
      case 'billing':
        return <p>Billing information coming soon!</p>;
      default:
        return <p>Select a tool from the menu.</p>;
    }
  };

  return (
    <div className="w-2/5 p-4 flex flex-col">
      <h3 className="font-bold mb-4">Tool: {selectedTool}</h3>
      <div className="bg-gray-50 p-4 rounded mb-4 flex-1 flex flex-col">
        {renderToolContent()}
      </div>
      {selectedTool !== 'assistant' && (
        <>
          <h3 className="font-bold mb-2">Chat Box</h3>
          <ChatBox messages={messages} onSubmit={onMessage} />
          <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={onSendToAI}>Send to AI</button>
        </>
      )}
    </div>
  );
};

export default Tool;