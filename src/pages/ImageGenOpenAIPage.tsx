import React from 'react';
import OpenAIImageGen from '../components/OpenAIImageGen';

interface ImageGenOpenAIPageProps {
  onInsertToAssistant: (content: string) => void;
}

const ImageGenOpenAIPage: React.FC<ImageGenOpenAIPageProps> = ({ onInsertToAssistant }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Image Generation</h2>
      <OpenAIImageGen onInsertToAssistant={onInsertToAssistant} />
    </div>
  );
};

export default ImageGenOpenAIPage;