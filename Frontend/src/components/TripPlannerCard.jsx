import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import AboutUs from "./home/AboutUs";

/* ✅ MOVE SECTION OUTSIDE */
const Section = ({ title, children }) => (
  <div className="mt-10">
    <h2 className="text-lg font-semibold text-black mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const TripPlannerCard = () => {
  const navigate = useNavigate();

  // FORM STATES
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);

  const [groupSize, setGroupSize] = useState("Couple");
  const [peopleCount, setPeopleCount] = useState(2);

  const [perDayBudget, setPerDayBudget] = useState(1000);
  const [totalBudget, setTotalBudget] = useState(0);

  const [vibe, setVibe] = useState("");
  const [avoidList, setAvoidList] = useState("");

  const [loading, setLoading] = useState(false);

  /* AUTO PEOPLE COUNT */
  useEffect(() => {
    if (groupSize === "Solo") setPeopleCount(1);
    if (groupSize === "Couple") setPeopleCount(2);
    if (groupSize === "Family" && peopleCount < 3) setPeopleCount(3);
    if (groupSize === "Friends" && peopleCount < 3) setPeopleCount(3);
  }, [groupSize]);

  /* TOTAL BUDGET */
  useEffect(() => {
    setTotalBudget(perDayBudget * days * peopleCount);
  }, [perDayBudget, days, peopleCount]);

  /* API CALL */
  const handleGenerate = async () => {
    if (!destination || !days) {
      alert("Please fill destination and days");
      return;
    }

    try {
      setLoading(true);
      navigate("/loading");

      const response = await fetch(
        "http://localhost:5000/api/trip/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination,
            days,
            groupSize,
            peopleCount,
            perDayBudget,
            totalBudget,
            vibe,
            skip: avoidList,
          }),
        }
      );

      const data = await response.json();

      navigate("/plan", {
        state: { destination, trip: data },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      
    <div className="bg-[#F4FBFA] rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto">
    {/* // <div className="bg-[#F4FBFA] rounded-3xl shadow-2xl p-12 w-[50%] max-w-[1200px] mx-auto"> */}
      <h1 className="text-4xl font-bold text-center text-black">
        Plan Your Next Escape
      </h1>
      <p className="text-center text-black opacity-70 mt-1">
        Smart budgets. Better trips.
      </p>

      {/* TRIP BASICS */}
      <Section title="🧭 Destination & Days">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination (Tokyo, Paris, Bali)"
            className="w-full p-3 rounded-lg bg-[#EAF6F4] focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-[#EAF6F4] focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </Section>

      {/* GROUP */}
      <Section title="👥 Who’s Going">
        <select
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#EAF6F4] focus:ring-2 focus:ring-black outline-none"
        >
          <option>Solo</option>
          <option>Couple</option>
          <option>Family</option>
          <option>Friends</option>
        </select>

        {(groupSize === "Family" || groupSize === "Friends") && (
          <div className="bg-[#EAF6F4] rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm font-medium">Number of people</span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setPeopleCount(p => Math.max(3, p - 1))}
                className="w-9 h-9 bg-white rounded-full shadow font-bold"
              >
                −
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {peopleCount}
              </span>

              <button
                onClick={() =>
                  setPeopleCount(p =>
                    Math.min(groupSize === "Family" ? 10 : 15, p + 1)
                  )
                }
                className="w-9 h-9 bg-white rounded-full shadow font-bold"
              >
                +
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* BUDGET */}
      <Section title="💸 Budget Plan">
        <div className="bg-[#EAF6F4] rounded-xl p-5">
          <div className="flex justify-between mb-3 font-semibold">
            <span>₹{perDayBudget.toLocaleString()} / day</span>
            <span className="text-xs opacity-60">₹100 – ₹10,000</span>
          </div>

          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={perDayBudget}
            onChange={(e) => setPerDayBudget(Number(e.target.value))}
            className="w-full accent-black"
          />
        </div>

        <div className="bg-[#CDEDEC] rounded-xl p-4">
          <p className="text-sm opacity-70">
            ₹{perDayBudget} × {days} days × {peopleCount} people
          </p>
          <p className="text-lg font-bold">
            Total ≈ ₹{totalBudget.toLocaleString()}
          </p>
        </div>
      </Section>

      {/* VIBE */}
      <Section title="✨ Vibe Check">
        <textarea
          rows={4}
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="Adventure, relaxed pace, foodie experiences…"
          className="w-full p-4 rounded-xl bg-[#EAF6F4] focus:ring-2 focus:ring-black outline-none resize-none"
        />
      </Section>

      {/* AVOID */}
      <Section title="🚫 Avoid List">
        <p className="text-sm opacity-60">
          Tell us what you don’t enjoy — we’ll plan around it.
        </p>

        <input
          value={avoidList}
          onChange={(e) => setAvoidList(e.target.value)}
          placeholder="Crowds, nightlife, trekking…"
          className="w-full p-3 rounded-lg bg-[#EAF6F4] focus:ring-2 focus:ring-black outline-none"
        />
      </Section>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-12 w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90"
      >
        {loading ? "Generating..." : "Generate ExploreX Plan →"}
      </button>
    </div>
    
  
    
  );
};

export default TripPlannerCard;