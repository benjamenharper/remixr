import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublishButton from '../components/PublishButton';

interface AssistantPageProps {
  messages: Array<{ role: string; content: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string }>>>;
}

const AssistantPage: React.FC<AssistantPageProps> = ({ messages, setMessages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('groq_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const formatMessage = (content: string) => {
    return content
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="Generated image" class="w-full mt-2 rounded">')
      .replace(/\n/g, '<br>');
  };

  const handleMessage = async (message: string) => {
    if (!apiKey) {
      console.error('Groq API key is not set');
      return;
    }

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are a knowledgeable AI assistant. Provide helpful information and advice about various topics. Use Markdown-style formatting: ### for headlines and ** for bold text.' },
            ...messages,
            { role: 'user', content: message }
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
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPublishContent = () => {
    return messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n\n');
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold p-4">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
            </span>
          </div>
        ))}
        {isLoading && <p className="text-gray-600">Assistant is thinking...</p>}
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="How can we help with this?"
          className="w-full p-2 border rounded"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessage(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <PublishButton content={getPublishContent()} />
      </div>
    </div>
  );
};

export default AssistantPage;