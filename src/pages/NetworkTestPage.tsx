import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NetworkTestPage: React.FC = () => {
  const [publicApiResult, setPublicApiResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testPublicApi = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        setPublicApiResult(JSON.stringify(response.data, null, 2));
      } catch (err) {
        setError('Failed to fetch from public API');
        console.error('Error fetching from public API:', err);
      }
    };

    testPublicApi();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Network Test Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      {publicApiResult && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Public API Result:</h2>
          <pre className="bg-gray-100 p-4 rounded">{publicApiResult}</pre>
        </div>
      )}
    </div>
  );
};

export default NetworkTestPage;