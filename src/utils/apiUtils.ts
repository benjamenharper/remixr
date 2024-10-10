import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function makeApiRequest(config: AxiosRequestConfig, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 429) {
          console.log(`Rate limited. Retrying in ${baseDelay * Math.pow(2, attempt)}ms...`);
          await delay(baseDelay * Math.pow(2, attempt));
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error(`Failed after ${maxRetries} attempts`);
}