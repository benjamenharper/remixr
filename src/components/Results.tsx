import React, { useState } from 'react';
import ChatBox from './ChatBox';

interface ResultsProps {
  messages: string[];
  onMessage: (message: string) => void;
  onCombinedSubmit: (propertyValue: string, message: string) => void;
}

const Results: React.FC<ResultsProps> = ({ messages, onMessage, onCombinedSubmit }) => {
  const [combinedMessage, setCombinedMessage] = useState('');

  const handleCombinedSubmit = () => {
    onCombinedSubmit('0', combinedMessage); // Assuming property value is not available here
    setCombinedMessage('');
  };

  return (
    <div className="w-2/5 p-4 bg-gray-50 flex flex-col">
      <h3 className="font-bold mb-2">Chat Box</h3>
      <ChatBox messages={messages} onSubmit={onMessage} />
      <button 
        className="mt-4 p-2 bg-gray-500 text-white rounded"
        onClick={handleCombinedSubmit}
      >
        Submit Both
      </button>
    </div>
  );
};

export default Results;