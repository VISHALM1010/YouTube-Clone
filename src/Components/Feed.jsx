import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { value_converter } from '../data';
import moment from 'moment';
import { Api_key } from '../data';

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      setError(null);

      try {
        let url = '';
        if (searchQuery) {
          url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${Api_key}`;
        } else {
          url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${Api_key}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        setData(result.items || []);
      } catch (error) {
        setError('Failed to load videos');
      }
    };

    fetchData();
  }, [category, searchQuery]);

  if (error) return <div className="text-center text-xl text-red-500 py-10">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data.map((item, index) => (
        <Link key={index} to={`/video/${item.snippet.categoryId}/${item.id.videoId || item.id}`} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className="w-full h-48 object-cover" />
          <div className="p-3">
            <h2 className="font-semibold text-lg mb-1 truncate">{item.snippet.title}</h2>
            <h3 className="font-bold text-sm text-gray-600">{item.snippet.channelTitle}</h3>
            <p className="text-gray-500 text-xs">{value_converter(item.statistics?.viewCount || 0)} views • {moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
