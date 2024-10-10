import React from 'react';

interface SmallGreyButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}

const SmallGreyButton: React.FC<SmallGreyButtonProps> = ({ onClick, children, title }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400 transition-colors"
      title={title}
    >
      {children}
    </button>
  );
};

export default SmallGreyButton;