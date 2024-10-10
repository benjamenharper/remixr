import React, { useState, useEffect } from 'react';

const AdminSettingsPage: React.FC = () => {
  const [openAIKey, setOpenAIKey] = useState('');

  useEffect(() => {
    const storedOpenAIKey = localStorage.getItem('openai_api_key');
    if (storedOpenAIKey) setOpenAIKey(storedOpenAIKey);
  }, []);

  const handleSave = () => {
    if (openAIKey) localStorage.setItem('openai_api_key', openAIKey);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="openAIKey">
          OpenAI API Key
        </label>
        <input
          id="openAIKey"
          type="password"
          value={openAIKey}
          onChange={(e) => setOpenAIKey(e.target.value)}
          placeholder="Enter OpenAI API Key"
          className="w-full p-2 border rounded mb-4"
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default AdminSettingsPage;