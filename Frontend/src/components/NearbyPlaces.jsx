import { useEffect, useState, useRef } from "react";

/* ---------- IMAGE WITH SKELETON ---------- */
const ImageWithSkeleton = ({ imageUrl, fallbackKeyword }) => {
  const [loaded, setLoaded] = useState(false);

  const finalUrl =
    imageUrl ||
    `https://source.unsplash.com/600x400/?${encodeURIComponent(
      fallbackKeyword
    )}`;

  return (
    <div className="relative w-full h-56 bg-gray-200 rounded-lg overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      <img
        src={finalUrl}
        alt={fallbackKeyword}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

/* ---------------- NEARBY PLACES ---------------- */

const NearbyPlaces = ({ userId }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/places/nearby/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaces(data);
        } else {
          setPlaces([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  /* ---------- CENTER SCALE LOGIC (SAME AS RECOMMENDED) ---------- */
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollByCards = (direction) => {
    if (!scrollRef.current) return;

    const card = scrollRef.current.children[0];
    if (!card) return;

    const gap = 36; // gap-9
    const cardWidth = card.offsetWidth + gap;

    scrollRef.current.scrollBy({
      left: direction * cardWidth * 4,
      behavior: "smooth",
    });
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-6">📍 Nearby Getaways</h2>

        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="min-w-[320px] md:min-w-[380px] h-64 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (places.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-2">📍 Nearby Getaways</h2>
        <p className="text-gray-500">
          No nearby places found for your location.
        </p>
      </div>
    );
  }

  /* ---------- SUCCESS ---------- */
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📍 Nearby Getaways
      </h2>

      <div className="relative flex items-center">
        {/* LEFT ARROW */}
        <button
          onClick={() => scrollByCards(-1)}
          className="
            -ml-20
            bg-gray-100 hover:bg-gray-200
            rounded-full w-14 h-14
            flex items-center justify-center
            shadow-md hover:scale-110 transition
            z-20
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-7 h-7 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            flex gap-9 overflow-x-auto pb-5
            snap-x snap-mandatory scroll-smooth
            no-scrollbar px-6
          "
        >
          {places.map((place, index) => (
            <div
              key={place._id}
              className={`
                snap-center
                min-w-[320px] md:min-w-[380px]
                bg-white rounded-xl
                transition-all duration-300
                ${
                  index === activeIndex
                    ? "scale-105 shadow-xl z-10"
                    : "scale-95 opacity-80"
                }
              `}
            >
              <ImageWithSkeleton
                imageUrl={place.image}
                fallbackKeyword={place.name}
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">{place.name}</h3>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {place.description}
                </p>

                <p className="text-sm font-medium text-blue-600 mt-2">
                  📍 {place.distanceKm?.toFixed(1)} km away
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scrollByCards(1)}
          className="
            -mr-20
            bg-gray-100 hover:bg-gray-200
            rounded-full w-14 h-14
            flex items-center justify-center
            shadow-md hover:scale-110 transition
            z-20
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-7 h-7 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NearbyPlaces;