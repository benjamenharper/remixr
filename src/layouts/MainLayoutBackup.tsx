import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';

const MainLayoutBackup: React.FC = () => {
  const handleSelectTool = (tool: string) => {
    // Implement the logic for tool selection here
    console.log(`Selected tool: ${tool}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu onSelectTool={handleSelectTool} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayoutBackup;