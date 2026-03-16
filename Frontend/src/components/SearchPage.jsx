import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const destinationImages = {
  Coimbatore: "https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e",
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  Tokyo: "https://images.unsplash.com/photo-1549693578-d683be217e58",
};

const SearchPage = () => {
  const { state } = useLocation();
  const query = state?.query || "";
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchTrip = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/search", { query });
        setTrip(res.data);
      } catch (err) {
        console.error(err);
        setTrip(null);
      }
    };

    fetchTrip();
  }, [query]);

  const heroImage =
    destinationImages[query] ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="relative rounded-b-3xl overflow-hidden shadow-lg">
        <img
          src={heroImage}
          alt={query}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6 text-white">
          <h1 className="text-4xl font-bold">{query}</h1>
        </div>
      </div>

      {/* Trip Data */}
      <div className="max-w-4xl mx-auto mt-6 px-6 space-y-6">
        {trip ? (
          <>
            <p className="text-gray-700 font-medium">Summary: {trip.summary}</p>
            <p className="text-gray-700 font-medium">Category: {trip.category}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trip.places?.map((place, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-md p-4">
                  <h3 className="text-lg font-bold text-blue-600">{place.name}</h3>
                  <p className="text-sm text-gray-500">{place.type}</p>
                  <p className="mt-2 text-gray-700 text-sm">{place.description}</p>
                  <p className="mt-1 text-gray-500 text-xs">{place.location}</p>
                  <p className="mt-1 text-gray-500 text-xs">
                    Budget: {place.estimatedBudget} | Status: {place.currentUpdate}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading trip data...</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
