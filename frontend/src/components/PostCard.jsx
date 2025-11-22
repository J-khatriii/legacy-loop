import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const PostCard = ({ post, currentUser, refreshFeed }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const navigate = useNavigate();

  const author = post.author || {};

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      await axios.post(
        `http://localhost:4000/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );

      setLikes((prev) =>
        prev.includes(currentUser._id)
          ? prev.filter((id) => id !== currentUser._id)
          : [...prev, currentUser._id]
      );

      refreshFeed?.();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4 w-full max-w-xl">
      {/* User Info */}
      <div
        onClick={() => author._id && navigate("/profile/" + author._id)}
        className="inline-flex items-center gap-3 cursor-pointer"
      >
        <img
          src={author.profileImage || assets.profile}
          alt="user"
          className="w-10 h-10 rounded-full shadow"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span>{author.name || "Unknown"}</span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-sm text-gray-500">
            @{author.name?.replace(/\s+/g, "").toLowerCase() || "user"} ·{" "}
            {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div
          className="text-gray-500 text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(
              /(#\w+)/g,
              '<span class="text-blue-500 cursor-pointer">$1</span>'
            ),
          }}
        />
      )}

      {/* Media */}
      {post.media?.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {post.media.map((m, index) => (
            <div key={index} className={m.type === "video" ? "col-span-2" : ""}>
              {m.type === "image" ? (
                <img
                  src={m.url}
                  className={`w-full h-48 object-cover rounded-lg ${
                    post.media.length === 1 ? "col-span-2 h-auto" : ""
                  }`}
                  alt="post media"
                />
              ) : (
                <video
                  controls
                  src={m.url}
                  className="w-full h-48 object-cover rounded-lg col-span-2"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
        <div className="flex items-center gap-1">
          <Heart
            className={`w-4 h-4 cursor-pointer ${
              currentUser && likes.includes(currentUser._id)
                ? "text-red-500 fill-red-500"
                : ""
            }`}
            onClick={handleLike}
          />
          <span>{likes.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{post.commentsCount || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
