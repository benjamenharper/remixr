import React, { useState } from 'react';
import InputBar from './InputBar';

interface AssistantColumnProps {
  onInsertToWhiteboard: (content: string, type?: string) => void;
  className?: string;
}

const AssistantColumn: React.FC<AssistantColumnProps> = ({ onInsertToWhiteboard, className }) => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string; type?: string }>>([]);

  const handleSubmit = async (input: string, type: 'text' | 'image' | 'url' | 'assistant') => {
    setMessages(prev => [...prev, { role: 'user', content: input, type }]);

    if (type === 'assistant') {
      // Handle AI assistant specific logic here
      // For example, you might want to call a different API or process the input differently
      const aiResponse = await getAIAssistantResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      onInsertToWhiteboard(aiResponse, 'assistant');
    } else {
      // Handle other input types as before
      setTimeout(() => {
        const aiResponse = `AI response to: ${input}`;
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        onInsertToWhiteboard(aiResponse, type);
      }, 1000);
    }
  };

  // Placeholder function for AI assistant response
  const getAIAssistantResponse = async (input: string): Promise<string> => {
    // Implement your AI logic here
    return `AI Assistant processed: ${input}`;
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <InputBar onSubmit={handleSubmit} placeholder="Type a message or ask the AI assistant..." />
      </div>
    </div>
  );
};

export default AssistantColumn;