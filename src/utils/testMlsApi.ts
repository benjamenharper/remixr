import { makeApiRequest } from './apiUtils';

export const testMlsApi = async () => {
  const options = {
    method: 'GET',
    url: 'https://us-real-estate-listings.p.rapidapi.com/v2/property-by-mls',
    params: { mlsId: '23-321859' },
    headers: {
      'x-rapidapi-key': '72b25b9609mshf22de8083b9ef4bp18d5b9jsn2b059ddfdc06',
      'x-rapidapi-host': 'us-real-estate-listings.p.rapidapi.com'
    }
  };

  try {
    console.log('Sending test API request...');
    const data = await makeApiRequest(options);
    console.log('API Test Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('API Test Error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};