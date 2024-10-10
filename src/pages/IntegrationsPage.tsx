import React from 'react';

const IntegrationsPage: React.FC = () => {
  const integrations = [
    { name: 'WordPress', connected: false },
    { name: 'Medium', connected: false },
    { name: 'LinkedIn', connected: false },
    { name: 'Twitter', connected: false },
  ];

  const handleConnect = (integrationName: string) => {
    console.log(`Connecting to ${integrationName}...`);
    // Implement connection logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Integrations</h2>
      <ul className="space-y-2">
        {integrations.map((integration) => (
          <li key={integration.name} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <span>{integration.name}</span>
            <button
              onClick={() => handleConnect(integration.name)}
              className={`px-3 py-1 rounded ${
                integration.connected ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}
            >
              {integration.connected ? 'Connected' : 'Connect'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntegrationsPage;