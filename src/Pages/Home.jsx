import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Feed from '../Components/Feed';

const Home = ({ sidebar, searchQuery }) => {
  const [category, setCategory] = useState(0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`flex-1 transition-all duration-300 ${sidebar ? 'ml-64' : 'ml-0'}`}>
        <Feed category={category} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
