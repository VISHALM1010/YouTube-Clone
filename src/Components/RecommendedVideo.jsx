import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { value_converter } from '../data';
import moment from 'moment';
import { Api_key } from '../data';

const RecommendedVideo = ({ categoryId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=25&regionCode=IN&videoCategoryId=${categoryId}&key=${Api_key}`);
        const result = await response.json();
        setData(result.items || []);
      } catch (error) {
        setError('Failed to load recommended videos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) return <div className="text-center text-2xl py-10">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500 py-10">{error}</div>;

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <Link key={index} to={`/video/${item.snippet.categoryId}/${item.id.videoId || item.id}`} className="flex items-start space-x-4 bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className="w-24 h-24 object-cover" />
          <div className="flex flex-col justify-between p-3">
            <h2 className="font-semibold text-lg mb-1 truncate">{item.snippet.title}</h2>
            <p className="text-gray-500 text-xs">{value_converter(item.statistics?.viewCount || 0)} views • {moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedVideo;
