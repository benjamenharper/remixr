import React, { useEffect, useState } from 'react';

const EnvVarChecker: React.FC = () => {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  useEffect(() => {
    const vars = {
      REPLICATE_API_TOKEN: localStorage.getItem('replicate_api_key') || 'Not set',
      OPENAI_API_KEY: localStorage.getItem('openai_api_key') || 'Not set',
      GROQ_API_KEY: localStorage.getItem('groq_api_key') || 'Not set',
      RAPIDAPI_KEY: localStorage.getItem('rapidapi_key') || 'Not set'
    };
    setEnvVars(vars);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">API Keys:</h2>
      <ul>
        {Object.entries(envVars).map(([key, value]) => (
          <li key={key} className="mb-2">
            <strong>{key}:</strong> {value.startsWith('sk-') || value.startsWith('r8_') ? `${value.slice(0, 7)}...` : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnvVarChecker;