import React, { useState } from 'react';
import { generateImage } from './OpenAIImageGen';

interface InputBarProps {
  onSubmit: (input: string, type: 'text' | 'image' | 'url' | 'assistant') => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'text' | 'image' | 'url' | 'assistant'>('assistant');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (input.trim()) {
      setIsLoading(true);
      try {
        switch (inputType) {
          case 'image':
            const imageUrl = await generateImage(input.trim());
            onSubmit(imageUrl, 'image');
            break;
          case 'url':
            onSubmit(`Process this URL: ${input.trim()}`, 'assistant');
            break;
          case 'assistant':
          case 'text':
          default:
            onSubmit(input.trim(), inputType);
            break;
        }
      } catch (error) {
        console.error('Error processing input:', error);
        onSubmit('Failed to process input: ' + (error instanceof Error ? error.message : String(error)), 'text');
      } finally {
        setIsLoading(false);
        setInput('');
      }
    }
  };

  const getPlaceholder = () => {
    switch (inputType) {
      case 'text': return 'Add text...';
      case 'image': return 'Describe the image you want to generate...';
      case 'url': return 'Enter a URL to process...';
      case 'assistant': return 'Ask the AI assistant...';
      default: return 'Add text...';
    }
  };

  const renderButton = (type: 'text' | 'image' | 'url' | 'assistant', icon: JSX.Element, title: string) => (
    <button
      onClick={() => setInputType(type)}
      className={`p-1 rounded ${inputType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition-colors`}
      title={title}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex items-center space-x-2 w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={getPlaceholder()}
          className="flex-grow p-2 border rounded text-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
        >
          {isLoading ? '...' : '➤'}
        </button>
      </div>
      <div className="flex justify-center space-x-2">
        {renderButton('assistant',
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>,
          "AI Assistant"
        )}
        {renderButton('text', 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>,
          "Add Text"
        )}
        {renderButton('image',
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>,
          "Generate Image"
        )}
        {renderButton('url',
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>,
          "Process URL"
        )}
      </div>
    </div>
  );
};

export default InputBar;