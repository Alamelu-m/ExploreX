const places = [
  {
    name: "Paris",
    days: "3 Days",
    desc: "Romantic streets, art museums and cafes.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    name: "Bali",
    days: "5 Days",
    desc: "Beaches, temples and peaceful vibes.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Tokyo",
    days: "4 Days",
    desc: "Modern city with traditional culture.",
    img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
  },
];

const RecommendedPlaces = () => {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🌍 Recommended Places
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place) => (
          <div
            key={place.name}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={place.img}
              alt={place.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900">
                {place.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {place.desc}
              </p>
              <p className="text-sm font-medium text-blue-600 mt-2">
                ⏱ {place.days}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
