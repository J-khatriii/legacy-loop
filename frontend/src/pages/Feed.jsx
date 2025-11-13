import { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="flex items-start justify-between h-full overflow-y-scroll no-scrollbar py-10 pr-6">
      {/* Main Feed Section */}
      <div className="flex-1 pl-2 pr-8 space-y-8 max-w-2xl">
        {feeds.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:flex flex-col gap-6 sticky top-10">
        {/* Sponsored Card */}
        <div className="w-80 bg-white text-sm p-5 rounded-xl shadow-md flex flex-col gap-3">
          <h3 className="text-slate-800 font-semibold text-base">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="rounded-lg w-full h-44 object-cover"
            alt="Sponsored"
          />
          <p className="text-slate-700 font-medium">Email Marketing</p>
          <p className="text-slate-500 leading-relaxed text-[13px]">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
          <button className="mt-2 self-start text-indigo-600 text-sm font-semibold hover:underline">
            Learn more →
          </button>
        </div>

        {/* Recent Messages */}
        <div className="w-80">
          <RecentMessages />
        </div>
      </div>
    </div>
  );
};

export default Feed;
