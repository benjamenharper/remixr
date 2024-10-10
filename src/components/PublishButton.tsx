import React, { useState } from 'react';
import axios from 'axios';

interface PublishButtonProps {
  content: string;
}

const PublishButton: React.FC<PublishButtonProps> = ({ content }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // This is a mock API call. Replace with your actual publishing API.
      const response = await axios.post('https://api.example.com/publish', { content });
      setPublishedUrl(response.data.url);
    } catch (error) {
      console.error('Failed to publish content:', error);
      alert('Failed to publish content. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 text-sm"
      >
        {isPublishing ? 'Publishing...' : 'Publish'}
      </button>
      {publishedUrl && (
        <div className="mt-2">
          <p>Published at: <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{publishedUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default PublishButton;