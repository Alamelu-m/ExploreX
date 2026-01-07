import { useNavigate } from "react-router-dom";

const TripPlannerCard = () => {
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/plan");
  };

  return (
    <div className="bg-[#f2faf9] rounded-2xl shadow-xl p-8 w-full max-w-2xl">

      <h1 className="text-3xl font-bold text-black text-center">
        Plan Your Next Escape
      </h1>
      <p className="text-center text-black opacity-70 mt-1 mb-8">
        Explore beyond. Live beyond.
      </p>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            📍 Destination
          </label>
          <input
            className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
            placeholder="e.g. Tokyo, Paris, Bali"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            📅 Duration (Days)
          </label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
            placeholder="3"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            💲 Budget
          </label>
          <select className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none">
            <option>Moderate</option>
            <option>Low</option>
            <option>Luxury</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            👥 Group Size
          </label>
          <select className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none">
            <option>Couple</option>
            <option>Solo</option>
            <option>Family</option>
            <option>Friends</option>
          </select>
        </div>
      </div>

      {/* VIBE */}
      <div className="mt-6">
        <label className="text-sm font-medium text-black mb-1 block">
          ✨ Vibe Check
        </label>
        <textarea
          className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
          placeholder="Describe the vibe..."
        />
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          "Relaxing & Chill",
          "Cyberpunk Nightlife",
          "Historical Deep Dive",
          "Foodie Heaven",
          "Nature & Adventure",
        ].map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full border bg-[#DFF2EE] text-black"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* SKIP */}
      <div className="mt-6">
        <label className="text-sm font-medium text-black mb-1 block">
          🚫 Things to Skip
        </label>
        <input
          className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
          placeholder="Avoid crowds, No museums"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleGenerate}
        className="mt-8 w-full bg-[#ABDEE6] hover:bg-[#DFF2EE] text-black font-bold py-3 rounded-xl transition"
      >
        Generate ExploreX Plan →
      </button>
    </div>
  );
};

export default TripPlannerCard;

