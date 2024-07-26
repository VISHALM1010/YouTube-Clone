import React from 'react';
import PlayVideo from '../Components/PlayVideo';
import RecommendedVideo from '../Components/RecommendedVideo';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex-1 lg:max-w-3/4">
        <PlayVideo videoId={videoId} />
      </div>
      <div className="w-full lg:w-1/3">
        <RecommendedVideo categoryId={categoryId} />
      </div>
    </div>
  );
};

export default Video;
