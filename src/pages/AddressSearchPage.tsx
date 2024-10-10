import React, { useState } from 'react';
import { getMockMLSData } from '../utils/mockData';

interface AddressSearchPageProps {
  onInsertToWhiteboard: (content: string) => void;
}

interface PropertyDetails {
  address: string;
  price: string;
  imageUrl?: string;
  description: string;
}

const AddressSearchPage: React.FC<AddressSearchPageProps> = ({ onInsertToWhiteboard }) => {
  const [address, setAddress] = useState('');
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    setPropertyDetails(null);

    try {
      // For demonstration, we'll use the mock data
      const mockData = getMockMLSData('23-321859');
      
      if (mockData) {
        setPropertyDetails({...mockData, address: address});
      } else {
        setError('Property not found');
      }
    } catch (err) {
      console.error('Address Search Error:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Address Search</h2>
      <div className="mb-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter property address"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={isLoading || !address}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {propertyDetails && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-6 relative">
          <h3 className="text-xl font-semibold mb-2">{propertyDetails.address}</h3>
          <p className="text-lg font-bold mb-2">{propertyDetails.price}</p>
          {propertyDetails.imageUrl && (
            <img src={propertyDetails.imageUrl} alt="Property" className="w-full mb-2 rounded" />
          )}
          <p className="mb-4">{propertyDetails.description}</p>
          <button
            onClick={() => onInsertToWhiteboard(`
Address: ${propertyDetails.address}
Price: ${propertyDetails.price}
${propertyDetails.imageUrl ? `![Property Image](${propertyDetails.imageUrl})` : ''}
Description: ${propertyDetails.description}
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

export default AddressSearchPage;