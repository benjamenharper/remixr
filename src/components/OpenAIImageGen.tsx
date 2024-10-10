import axios from 'axios';

export const generateImage = async (prompt: string): Promise<string> => {
  const apiKey = localStorage.getItem('openai_api_key');
  if (!apiKey) {
    throw new Error('OpenAI API key is not set. Please set it in the Admin Settings.');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (response.data && response.data.data && response.data.data[0] && response.data.data[0].url) {
      return response.data.data[0].url;
    } else {
      throw new Error('Unexpected response format from OpenAI API');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Failed to generate image: ${error.response.data.error.message}`);
    } else {
      throw new Error('Failed to generate image. Please try again.');
    }
  }
};

const OpenAIImageGen: React.FC<{ prompt: string }> = ({ prompt }) => {
  return generateImage(prompt);
};

export default OpenAIImageGen;