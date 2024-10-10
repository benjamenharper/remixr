import React from 'react';
import OpenAIImageGen from '../components/OpenAIImageGen';

interface ImageGenPageProps {
  onInsertToWhiteboard: (content: string) => void;
}

const ImageGenPage: React.FC<ImageGenPageProps> = ({ onInsertToWhiteboard }) => {
  return (
    <div className="p-2">
      <OpenAIImageGen onInsertToAssistant={onInsertToWhiteboard} />
    </div>
  );
};

export default ImageGenPage;