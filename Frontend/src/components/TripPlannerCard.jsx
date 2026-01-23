import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TripPlannerCard = () => {
  const navigate = useNavigate();

  // FORM STATES
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("Moderate");
  const [groupSize, setGroupSize] = useState("Couple");
  const [vibe, setVibe] = useState("");
  const [skip, setSkip] = useState("");
  const [loading, setLoading] = useState(false);

  // API CALL
  const handleGenerate = async () => {
    if (!destination || !days) {
      alert("Please fill destination and days");
      return;
    }

    try {
      // setLoading(true);
      navigate("/loading");
      
      const response = await fetch(
        "http://localhost:5000/api/trip/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            days,
            budget,
            groupSize,
            vibe,
            skip,
          }),
        }
      );

      const data = await response.json();

      navigate("/plan", { 
        state: { 
        destination,
        trip: data,
      }
      });
    } catch (error) {
      console.error("Error generating trip:", error);
      alert("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f2faf9] rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-black text-center">
        Plan Your Next Escape
      </h1>
      <p className="text-center text-black opacity-70 mt-1 mb-8">
        Explore beyond. Live beyond.
      </p>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DESTINATION */}
        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            📍 Destination
          </label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
            placeholder="e.g. Tokyo, Paris, Bali"
          />
        </div>

        {/* DAYS */}
        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            📅 Duration (Days)
          </label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
            placeholder="3"
          />
        </div>

        {/* BUDGET */}
        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            💲 Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
          >
            <option>Moderate</option>
            <option>Low</option>
            <option>Luxury</option>
          </select>
        </div>

        {/* GROUP SIZE */}
        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            👥 Group Size
          </label>
          <select
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
          >
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
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
          placeholder="Relaxed beach vibe, foodie trip, adventure..."
        />
      </div>

      {/* TAG SUGGESTIONS */}
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
            onClick={() => setVibe(tag)}
            className="cursor-pointer text-xs px-3 py-1 rounded-full border bg-[#DFF2EE] text-black hover:bg-[#ABDEE6]"
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
          value={skip}
          onChange={(e) => setSkip(e.target.value)}
          className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
          placeholder="Avoid crowds, No museums"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-8 w-full bg-[#ABDEE6] hover:bg-[#DFF2EE] text-black font-bold py-3 rounded-xl transition"
      >
        {loading ? "Generating your plan..." : "Generate ExploreX Plan →"}
      </button>
    </div>
  );
};

export default TripPlannerCard;





// import { useNavigate } from "react-router-dom";

// const TripPlannerCard = () => {
//   const navigate = useNavigate();

//   const handleGenerate = () => {
//     navigate("/plan");
//   };

//   return (
//     <div className="bg-[#f2faf9] rounded-2xl shadow-xl p-8 w-full max-w-2xl">

//       <h1 className="text-3xl font-bold text-black text-center">
//         Plan Your Next Escape
//       </h1>
//       <p className="text-center text-black opacity-70 mt-1 mb-8">
//         Explore beyond. Live beyond.
//       </p>

//       {/* FORM GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         <div>
//           <label className="text-sm font-medium text-black mb-1 block">
//             📍 Destination
//           </label>
//           <input
//             className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
//             placeholder="e.g. Tokyo, Paris, Bali"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-black mb-1 block">
//             📅 Duration (Days)
//           </label>
//           <input
//             type="number"
//             className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
//             placeholder="3"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-black mb-1 block">
//             💲 Budget
//           </label>
//           <select className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none">
//             <option>Moderate</option>
//             <option>Low</option>
//             <option>Luxury</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium text-black mb-1 block">
//             👥 Group Size
//           </label>
//           <select className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none">
//             <option>Couple</option>
//             <option>Solo</option>
//             <option>Family</option>
//             <option>Friends</option>
//           </select>
//         </div>
//       </div>

//       {/* VIBE */}
//       <div className="mt-6">
//         <label className="text-sm font-medium text-black mb-1 block">
//           ✨ Vibe Check
//         </label>
//         <textarea
//           className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
//           placeholder="Describe the vibe..."
//         />
//       </div>

//       {/* TAGS */}
//       <div className="flex flex-wrap gap-2 mt-3">
//         {[
//           "Relaxing & Chill",
//           "Cyberpunk Nightlife",
//           "Historical Deep Dive",
//           "Foodie Heaven",
//           "Nature & Adventure",
//         ].map((tag) => (
//           <span
//             key={tag}
//             className="text-xs px-3 py-1 rounded-full border bg-[#DFF2EE] text-black"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* SKIP */}
//       <div className="mt-6">
//         <label className="text-sm font-medium text-black mb-1 block">
//           🚫 Things to Skip
//         </label>
//         <input
//           className="w-full p-3 border rounded-lg bg-[#DFF2EE] text-black focus:ring-2 focus:ring-black outline-none"
//           placeholder="Avoid crowds, No museums"
//         />
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={handleGenerate}
//         className="mt-8 w-full bg-[#ABDEE6] hover:bg-[#DFF2EE] text-black font-bold py-3 rounded-xl transition"
//       >
//         Generate ExploreX Plan →
//       </button>
//     </div>
//   );
// };

