import { useState } from "react";
import axios from "axios";
import { ImagePlus, X } from "lucide-react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return alert("Title & content required.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);

    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post("http://localhost:4000/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created!");
      setTitle("");
      setContent("");
      setTags("");
      setImages([]);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-bold text-black mb-6">Create a New Post</h1>

        <div className="max-w-3xl bg-white shadow-md rounded-xl p-6 space-y-6">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium shadow-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium shadow-sm resize-none"
            />
          </div>

          {/* Tag Input */}
          <div>
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              placeholder="e.g. college, events, placement (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium shadow-sm"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">Images</label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-black/40 transition">
              <input
                type="file"
                multiple
                className="hidden"
                id="postImages"
                onChange={handleImageUpload}
              />

              <label htmlFor="postImages" className="flex flex-col items-center">
                <ImagePlus size={32} className="text-gray-500" />
                <p className="text-gray-600 mt-2 text-sm font-medium">
                  Click to upload images
                </p>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-28 h-28 rounded-lg overflow-hidden shadow-md group"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => {
                setTitle("");
                setContent("");
                setTags("");
                setImages([]);
              }}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-black text-white font-semibold hover:bg-black/90 transition shadow-sm"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
