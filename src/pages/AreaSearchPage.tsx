import React, { useState } from 'react';

interface AreaSearchPageProps {
  onInsertToWhiteboard: (content: string) => void;
}

const AreaSearchPage: React.FC<AreaSearchPageProps> = ({ onInsertToWhiteboard }) => {
  const [area, setArea] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      // Simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock result
      const mockResult = `${area} is a vibrant area with a diverse real estate market. The average home price is $500,000, with popular neighborhoods including Downtown, Riverside, and Hillcrest. Recent trends show an increase in demand for eco-friendly homes and a growing interest in mixed-use developments.`;
      
      setResult(mockResult);
    } catch (err) {
      console.error('Area Search Error:', err);
      setError('An error occurred while fetching area information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Area Search</h2>
      <div className="mb-4">
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter Town, Neighborhood, or City"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={isLoading || !area}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-6 relative">
          <h3 className="text-xl font-semibold mb-2">Area Information: {area}</h3>
          <p className="mb-4">{result}</p>
          <button
            onClick={() => onInsertToWhiteboard(`
Area: ${area}

${result}
            `.trim())}
            className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700"
            title="Insert to Whiteboard"
          >
            ➤
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaSearchPage;