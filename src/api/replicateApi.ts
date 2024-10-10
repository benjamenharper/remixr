import axios from 'axios';

const API_URL = 'https://api.replicate.com/v1';
const MODEL = 'stability-ai/sdxl:8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f';

export const createPrediction = async (prompt: string) => {
  try {
    const response = await axios.post(`${API_URL}/predictions`, 
      { 
        version: MODEL,
        input: { prompt }
      },
      {
        headers: {
          'Authorization': `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      throw new Error(`Failed to create prediction: ${error.response?.data?.detail || error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while creating the prediction');
    }
  }
};

export const getPrediction = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      throw new Error(`Failed to get prediction: ${error.response?.data?.detail || error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while getting the prediction');
    }
  }
};