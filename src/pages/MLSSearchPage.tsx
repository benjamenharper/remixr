import React, { useState } from 'react';

interface MLSSearchPageProps {
  onInsertToWhiteboard: (content: string) => void;
}

const MLSSearchPage: React.FC<MLSSearchPageProps> = ({ onInsertToWhiteboard }) => {
  const [mlsId, setMlsId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rawApiData, setRawApiData] = useState<any>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setRawApiData(null);

    try {
      const trimmedMlsId = mlsId.trim();

      const response = await fetch(
        `https://us-real-estate-listings.p.rapidapi.com/v2/property-by-mls?mlsId=${trimmedMlsId}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '72b25b9609mshf22de8083b9ef4bp18d5b9jsn2b059ddfdc06',
            'x-rapidapi-host': 'us-real-estate-listings.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      setRawApiData(data);

      if (data.search && data.search.results && Array.isArray(data.search.results) && data.search.results.length > 0) {
        const property = data.search.results[0];

        if (property) {
          const address = property.location.address;
          const fullAddress = `${address.street_number || ''} ${address.street_suffix || ''}, ${address.city || ''}, ${address.state_code || ''}`.trim();
          const listPrice = property.list_price !== undefined ? `$${property.list_price.toLocaleString()}` : 'Price not available';
          const descriptionText = property.description?.text || 'No description available';
          const propertyImageUrl = property.primary_photo?.href || undefined;

          setTitle(fullAddress || 'No address available');
          setPrice(listPrice);
          setImageUrl(propertyImageUrl || '');
          setDescription(descriptionText);
        } else {
          setError('Property details not available');
        }
      } else {
        setError('No properties found in the response');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('MLS Search Error:', err);
      setError(`An error occurred: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleMLSIdClick = () => {
    setMlsId('24-449959');
  };

  const handleSearchWithSampleId = () => {
    handleSearch();
  };

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-lg font-bold mb-2">MLS Search</h2>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={mlsId}
          onChange={(e) => setMlsId(e.target.value)}
          placeholder="Enter MLS ID"
          className="flex-grow p-1 border rounded text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !mlsId}
          className="ml-2 p-1 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm"
        >
          {isLoading ? '...' : '➤'}
        </button>
      </div>
      <div className="text-sm">
        <span>i.e. MLS ID: </span>
        <button
          onClick={() => {
            handleSampleMLSIdClick();
            setTimeout(handleSearchWithSampleId, 0);
          }}
          className="text-blue-500 underline"
        >
          24-449959
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {title && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-md font-semibold mb-1">{title}</h3>
          <p className="text-lg font-bold mb-1">{price}</p>
          {imageUrl && (
            <img src={imageUrl} alt="Property" className="w-full mb-2 rounded" />
          )}
          <p className="mb-2 text-sm">{description}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onInsertToWhiteboard(`Title: ${title}`)}
              className="bg-green-500 text-white rounded p-1 text-xs"
              title="Send Title to Whiteboard"
            >
              Send Title
            </button>
            <button
              onClick={() => onInsertToWhiteboard(`Price: ${price}`)}
              className="bg-green-500 text-white rounded p-1 text-xs"
              title="Send Price to Whiteboard"
            >
              Send Price
            </button>
            <button
              onClick={() => onInsertToWhiteboard(`Description: ${description}`)}
              className="bg-green-500 text-white rounded p-1 text-xs"
              title="Send Description to Whiteboard"
            >
              Send Description
            </button>
            <button
              onClick={() => onInsertToWhiteboard(`Image: ![Property Image](${imageUrl})`)}
              className="bg-green-500 text-white rounded p-1 text-xs"
              title="Send Image to Whiteboard"
            >
              Send Image
            </button>
          </div>
          <button
            onClick={() => onInsertToWhiteboard(`
Title: ${title}
Price: ${price}
Description: ${description}
Image: ![Property Image](${imageUrl})
            `.trim())}
            className="mt-2 p-1 bg-blue-500 text-white rounded text-xs w-full"
          >
            Send All to Whiteboard
          </button>
        </div>
      )}
      {rawApiData && (
        <div className="mt-4 bg-gray-100 p-4 rounded text-xs">
          <h4 className="font-bold mb-2">Raw API Data:</h4>
          <pre className="overflow-x-auto">{JSON.stringify(rawApiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MLSSearchPage;