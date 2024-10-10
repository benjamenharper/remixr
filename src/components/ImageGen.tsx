import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageGenProps {
  onInsertToAssistant: (content: string) => void;
}

const ImageGen: React.FC<ImageGenProps> = ({ onInsertToAssistant }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('openai');

  useEffect(() => {
    const storedModel = localStorage.getItem('image_gen_model');
    if (storedModel) {
      setModel(storedModel);
    }
  }, []);

  const generateImage = async () => {
    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      let response;
      if (model === 'openai') {
        response = await generateOpenAIImage(prompt);
      } else if (model === 'flux') {
        response = await generateFluxImage(prompt);
      }

      setImageUrl(response);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateOpenAIImage = async (prompt: string) => {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      throw new Error('OpenAI API key is not set');
    }
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      { prompt, n: 1, size: '512x512' },
      { headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
    );
    return response.data.data[0].url;
  };

  const generateFluxImage = async (prompt: string) => {
    const apiKey = localStorage.getItem('replicate_api_key');
    if (!apiKey) {
      throw new Error('Replicate API key is not set');
    }
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
        input: { prompt }
      },
      { headers: { 'Authorization': `Token ${apiKey}`, 'Content-Type': 'application/json' } }
    );

    const predictionId = response.data.id;
    return await checkPredictionStatus(predictionId, apiKey);
  };

  const checkPredictionStatus = async (predictionId: string, apiKey: string): Promise<string> => {
    const maxAttempts = 10;
    const delayMs = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Token ${apiKey}` },
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

  const handleSendToAssistant = () => {
    if (imageUrl) {
      onInsertToAssistant(`![Generated image](${imageUrl})\n\nPrompt: ${prompt}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">AI Image Generation</h2>
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
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSendToAssistant}
              className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              title="Send to AI Assistant"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGen;
 
 Finally, let's add the  ImageGen  component to the  App  component in  src/App.tsx :