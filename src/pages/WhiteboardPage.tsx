import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WhiteboardColumnProps {
  messages: Array<{ role: string; content: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string }>>>;
  className?: string;
}

const WhiteboardColumn: React.FC<WhiteboardColumnProps> = ({ messages, setMessages, className }) => {
  const [title, setTitle] = useState('Untitled.2');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [assistantInput, setAssistantInput] = useState('');
  const [instructionInput, setInstructionInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = localStorage.getItem('groq_api_key');
    setApiKeySet(!!apiKey);
    console.log('API Key Set:', !!apiKey);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
  };

  const handleSave = () => {
    console.log('Saving whiteboard...');
  };

  const handleShare = () => {
    console.log('Sharing whiteboard...');
  };

  const sendPromptToGroq = async (prompt: string) => {
    setIsLoading(true);
    setError('');

    const apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
      setError('Groq API key is not set. Please set it in the Admin Settings.');
      setIsLoading(false);
      return;
    }

    const content = messages.map(msg => msg.content).join('\n\n');

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `${prompt}\n\nContent:\n${content}` },
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

      console.log('Groq API response:', response.data);
      const assistantReply = response.data.choices[0].message.content;
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setError('Failed to process the request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRewrite = () => sendPromptToGroq('Rewrite the following content to improve clarity and coherence:');
  const handleFormat = () => sendPromptToGroq('Format the following content to improve readability:');
  const handleFAQs = () => sendPromptToGroq('Generate a list of FAQs based on the following content:');
  const handleClear = () => {
    setMessages([]);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      console.log('Input submitted:', inputValue.trim());
      setMessages(prev => [...prev, { role: 'user', content: inputValue.trim() }]);
      setInputValue('');
    }
  };

  const handleAssistantInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && assistantInput.trim()) {
      console.log('Assistant input submitted:', assistantInput.trim());
      sendPromptToGroq(assistantInput.trim());
      setAssistantInput('');
    }
  };

  const handleInstructionInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && instructionInput.trim()) {
      console.log('Instruction input submitted:', instructionInput.trim());
      sendPromptToGroq(instructionInput.trim());
      setInstructionInput('');
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="p-4 bg-gray-100 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleSubmit}
                onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
                className="text-2xl font-bold mr-2"
                autoFocus
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold mr-2">{title}</h2>
                <button onClick={() => setIsEditingTitle(true)} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-2 py-1 bg-gray-500 text-white rounded text-xs">Save</button>
            <button onClick={handleShare} className="px-2 py-1 bg-gray-500 text-white rounded text-xs">Share</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 relative group">
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </span>
            <button
              onClick={() => setMessages(prev => prev.filter((_, i) => i !== index))}
              className="absolute top-0 right-0 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
        {isLoading && <p className="text-gray-600">Processing...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="p-4 bg-white border-t">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputSubmit}
          placeholder="Type your message here..."
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={assistantInput}
          onChange={(e) => setAssistantInput(e.target.value)}
          onKeyPress={handleAssistantInputSubmit}
          placeholder="Chat with the assistant..."
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={instructionInput}
          onChange={(e) => setInstructionInput(e.target.value)}
          onKeyPress={handleInstructionInputSubmit}
          placeholder="Instructions or Prompt for AI Remix..."
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-between">
          <button onClick={handleRewrite} className="px-2 py-1 bg-green-500 text-white rounded">Rewrite</button>
          <button onClick={handleFormat} className="px-2 py-1 bg-yellow-500 text-white rounded">Format</button>
          <button onClick={handleFAQs} className="px-2 py-1 bg-blue-500 text-white rounded">FAQs</button>
          <button onClick={handleClear} className="px-2 py-1 bg-red-500 text-white rounded">Clear</button>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardColumn;
