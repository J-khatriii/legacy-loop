const SponsoredCard = ({ title, image, category, description }) => {
  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-lg shadow text-xs text-slate-600">
      <h1 className="font-semibold text-slate-800 mb-4">{title}</h1>
      <img
        src={image}
        className="rounded-md w-full h-48 object-cover mb-3"
        alt={title}
      />
      <p className="text-slate-600">{category}</p>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};

export default SponsoredCard;
