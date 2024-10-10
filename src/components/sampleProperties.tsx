// sampleProperties.tsx

import React from 'react';

const SampleProperties: React.FC<{ onInsertToWhiteboard: (content: string) => void }> = ({ onInsertToWhiteboard }) => {
  const sampleProperties = [
    {
      id: 1,
      title: 'Luxury Beachfront Condo',
      description: 'A beautiful condo located on the beach with stunning ocean views.',
      price: '$1,200,000',
    },
    {
      id: 2,
      title: 'Cozy Mountain Cabin',
      description: 'A charming cabin nestled in the mountains, perfect for a getaway.',
      price: '$750,000',
    },
    {
      id: 3,
      title: 'Modern Urban Apartment',
      description: 'An upscale apartment in the heart of the city with all amenities.',
      price: '$900,000',
    },
  ];

  return (
    <div>
      <h2>Sample Properties</h2>
      <ul>
        {sampleProperties.map(property => (
          <li key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p><strong>{property.price}</strong></p>
            <button onClick={() => onInsertToWhiteboard(property.description)}>
              Insert to Whiteboard
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleProperties;
