import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageGenFluxPageProps {
  onInsertToAssistant: (content: string) => void;
}

const ImageGenFluxPage: React.FC<ImageGenFluxPageProps> = ({ onInsertToAssistant }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('replicate_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const generateImage = async () => {
    setIsLoading(true);
    setError('');
    setImageUrl('');

    if (!apiKey) {
      setError('API key is not set. Please set it in the Settings.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.replicate.com/v1/predictions',
        {
          version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
          input: { prompt: prompt }
        },
        {
          headers: {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const predictionId = response.data.id;
      let imageResult = await checkPredictionStatus(predictionId);
      setImageUrl(imageResult);
      onInsertToAssistant(`![Generated image](${imageResult})`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`Failed to generate image: ${err.response.data.error}`);
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkPredictionStatus = async (predictionId: string): Promise<string> => {
    const maxAttempts = 10;
    const delayMs = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${apiKey}`,
        },
      });

      if (response.data.status === 'succeeded') {
        return response.data.output[0];
      } else if (response.data.status === 'failed') {
        throw new Error('Image generation failed');
      }

      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    throw new Error('Timeout waiting for image generation');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Image Generation (Flux)</h2>
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter image description"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={generateImage}
        disabled={isLoading || !prompt}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Generated image" className="w-full" />
        </div>
      )}
    </div>
  );
};

export default ImageGenFluxPage;