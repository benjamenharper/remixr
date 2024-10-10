import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatAssistantToolProps {
  onInsertToWhiteboard: (content: string) => void;
}

interface Message {
  role: string;
  content: string;
  id: number;
}

const ChatAssistantTool: React.FC<ChatAssistantToolProps> = ({ onInsertToWhiteboard }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('ChatAssistantTool mounted');
    sendMessage("Hello! I'm your AI assistant. How can I help you today?", true);
  }, []);

  const sendMessage = async (content: string, isInitialMessage = false) => {
    console.log('Sending message:', content, 'isInitialMessage:', isInitialMessage);
    if (!content.trim()) return;

    if (!isInitialMessage) {
      const userMessage = { role: 'user', content, id: Date.now() };
      setMessages(prev => {
        console.log('Adding user message:', userMessage);
        return [...prev, userMessage];
      });
    }
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = localStorage.getItem('groq_api_key');
      console.log('API Key exists:', !!apiKey);
      if (!apiKey) {
        throw new Error('Groq API key is not set. Please set it in the Admin Settings.');
      }

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: [{ role: 'user', content }],
          max_tokens: 1024,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);
      const assistantReply = response.data.choices[0].message.content;
      setMessages(prev => {
        const newMessage = { role: 'assistant', content: assistantReply, id: Date.now() };
        console.log('Adding assistant message:', newMessage);
        return [...prev, newMessage];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', id: Date.now() };
        console.log('Adding error message:', errorMessage);
        return [...prev, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage(input);
  };

  console.log('Rendering ChatAssistantTool, messages:', messages);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </span>
            <button onClick={() => onInsertToWhiteboard(msg.content)} className="ml-2 text-sm text-blue-500">
              Send to Whiteboard
            </button>
          </div>
        ))}
        {isLoading && <p className="text-gray-500">Assistant is typing...</p>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message here..."
          className="flex-1 p-2 border rounded-l"
        />
        <button 
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistantTool;