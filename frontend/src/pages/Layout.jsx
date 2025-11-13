// import Sidebar from "../components/Sidebar";
// import Feed from "./Feed";

// const Layout = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <main className="flex-1 p-8 ml-64">
//         <h1 className="text-2xl font-bold text-indigo-900">Welcome to your Feed</h1>
//         {/* <Feed /> */}
//       </main>
//     </div>
//   )
// }

// export default Layout;

// import PostCard from "../components/PostCard";
// import RecentMessages from "../components/RecentMessages";
// import Sidebar from "../components/Sidebar";
// import { useEffect, useState } from "react";
// import { assets, dummyPostsData } from "../assets/assets";
// import SponsoredCard from "../components/SponsoredCard ";
// import SuggestionCard from "../components/SuggestionCard";
// import UpcomingEvents from "../components/UpcomingEvents";

// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   const [feeds, setFeeds] = useState([]);

//   const fetchFeeds = async () => {
//     setFeeds(dummyPostsData);
//   };

//   useEffect(() => {
//     fetchFeeds();
//   }, []);

//   const suggestions = [
//     { name: "John Doe", username: "johndoe", avatar: assets.sample_profile },
//     { name: "Jane Smith", username: "janesmith", avatar: assets.sample_profile },
//     { name: "Alex Johnson", username: "alexj", avatar: assets.sample_profile },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Posts (scrollable) */}
//       <main className="flex-1 p-8 overflow-y-auto flex justify-center no-scrollbar">
//         <Outlet />
//   <div className="w-full max-w-2xl space-y-8 flex flex-col items-center">
//     <h1 className="text-2xl font-bold text-indigo-900 mb-4">
//       Welcome to your Feed
//     </h1>
//     {feeds.map((post) => (
//       <PostCard key={post._id} post={post} />
//     ))}
//   </div>
// </main>
// {/*
// <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
//   <div className="w-full max-w-2xl space-y-8 mx-auto">
//     <h1 className="text-2xl font-bold text-indigo-900 mb-4">
//       Welcome to your Feed
//     </h1>
//     {feeds.map((post) => (
//       <PostCard key={post._id} post={post} />
//     ))}
//   </div>
// </main> */}

//       <aside className="w-75 p-4 bg-gray-100 overflow-y-auto no-scrollbar">
//         <RecentMessages />
//         <SuggestionCard />
//         <UpcomingEvents />
//       </aside>

//       {/* Sponsored Column */}
//       <aside className="w-70 p-4 bg-gray-100 overflow-y-auto">
//         <SponsoredCard
//         title="Sponsored"
//         image={assets.sponsored_img}
//         category="Email Marketing"
//         description="Supercharge your marketing with a powerful, easy-to-use platform built for results."
//       />
//       <SponsoredCard
//         title="Sponsored"
//         image={assets.sponsored_img}
//         category="Email Marketing"
//         description="Supercharge your marketing with a powerful, easy-to-use platform built for results."
//       />
//       </aside>

//     </div>
//   );
// };

// export default Layout;

import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";
import { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import SponsoredCard from "../components/SponsoredCard ";
import SuggestionCard from "../components/SuggestionCard";
import UpcomingEvents from "../components/UpcomingEvents";

const Layout = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    setFeeds(dummyPostsData);
  }, []);

  return (
    <div className="min-h-screen flex overflow-y-auto">
      {/* Main Posts (scrollable) */}
      <main className="flex-1 min-h-screen p-8 overflow-y-auto flex justify-center no-scrollbar">
        <div className="w-full max-w-2xl space-y-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Welcome to your Feed
          </h1>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </main>

      {/* Right rail */}
      <aside className="w-75 p-4 bg-gray-100 overflow-y-auto no-scrollbar">
        <RecentMessages />
        <SuggestionCard />
        <UpcomingEvents />
      </aside>

      {/* Sponsored Column */}
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
