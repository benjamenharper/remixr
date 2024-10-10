import React, { useState } from 'react';

interface ChatBoxProps {
  messages: string[];
  onSubmit: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <>
      <div className="flex-1 bg-white border border-gray-300 rounded p-4 mb-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="p-2 mb-2 bg-gray-100 rounded">{message}</div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l"
        />
        <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-r">Send</button>
      </div>
    </>
  );
};

export default ChatBox;