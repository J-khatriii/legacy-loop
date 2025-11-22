import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import SponsoredCard from "../components/SponsoredCard ";
import RecentMessages from "../components/RecentMessages";
import SuggestionCard from "../components/SuggestionCard";
import UpcomingEvents from "../components/UpcomingEvents";
import { assets } from "../assets/assets";

const Layout = () => {
  const [feeds, setFeeds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchPosts = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;
      setCurrentUser(storedUser);

      const res = await axios.get("http://localhost:4000/api/posts/all", {
        headers: { Authorization: `Bearer ${storedUser.token}` },
      });

      setFeeds(res.data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex overflow-y-auto">
      <main className="flex-1 min-h-screen p-8 overflow-y-auto flex justify-center no-scrollbar">
        <div className="w-full max-w-2xl space-y-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Welcome to your Feed
          </h1>
          {currentUser ? (
            feeds.length > 0 ? (
              feeds.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUser={currentUser}
                  refreshFeed={fetchPosts}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10">No posts found</div>
            )
          ) : (
            <div className="text-center text-gray-500 mt-10">
              Please login to see posts
            </div>
          )}
        </div>
      </main>

      <aside className="w-75 p-4 bg-gray-100 overflow-y-auto no-scrollbar">
        <RecentMessages />
        <SuggestionCard />
        <UpcomingEvents />
      </aside>

      <aside className="w-70 p-4 bg-gray-100 overflow-y-auto">
        <SponsoredCard
          title="Sponsored"
          image={assets.sponsored_img}
          category="Email Marketing"
          description="Supercharge your marketing with a powerful, easy-to-use platform built for results."
        />
        <SponsoredCard
          title="Sponsored"
          image={assets.sponsored_img}
          category="Email Marketing"
          description="Supercharge your marketing with a powerful, easy-to-use platform built for results."
        />
      </aside>
    </div>
  );
};

export default Layout;
