// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import ChatBot from "../components/ChatBot";
// import LogisticsTab from "../components/LogisticsTab";

// const destinationImages = {
//   Coimbatore:
//     "https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e",
//   Paris:
//     "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
//   Tokyo:
//     "https://images.unsplash.com/photo-1549693578-d683be217e58",
// };

// const TripPlanPage = () => {
//   const { state } = useLocation();
//   const [activeTab, setActiveTab] = useState("plan");
//   const [showMap, setShowMap] = useState(false);

//   const destination = state?.destination || "Your Trip";
//   const trip = state?.trip;
//   console.log("TripPlanPage state:", state);


//   const heroImage =
//     destinationImages[destination] ||
//     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

//   return (
//     <div className="bg-gray-50 min-h-screen relative">
//       {/* HERO */}
//       <div className="relative rounded-b-3xl overflow-hidden shadow-lg">
//         <img
//           src={heroImage}
//           alt={destination}
//           className="w-full h-80 object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-end">
//           <div className="p-6 text-white">
//             <h1 className="text-4xl font-bold">{destination}</h1>
//             <p className="mt-2 max-w-xl text-sm">
//               A curated travel plan crafted just for you.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="max-w-4xl mx-auto mt-6 px-6 flex gap-6 border-b">
//         {["plan", "logistics", "map"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab);
//               setShowMap(tab === "map");
//             }}
//             className={`pb-3 font-medium capitalize ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-600 text-blue-600"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-4xl mx-auto mt-8 px-6 space-y-8">
//         {/* PLAN TAB */}
//         {activeTab === "plan" &&
//           trip?.days?.map((day) => (
//             <div key={day.day} className="space-y-4">
//               <h2 className="text-2xl font-bold text-blue-600">
//                 Day {day.day} · {day.area}
//               </h2>

//               {day.schedule.map((place, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl shadow-md p-6"
//                 >
//                   <div className="flex justify-between">
//                     <h3 className="text-lg font-semibold">
//                       {place.place}
//                     </h3>
//                     <span className="text-sm text-gray-500">
//                       {place.time}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-gray-600 text-sm">
//                     {place.description}
//                   </p>

//                   <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
//                     <span>⏳ {place.duration}</span>
//                     {place.travelTime && (
//                       <span>🚶 {place.travelTime}</span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}

//         {/* LOGISTICS TAB */}
//         {activeTab === "logistics" && (
//           <LogisticsTab trip={trip} totalBudget={state?.budget} />
//         )}
//       </div>

//       {/* MAP */}
//       {showMap && (
//         <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50">
//           <button
//             onClick={() => {
//               setShowMap(false);
//               setActiveTab("plan");
//             }}
//             className="absolute top-4 right-4 bg-white rounded-full shadow px-3 py-1 font-bold"
//           >
//             ✕
//           </button>

//           <iframe
//             title="map"
//             className="w-full h-full"
//             loading="lazy"
//             src={`https://www.google.com/maps?q=${destination}&output=embed`}
//           />
//         </div>
//       )}

//       <ChatBot />
//     </div>
//   );
// };

// export default TripPlanPage;

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatBot from "../components/ChatBot";
import LogisticsTab from "../components/LogisticsTab";
import MapComponent from "../components/MapComponent";

const destinationImages = {
  Coimbatore:
    "https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e",
  Paris:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  Tokyo:
    "https://images.unsplash.com/photo-1549693578-d683be217e58",
};

const TripPlanPage = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("plan");
  const [showMap, setShowMap] = useState(false);

  const [logistics, setLogistics] = useState([]);
  const [loadingLogistics, setLoadingLogistics] = useState(false);

  const destination = state?.destination || "Your Trip";
  const trip = state?.trip;
  const totalBudget = state?.budget || 10000;

  const heroImage =
    destinationImages[destination] ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

  // ✅ CALL LOGISTICS ONLY ONCE WHEN TRIP IS AVAILABLE
  useEffect(() => {
    if (!trip) return;

    const fetchLogistics = async () => {
      try {
        setLoadingLogistics(true);

        const res = await axios.post(
          "http://localhost:5000/api/logistics/near-plan",
          {
            plan: trip,
            totalBudget: totalBudget,
          }
        );

        setLogistics(res.data.resultsPerDay || []);
      } catch (err) {
        console.error("Logistics fetch error:", err);
      } finally {
        setLoadingLogistics(false);
      }
    };

    fetchLogistics();
  }, [trip]); // 👈 ONLY DEPENDS ON TRIP (runs once)

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* HERO */}
      <div className="relative rounded-b-3xl overflow-hidden shadow-lg">
        <img
          src={heroImage}
          alt={destination}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-4xl font-bold">{destination}</h1>
            <p className="mt-2 max-w-xl text-sm">
              A curated travel plan crafted just for you.
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-4xl mx-auto mt-6 px-6 flex gap-6 border-b">
        {["plan", "logistics", "map"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowMap(tab === "map");
            }}
            className={`pb-3 font-medium capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto mt-8 px-6 space-y-8">

        {/* PLAN TAB */}
        {activeTab === "plan" &&
          trip?.days?.map((day) => (
            <div key={day.day} className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Day {day.day} · {day.area}
              </h2>

              {day.schedule.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md p-6"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">
                      {place.place}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {place.time}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600 text-sm">
                    {place.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>⏳ {place.duration}</span>
                    {place.travelTime && (
                      <span>🚶 {place.travelTime}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* LOGISTICS TAB */}
        {activeTab === "logistics" && (
          <LogisticsTab
            logistics={logistics}
            loading={loadingLogistics}
          />
        )}
      </div>

      {/* MAP */}
       {showMap && (
        // <MapComponent
        //   destination={destination}
        //   onClose={() => {
        //     setShowMap(false);
        //     setActiveTab("plan");
        //   }}
        // />
        <MapComponent
          plan={trip}
          logistics={logistics}
          destination={destination}
          onClose={() => {
            setShowMap(false);
            setActiveTab("plan");
          }}
        />
      )}

      <ChatBot />
    </div>
  );
};

export default TripPlanPage;