// export default TripPlannerCard;

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const TripPlannerCard = () => {
//   const navigate = useNavigate();
//   const [budget, setBudget] = useState(5000);

//   const handleGenerate = () => {
//     navigate("/plan");
//   };

//   return (
//     <div className="relative bg-gradient-to-br from-[#E8F8F6] to-[#FDFEFE]
//       rounded-3xl shadow-2xl p-10 w-full max-w-3xl
//       hover:scale-[1.02] transition-transform duration-300">

//       {/* HEADER */}
//       <h1 className="text-4xl font-extrabold text-gray-900 text-center">
//         Plan Your Next Escape ✈️
//       </h1>
//       <p className="text-center text-gray-600 mt-2 mb-10">
//         Explore beyond. Live beyond.
//       </p>

//       {/* FORM GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* DESTINATION */}
//         <div>
//           <label className="text-sm font-semibold text-gray-800 mb-2 block">
//             📍 Destination
//           </label>
//           <input
//             className="w-full p-4 rounded-xl bg-[#DFF2EE]
//             focus:ring-2 focus:ring-black outline-none"
//             placeholder="Tokyo, Paris, Bali"
//           />
//         </div>

//         {/* DURATION */}
//         <div>
//           <label className="text-sm font-semibold text-gray-800 mb-2 block">
//             📅 Duration (Days)
//           </label>
//           <input
//             type="number"
//             className="w-full p-4 rounded-xl bg-[#DFF2EE]
//             focus:ring-2 focus:ring-black outline-none"
//             placeholder="3"
//           />
//         </div>

//         {/* BUDGET SLIDER */}
//         <div className="md:col-span-2">
//           <label className="text-sm font-semibold text-gray-800 mb-3 block">
//             💰 Budget (₹)
//           </label>

//           <div className="flex items-center gap-6">
//             <input
//               type="range"
//               min="0"
//               max="10000"
//               step="1000"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               className="w-full accent-black cursor-pointer"
//             />

//             <span className="min-w-[90px] text-lg font-bold text-gray-900">
//               ₹{budget}
//             </span>
//           </div>

//           {/* MARKERS */}
//           <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
//             <span>0</span>
//             <span>1k</span>
//             <span>5k</span>
//             <span>10k</span>
//           </div>
//         </div>

//         {/* GROUP SIZE */}
//         <div>
//           <label className="text-sm font-semibold text-gray-800 mb-2 block">
//             👥 Group Size
//           </label>
//           <select className="w-full p-4 rounded-xl bg-[#DFF2EE]
//             focus:ring-2 focus:ring-black outline-none">
//             <option>Solo</option>
//             <option>Couple</option>
//             <option>Family</option>
//             <option>Friends</option>
//           </select>
//         </div>

//         {/* VIBE */}
//         <div>
//           <label className="text-sm font-semibold text-gray-800 mb-2 block">
//             ✨ Trip Vibe
//           </label>
//           <input
//             className="w-full p-4 rounded-xl bg-[#DFF2EE]
//             focus:ring-2 focus:ring-black outline-none"
//             placeholder="Relaxing, Adventure, Party..."
//           />
//         </div>
//       </div>

//       {/* TAGS */}
//       <div className="flex flex-wrap gap-3 mt-6">
//         {[
//           "🌿 Chill",
//           "🌃 Nightlife",
//           "🏛 History",
//           "🍜 Foodie",
//           "🏔 Adventure",
//         ].map((tag) => (
//           <span
//             key={tag}
//             className="px-4 py-1.5 text-sm rounded-full
//             bg-white/70 backdrop-blur border hover:scale-105 transition"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* SKIP */}
//       <div className="mt-6">
//         <label className="text-sm font-semibold text-gray-800 mb-2 block">
//           🚫 Things to Skip
//         </label>
//         <input
//           className="w-full p-4 rounded-xl bg-[#DFF2EE]
//           focus:ring-2 focus:ring-black outline-none"
//           placeholder="Crowds, Museums, Long travel"
//         />
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={handleGenerate}
//         className="mt-10 w-full bg-black text-white
//         font-bold py-4 rounded-2xl text-lg
//         hover:tracking-wide hover:bg-gray-900 transition-all"
//       >
//         Generate ExploreX Plan →
//       </button>
//     </div>
//   );
// };

// export default TripPlannerCard;
