import React from 'react';
import home from '../assets/home.png';
import game_icon from '../assets/game_icon.png';
import automobiles from '../assets/automobiles.png';
import sports from '../assets/sports.png';
import entertainment from '../assets/entertainment.png';
import tech from '../assets/tech.png';
import music from '../assets/music.png';
import blogs from '../assets/blogs.png';
import news from '../assets/news.png';
import v1 from '../assets/v1.jpg';
import v2 from '../assets/v2.jpg';
import v3 from '../assets/v3.jpg';
import v4 from '../assets/v4.jpg';
import v5 from '../assets/v5.jpg';
import v6 from '../assets/v6.jpg';

const Sidebar = ({ sidebar, category, setCategory }) => {
  const channelNames = ['Epic Adventures', 'Tech Insights', 'Daily Vlogs', 'Music Mania', 'Sports Highlights', 'Cooking Fun'];

  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-all duration-300 ${sidebar ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="pt-10 px-2">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 0 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(0)}>
            <img src={home} alt="Home" className="w-6 mr-4" />
            <p>Home</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 20 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(20)}>
            <img src={game_icon} alt="Gaming" className="w-6 mr-4" />
            <p>Gaming</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 24 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(24)}>
            <img src={entertainment} alt="Entertainment" className="w-6 mr-4" />
            <p>Entertainment</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 17 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(17)}>
            <img src={sports} alt="Sports" className="w-6 mr-4" />
            <p>Sports</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 28 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(28)}>
            <img src={tech} alt="Tech" className="w-6 mr-4" />
            <p>Tech</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 10 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(10)}>
            <img src={music} alt="Music" className="w-6 mr-4" />
            <p>Music</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 1 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(1)}>
            <img src={news} alt="News" className="w-6 mr-4" />
            <p>News</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 2 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(2)}>
            <img src={blogs} alt="Blogs" className="w-6 mr-4" />
            <p>Blogs</p>
          </div>
          <div className={`flex items-center cursor-pointer p-2 rounded-lg ${category === 27 ? 'bg-gray-200' : ''}`} onClick={() => setCategory(27)}>
            <img src={automobiles} alt="Automobiles" className="w-6 mr-4" />
            <p>Automobiles</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-4">Subscriptions</h2>
        <div className="space-y-2">
          {[v1, v2, v3, v4, v5, v6].map((src, index) => (
            <div key={index} className="flex items-center p-2 cursor-pointer">
              <img src={src} alt={channelNames[index]} className="w-8 h-8 rounded-full mr-4" />
              <p>{channelNames[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
