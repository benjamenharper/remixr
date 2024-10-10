import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SmallGreyButton from './SmallGreyButton';

interface ChatAssistantProps {
  onInsertToWhiteboard: (content: string) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onInsertToWhiteboard }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('groq_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      if (!apiKey) {
        throw new Error('Groq API key is not set. Please set it in the Admin Settings.');
      }

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages,
            newMessage
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
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: assistantReply }]);
    } catch (err) {
      console.error('Error sending message:', err);
      if (axios.isAxiosError(err)) {
        setError(`Failed to send message: ${err.response?.data?.error || err.message}`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto mb-2 border rounded" style={{ maxHeight: 'calc(100% - 70px)' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'} relative group`}>
            <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </span>
            <button
              onClick={() => onInsertToWhiteboard(msg.content)}
              className="absolute top-0 right-0 p-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Send to Whiteboard"
            >
              ➤
            </button>
          </div>
        ))}
        {isLoading && <p className="text-gray-500 p-2">Loading...</p>}
        <div ref={messagesEndRef} />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Enter Prompt, Paste URL, Ask AI"
          className="flex-grow p-2 border rounded text-sm"
        />
        <SmallGreyButton onClick={sendMessage} title="Send message">
          ➤
        </SmallGreyButton>
      </div>
    </div>
  );
};

export default ChatAssistant;