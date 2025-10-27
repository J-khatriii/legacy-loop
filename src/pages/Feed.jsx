import { useEffect, useState } from 'react';
import { dummyPostsData } from '../assets/assets';
import Loading from '../Components/Loading';
import StoriesBar from '../Components/StoriesBar';

const Feed = () => {

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
  }

  // fetch the posts
  useEffect(() => {
    fetchFeeds();
  },[]);

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* stories and  posts list */}
      <div className="">
        <StoriesBar />
        <div className='p-4 space-y-6'>
          List of posts
        </div>
      </div>

      {/* right sidebar */}
      <div className="">
        <div>
          <h1>Sponsored</h1>
        </div>
        <h1>Recent messages</h1>
      </div>
    </div>
  ) : <Loading /> 
}

export default Feed
