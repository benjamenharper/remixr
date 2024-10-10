import React, { useState } from 'react';

interface PropertyDataPageProps {
  onInsertToAssistant: (content: string) => void;
}

const PropertyDataPage: React.FC<PropertyDataPageProps> = ({ onInsertToAssistant }) => {
  const [propertyData, setPropertyData] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = () => {
    const analysisResult = `Property Data Analysis: ${propertyData}`;
    setResult(analysisResult);
    onInsertToAssistant(analysisResult);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Property Data Analysis</h2>
      <input
        type="text"
        value={propertyData}
        onChange={(e) => setPropertyData(e.target.value)}
        placeholder="Enter property data"
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded">
        Analyze Property Data
      </button>
      {result && <p className="mt-4 font-bold">{result}</p>}
    </div>
  );
};

export default PropertyDataPage;