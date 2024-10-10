import React, { useState, useEffect } from 'react';

interface PublishPopupProps {
  content: string;
  initialTitle: string;
  onClose: () => void;
}

const PublishPopup: React.FC<PublishPopupProps> = ({ content, initialTitle, onClose }) => {
  const [title, setTitle] = useState(initialTitle);
  const [editedContent, setEditedContent] = useState(content);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const simulatePublish = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPublishedUrl('https://example.com/published-content-' + Date.now());
    };
    simulatePublish();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleShare = () => {
    console.log('Sharing published content...');
    alert('Sharing functionality is not implemented yet.');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publishedUrl).then(() => {
      alert('URL copied to clipboard!');
    }, (err) => {
      console.error('Could not copy URL: ', err);
    });
  };

  const renderContent = () => {
    const lines = editedContent.split('\n');
    return lines.map((line, index) => {
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [, altText, src] = imageMatch;
        return (
          <div key={index} className="my-4">
            <img src={src} alt={altText} className="max-w-full h-auto rounded-lg shadow-md" />
          </div>
        );
      }
      return <p key={index} className="my-2">{line}</p>;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              title
            )}
          </h2>
        </div>
        {isEditing ? (
          <div className="mb-4">
            <textarea
              value={editedContent}
              onChange={handleContentChange}
              className="w-full h-64 p-2 border rounded"
            />
          </div>
        ) : (
          <div className="mb-4">
            <div className="prose max-w-none p-4 bg-gray-100 rounded-lg">
              {renderContent()}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <div className="flex space-x-2">
            {publishedUrl && (
              <>
                <button
                  onClick={handleCopyUrl}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Copy URL
                </button>
                <button
                  onClick={handleShare}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Share
                </button>
              </>
            )}
          </div>
        </div>
        {publishedUrl && (
          <div className="mt-4">
            <p className="font-semibold">Published URL:</p>
            <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {publishedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishPopup;