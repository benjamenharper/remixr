import React, { useState } from 'react';

const PropertyValuePage: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = () => {
    setResult(`Estimated property value: $${propertyValue}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Property Value Estimation</h2>
      <input
        type="text"
        value={propertyValue}
        onChange={(e) => setPropertyValue(e.target.value)}
        placeholder="Enter property value"
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded">
        Submit Valuation
      </button>
      {result && <p className="mt-4 font-bold">{result}</p>}
    </div>
  );
};

export default PropertyValuePage;