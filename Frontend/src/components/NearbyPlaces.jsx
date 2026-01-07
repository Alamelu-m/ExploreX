const nearby = [
  {
    name: "Ooty",
    img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe",
  },
  {
    name: "Kodaikanal",
    img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
  },
  {
    name: "Yercaud",
    img: "https://images.unsplash.com/photo-1614854262340-ab1ca7d079c3",
  },
];

const NearbyPlaces = () => {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4 mb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📍 Nearby Getaways
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {nearby.map((place) => (
          <div
            key={place.name}
            className="min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={place.img}
              alt={place.name}
              className="h-32 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-gray-900">
                {place.name}
              </h3>
              <p className="text-sm text-gray-500">
                Perfect for a quick trip
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPlaces;
