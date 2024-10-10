import React, { useState } from 'react';

interface WelcomeMsgProps {
  onInsertToWhiteboard: (content: string) => void;
}

const WelcomeMsg: React.FC<WelcomeMsgProps> = ({ onInsertToWhiteboard }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [properties, setProperties] = useState([
    { address: '123 Main St, Anytown, USA', id: 1 },
    { address: '456 Elm St, Springfield, IL', id: 2 },
    { address: '789 Oak Ave, Lakeside, CA', id: 3 },
  ]);

  const handleDelete = (id: number) => {
    setProperties(properties.filter(prop => prop.id !== id));
  };

  const handleSendToWhiteboard = (address: string) => {
    onInsertToWhiteboard(`Property: ${address}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome to RealtySynth</h2>
      <p className="mb-4">
        Select a tool from the menu to get started. You can add property data, generate images,
        and then remix it with AI in the whiteboard.
      </p>

      <div className="border-2 border-gray-300 p-4 mb-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Enter A Property Address, MLS ID, or Neighborhood</h3>
        <p className="mb-4">Start working with real estate data</p>
        <form onSubmit={(e) => { e.preventDefault(); console.log(inputValue); }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter here..." 
            className="w-full p-2 border border-gray-400 rounded mb-2" 
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
        </form>
      </div>

      <h3 className="text-lg font-semibold mb-2">Sample Properties</h3>
      <ul className="space-y-2">
        {properties.map((property) => (
          <li key={property.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>{property.address}</span>
            <div>
              <button
                onClick={() => handleSendToWhiteboard(property.address)}
                className="text-blue-500 hover:text-blue-700 mr-2"
                title="Send to Whiteboard"
              >
                ➤
              </button>
              <button
                onClick={() => handleDelete(property.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WelcomeMsg;