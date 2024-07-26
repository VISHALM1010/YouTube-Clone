import React, { useEffect, useState } from 'react';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import { Api_key, value_converter } from '../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      const video_info_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${Api_key}`;
      try {
        const response = await fetch(video_info_url);
        const data = await response.json();
        setApiData(data.items[0]);
      } catch (error) {
        console.error('Error fetching video data:', error.message);
      }
    };

    const fetchChannelData = async () => {
      if (apiData) {
        const Channel_info_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${Api_key}`;
        try {
          const response = await fetch(Channel_info_url);
          const data = await response.json();
          setChannelInfo(data.items[0]);
        } catch (error) {
          console.error('Error fetching channel data:', error.message);
        }
      }
    };

    const fetchCommentData = async () => {
      const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${Api_key}`;
      try {
        const response = await fetch(comment_url);
        const data = await response.json();
        setCommentData(data.items);
      } catch (error) {
        console.error('Error fetching comment data:', error.message);
      }
    };

    fetchVideoData();
    fetchChannelData();
    fetchCommentData();
  }, [videoId, apiData]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="flex flex-col flex-1 mr-4 p-4 bg-white rounded-lg shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        className="w-full h-72 md:h-96 lg:h-[37vw] max-h-[600px] border-none rounded-md"
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        title="Video Player"
      ></iframe>

      <h3 className="font-semibold text-xl mt-4 mb-2">{apiData ? apiData.snippet.title : 'Title Here'}</h3>

      <div className="flex justify-between items-center flex-wrap text-sm text-gray-600 mb-4">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : '10k'} &bull;{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : '2 days ago'}
        </p>
        <div className="flex items-center space-x-5">
          <span className="flex items-center">
            <img src={like} alt='Like' className="w-5 mr-2" /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span className="flex items-center">
            <img src={dislike} alt='Dislike' className="w-5 mr-2" /> {apiData ? value_converter(apiData.statistics.dislikeCount) : 155}
          </span>
          <span className="flex items-center">
            <img src={share} alt='Share' className="w-5 mr-2" /> Share
          </span>
          <span className="flex items-center">
            <img src={save} alt='Save' className="w-5 mr-2" /> Save
          </span>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      <div className="flex items-center mb-4">
        <img src={channelInfo ? channelInfo.snippet.thumbnails.default.url : ''} alt='Channel Thumbnail' className="rounded-full w-10 h-10 mr-4" />
        <div className="flex-1 leading-5">
          <p className="text-black font-semibold text-lg">{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span className="text-sm text-gray-500">{channelInfo ? value_converter(channelInfo.statistics.subscriberCount) : '1M'} Subscribers</span>
        </div>
        <button className="bg-red-500 text-white py-2 px-6 rounded">Subscribe</button>
      </div>

      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4' onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <div className="mt-5">
          {commentData.map((item, index) => (
            <div key={index} className='flex mt-5 bg-gray-50 p-4 rounded-lg'>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='Author Profile' className="rounded-full w-9 h-9 mr-4" />
              <div>
                <h3 className="text-sm mb-1">
                  {item.snippet.topLevelComment.snippet.authorDisplayName} <span className="text-xs text-gray-500">1 day ago</span>
                </h3>
                <p className="text-gray-600">{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className='flex items-center space-x-3 mt-2 text-gray-600'>
                  <img src={like} alt='Like' className="w-5 h-5" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt='Dislike' className="w-5 h-5" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.dislikeCount)}</span>
                </div>
              </div>
            </div>
          ))}
          <div className='mt-5'>
            <p className="text-gray-600">{apiData ? apiData.snippet.description.slice(0, 256) : 'Description Here'}...</p>
            <h4 className="text-gray-600 mt-3">{apiData ? value_converter(apiData.statistics.commentCount) : 230} comments</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayVideo;
