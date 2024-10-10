import React, { useState } from 'react';

const IntegrationsAndPublishingPage: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const integrations = [
    { name: 'WordPress', connected: false },
    { name: 'Medium', connected: false },
    { name: 'LinkedIn', connected: false },
    { name: 'Twitter', connected: false },
  ];

  const handleConnect = (integrationName: string) => {
    // In a real application, this would initiate the OAuth flow or API connection process
    console.log(`Connecting to ${integrationName}...`);
    setSelectedIntegration(integrationName);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Integrations and Publishing</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Connected Platforms</h3>
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
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Publishing Settings</h3>
        <p className="text-gray-600 mb-2">Configure your default publishing options here.</p>
        {/* Add publishing settings controls here */}
      </div>
      
      {selectedIntegration && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Connecting to {selectedIntegration}</h3>
          <p>Please wait while we establish a connection to {selectedIntegration}...</p>
          {/* In a real app, you would show a loading indicator or OAuth popup here */}
        </div>
      )}
    </div>
  );
};

export default IntegrationsAndPublishingPage;