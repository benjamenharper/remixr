import React, { useState } from 'react';
import axios from 'axios';

interface WhiteboardAIAssistantProps {
  onInsertToWhiteboard: (content: string) => void;
}

const WhiteboardAIAssistant: React.FC<WhiteboardAIAssistantProps> = ({ onInsertToWhiteboard }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError('');

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
            { role: 'system', content: 'You are a helpful assistant for remixing and improving content.' },
            { role: 'user', content: input }
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
      onInsertToWhiteboard(assistantReply);
    } catch (err) {
      console.error('Error processing AI request:', err);
      setError('Failed to process AI request. Please try again.');
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Enter prompt for AI remix..."
        className="flex-grow p-2 border rounded text-sm"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100"
      >
        {isLoading ? '...' : '➤'}
      </button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default WhiteboardAIAssistant;