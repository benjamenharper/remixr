import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './AccountDropdown';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4">
        <Link to="/" className="flex flex-col items-start">
          <h1 className="text-3xl font-bold remixr-gradient">remixr.ai</h1>
          <span className="text-sm tagline-gradient">Generate. Remix. Publish.</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <AccountDropdown />
        </nav>
      </div>
      <div className="bg-blue-900 text-white p-2 text-center">
        <p className="text-sm">
          🎉 Special Offer: Get 50% off our Pro Plan! Limited time only. 
          <a href="#" className="underline ml-2 font-bold">Learn More</a>
        </p>
      </div>
    </header>
  );
};

export default Header;