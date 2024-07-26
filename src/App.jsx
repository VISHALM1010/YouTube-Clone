import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Video from './Pages/Video';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-screen">
      <Navbar setSidebar={setSidebar} setSearchQuery={setSearchQuery} />
      <div className="flex flex-grow">
        <Routes>
          <Route path='/' element={<Home sidebar={sidebar} searchQuery={searchQuery} />} />
          <Route path='/video/:categoryId/:videoId' element={<Video />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
