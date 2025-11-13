import { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    setSuggestions([
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        avatar: assets.sample_profile,
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "janesmith",
        avatar: assets.sample_profile,
      },
      {
        id: 3,
        name: "Alex Johnson",
        username: "alexj",
        avatar: assets.sample_profile,
      },
    ]);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="bg-white max-w-xs mt-4 p-4 rounded-lg shadow text-xs text-slate-600">
      <h3 className="text-slate-800 font-semibold mb-4">Suggestions</h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between py-2 px-1 hover:bg-slate-100 rounded-md"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{user.name}</span>
                <span className="text-gray-500 text-[10px]">
                  @{user.username}
                </span>
              </div>
            </div>
            <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full cursor-pointer">
              Follow
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
