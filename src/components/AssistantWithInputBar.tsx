import React, { useState } from 'react';
import axios from 'axios';

interface AssistantWithInputBarProps {
  messages: Array<{ role: string; content: string }>;
  onSendMessage: (message: string) => void;
  onAIResponse: (response: string) => void;
}

const AssistantWithInputBar: React.FC<AssistantWithInputBarProps> = ({
  messages,
  onSendMessage,
  onAIResponse,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = async () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      setError('');
      onSendMessage(inputValue.trim());

      try {
        const apiKey = localStorage.getItem('groq_api_key');
        if (!apiKey) {
          throw new Error('Groq API key is not set. Please set it in the Admin Settings.');
        }

        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'mixtral-8x7b-32768',
            messages: [
              { role: 'system', content: 'You are a helpful assistant. Process and respond to the following messages and the new input.' },
              ...messages,
              { role: 'user', content: inputValue.trim() }
            ],
            max_tokens: 1024,
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const assistantReply = response.data.choices[0].message.content;
        onAIResponse(assistantReply);
      } catch (err) {
        console.error('Error processing instruction:', err);
        setError('Failed to process instruction. Please try again.');
      } finally {
        setIsLoading(false);
        setInputValue('');
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
          placeholder="Enter prompt..."
          className="flex-grow p-2 border rounded text-sm"
        />
        <button
          onClick={handleInputSubmit}
          disabled={isLoading}
          className="p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          title="Send message"
        >
          {isLoading ? '...' : '➤'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default AssistantWithInputBar;