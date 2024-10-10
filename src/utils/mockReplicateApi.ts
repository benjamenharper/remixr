import { v4 as uuidv4 } from 'uuid';

interface PredictionResult {
  id: string;
  status: string;
  output?: string[];
  error?: string;
}

export const mockCreatePrediction = async (prompt: string): Promise<{ id: string; status: string; input: { prompt: string } }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: uuidv4(),
    status: 'processing',
    input: { prompt },
  };
};

export const mockGetPrediction = async (id: string): Promise<PredictionResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate a small chance of failure
  if (Math.random() < 0.1) {
    return {
      id,
      status: 'failed',
      error: 'Random failure occurred',
    };
  }
  
  return {
    id,
    status: 'succeeded',
    output: [`https://picsum.photos/seed/${id}/512/512`],
  };
};