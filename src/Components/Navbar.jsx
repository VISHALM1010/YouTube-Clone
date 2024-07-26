import React, { useState } from 'react';
import menu_icon from '../assets/menu.png';
import logo from '../assets/youtube.svg';
import search_btn from '../assets/search.png';
import Upload_icon from '../assets/upload.png';
import More_icon from '../assets/more.png';
import Notification_icon from '../assets/notification.png';
import Profile_icon from '../assets/user_profile.jpg';
import { Link } from 'react-router-dom';

const Navbar = ({ setSidebar, setSearchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(localSearchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="flex items-center justify-between shadow-md bg-white px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <img className="w-8 cursor-pointer" onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt='Menu Icon' />
        <Link to='/'>
          <img className="w-20" src={logo} alt='Logo' />
        </Link>
      </div>
      <div className="flex items-center flex-grow max-w-lg mx-4">
        <div className="relative w-full">
          <input
            type='text'
            placeholder='Search...'
            className="w-full border border-gray-300 rounded-full py-2 px-4 outline-none bg-white focus:ring-2 focus:ring-blue-500"
            value={localSearchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch} className="absolute right-0 top-0 bottom-0 mr-4 flex items-center">
            <img className="w-6" src={search_btn} alt='Search' />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <img src={Upload_icon} alt='Upload' className="w-6" />
        <img src={More_icon} alt='More' className="w-6" />
        <img src={Notification_icon} alt='Notifications' className="w-6" />
        <img className="w-9 rounded-full" src={Profile_icon} alt='Profile' />
      </div>
    </nav>
  );
};

export default Navbar;
