import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import InputBar from './components/InputBar';
import WhiteboardColumn from './components/WhiteboardColumn';
import axios from 'axios';

const App: React.FC = () => {
  const [leftColumnMessages, setLeftColumnMessages] = useState<Array<{ role: string; content: string; type?: string }>>([]);
  const [whiteboardMessages, setWhiteboardMessages] = useState<Array<{ role: string; content: string; type?: string }>>([]);

  const processWithAI = async (input: string) => {
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
            { role: 'system', content: 'You are a helpful assistant.' },
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

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error processing with AI:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  };

  const handleLeftColumnSubmit = async (input: string, type: 'text' | 'image' | 'url' | 'assistant') => {
    setLeftColumnMessages(prev => [...prev, { role: 'user', content: input, type }]);
    
    if (type === 'assistant' || type === 'url') {
      const aiResponse = await processWithAI(input);
      setLeftColumnMessages(prev => [...prev, { role: 'assistant', content: aiResponse, type: 'text' }]);
    }
  };

  const handleWhiteboardSubmit = async (input: string, type: 'text' | 'image' | 'url' | 'assistant') => {
    setWhiteboardMessages(prev => [...prev, { role: 'user', content: input, type }]);
    
    if (type === 'assistant' || type === 'url') {
      const aiResponse = await processWithAI(input);
      setWhiteboardMessages(prev => [...prev, { role: 'assistant', content: aiResponse, type: 'text' }]);
    }
  };

  const renderMessage = (msg: { role: string; content: string; type?: string }) => {
    if (msg.type === 'image') {
      return <img src={msg.content} alt="Generated" className="max-w-full h-auto rounded" />;
    }
    return msg.content;
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {leftColumnMessages.map((msg, index) => (
                <div key={index} className="mb-4">
                  <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {renderMessage(msg)}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4">
              <InputBar onSubmit={handleLeftColumnSubmit} />
            </div>
          </div>
          <div className="w-px bg-gradient-to-b from-white via-gray-300 to-white"></div>
          <WhiteboardColumn 
            messages={whiteboardMessages} 
            setMessages={setWhiteboardMessages} 
            className="w-1/2"
          />
        </div>
      </div>
    </Router>
  );
};

export default App;