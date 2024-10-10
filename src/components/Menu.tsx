import React from 'react';

interface MenuProps {
  onSelectTool: (tool: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectTool }) => {
  return (
    <div className="w-48 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul>
        <li>
          <button onClick={() => onSelectTool('Tool 1')} className="w-full text-left py-2 px-4 hover:bg-gray-200">
            Tool 1
          </button>
        </li>
        <li>
          <button onClick={() => onSelectTool('Tool 2')} className="w-full text-left py-2 px-4 hover:bg-gray-200">
            Tool 2
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;