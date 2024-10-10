import axios from 'axios';

const REPLICATE_API_TOKEN = 'r8_E2Omu7MklhwfuMPO8SooOp2KtiGNiJV4FjDbI'; // Replace this with your actual token

const api = axios.create({
  baseURL: 'https://api.replicate.com/v1',
  headers: {
    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const createPrediction = async (prompt: string) => {
  try {
    const response = await api.post('/predictions', {
      version: '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
      input: { prompt },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(`Failed to create prediction: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while creating the prediction');
    }
  }
};

export const getPrediction = async (id: string) => {
  try {
    const response = await api.get(`/predictions/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(`Failed to get prediction: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while getting the prediction');
    }
  }
};