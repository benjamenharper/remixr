import React, { useState, useEffect } from 'react';

const SettingsPage: React.FC = () => {
  const [openAIKey, setOpenAIKey] = useState('');
  const [replicateKey, setReplicateKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [imageGenModel, setImageGenModel] = useState('openai');
  const [propertyDataModel, setPropertyDataModel] = useState('default');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedOpenAIKey = localStorage.getItem('openai_api_key');
    const storedReplicateKey = localStorage.getItem('replicate_api_key');
    const storedGroqKey = localStorage.getItem('groq_api_key');
    const storedImageGenModel = localStorage.getItem('image_gen_model');
    const storedPropertyDataModel = localStorage.getItem('property_data_model');
    if (storedOpenAIKey) setOpenAIKey(storedOpenAIKey);
    if (storedReplicateKey) setReplicateKey(storedReplicateKey);
    if (storedGroqKey) setGroqKey(storedGroqKey);
    if (storedImageGenModel) setImageGenModel(storedImageGenModel);
    if (storedPropertyDataModel) setPropertyDataModel(storedPropertyDataModel);
  }, []);

  const handleSave = () => {
    if (openAIKey) localStorage.setItem('openai_api_key', openAIKey);
    if (replicateKey) localStorage.setItem('replicate_api_key', replicateKey);
    if (groqKey) localStorage.setItem('groq_api_key', groqKey);
    localStorage.setItem('image_gen_model', imageGenModel);
    localStorage.setItem('property_data_model', propertyDataModel);
    alert('Settings saved successfully!');
  };

  const handleAuthenticate = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Settings Authentication</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleAuthenticate}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="replicateKey">
          Replicate API Key (for Flux AI)
        </label>
        <input
          id="replicateKey"
          type="password"
          value={replicateKey}
          onChange={(e) => setReplicateKey(e.target.value)}
          placeholder="Enter Replicate API Key"
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groqKey">
          Groq API Key
        </label>
        <input
          id="groqKey"
          type="password"
          value={groqKey}
          onChange={(e) => setGroqKey(e.target.value)}
          placeholder="Enter Groq API Key"
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageGenModel">
          Image Generation Model
        </label>
        <select
          id="imageGenModel"
          value={imageGenModel}
          onChange={(e) => setImageGenModel(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="openai">OpenAI DALL-E</option>
          <option value="flux">Flux AI</option>
        </select>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyDataModel">
          Property Data Model
        </label>
        <select
          id="propertyDataModel"
          value={propertyDataModel}
          onChange={(e) => setPropertyDataModel(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="default">Default Model</option>
          <option value="groq">Groq Model</option>
        </select>
      </div>
      <button
        onClick={handleSave}
        className="w-full p-2 bg-blue-500 text-white rounded mb-4"
      >
        Save Settings
      </button>
      <button
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;