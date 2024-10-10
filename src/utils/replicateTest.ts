import axios from 'axios';

export const testReplicateToken = async () => {
  const token = import.meta.env.VITE_REPLICATE_API_TOKEN;

  if (!token) {
    console.error('Replicate API token is not set');
    return false;
  }

  try {
    const response = await axios.get('https://api.replicate.com/v1/models/stability-ai/sdxl', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    console.log('Successfully connected to Replicate API');
    console.log('Model:', response.data);
    return true;
  } catch (error) {
    console.error('Failed to connect to Replicate API. Error details:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
    }
    return false;
  }
};