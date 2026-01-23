// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import ChatBot from "../components/ChatBot";

// const TripPlanPage = () => {
//   const { state } = useLocation();
//   const [activeTab, setActiveTab] = useState("plan");
//   const [showMap, setShowMap] = useState(false);

//   return (
//     <div className="bg-gray-50 min-h-screen relative">

//       {/* HERO SECTION */}
//       <div className="relative rounded-b-3xl overflow-hidden shadow-lg">
//         <img
//           src="https://images.unsplash.com/photo-1549693578-d683be217e58"
//           alt="Destination"
//           className="w-full h-80 object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
//           <div className="p-6 text-white">
//             <h1 className="text-4xl font-bold">
//               {state?.destination || "Your Trip"}
//             </h1>
//             <p className="mt-2 max-w-xl text-sm">
//               A perfect blend of culture, modern life, and unforgettable experiences curated just for you.
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

//       {/* MAIN CONTENT */}
//       <div className="max-w-4xl mx-auto mt-8 px-6 space-y-8">

//         {/* PLAN TAB */}
//         {activeTab === "plan" && (
//           <>
//             {[
//               {
//                 day: "Day 1",
//                 title: "Arrival & Neon City Walk",
//                 time: "10:00 AM – 9:00 PM",
//                 desc: "Arrive, settle in, and explore the vibrant streets of Shinjuku with glowing neon lights and local food spots.",
//               },
//               {
//                 day: "Day 2",
//                 title: "Tradition & Temples",
//                 time: "9:00 AM – 6:00 PM",
//                 desc: "Visit Senso-ji Temple, stroll Asakusa streets, and experience a traditional tea ceremony.",
//               },
//               {
//                 day: "Day 3",
//                 title: "Tech & Pop Culture",
//                 time: "10:00 AM – 8:00 PM",
//                 desc: "Dive into Akihabara’s anime culture, gaming arcades, and themed cafés.",
//               },
//               {
//                 day: "Day 4",
//                 title: "Nature Escape",
//                 time: "8:00 AM – 5:00 PM",
//                 desc: "A peaceful day trip to Mount Takao with scenic trails and panoramic city views.",
//               },
//               {
//                 day: "Day 5",
//                 title: "Shopping & Farewell",
//                 time: "11:00 AM – 7:00 PM",
//                 desc: "Shop in Shibuya and Harajuku, enjoy local desserts, and wrap up your journey.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.day}
//                 className="bg-white rounded-2xl shadow-md p-6"
//               >
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-blue-600">
//                     {item.day}
//                   </h2>
//                   <span className="text-sm text-gray-500">
//                     {item.time}
//                   </span>
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold text-gray-900">
//                   {item.title}
//                 </h3>
//                 <p className="mt-2 text-gray-600 text-sm">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </>
//         )}

//         {/* LOGISTICS TAB */}
//         {activeTab === "logistics" && (
//           <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
//             <p>✈️ Best Airport: Narita International Airport</p>
//             <p>🚆 Local Transport: JR Pass / Metro Card</p>
//             <p>🏨 Suggested Stay: Shinjuku / Shibuya</p>
//             <p>📱 Connectivity: Pocket WiFi / eSIM</p>
//             <p>💳 Currency: Japanese Yen (JPY)</p>
//           </div>
//         )}
//       </div>

//       {/* MAP OVERLAY */}
//       {showMap && (
//         <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50 animate-slideIn">

//           {/* Close */}
//           <button
//             onClick={() => {
//               setShowMap(false);
//               setActiveTab("plan");
//             }}
//             className="absolute top-4 right-4 bg-white rounded-full shadow px-3 py-1 font-bold"
//           >
//             ✕
//           </button>

//           {/* Map */}
//           <iframe
//             title="map"
//             className="w-full h-full"
//             loading="lazy"
//             src="https://www.google.com/maps?q=Tokyo&output=embed"
//           />
//         </div>
//       )}
//       <ChatBot/>
//     </div>
//   );
// };

// export default TripPlanPage;----------------------------------------------------------------------

import { useLocation } from "react-router-dom";
import { useState } from "react";
import ChatBot from "../components/ChatBot";

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

  const destination = state?.destination || "Your Trip";
  const trip = state?.trip;
  console.log("TripPlanPage state:", state);


  const heroImage =
    destinationImages[destination] ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

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
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <p>🏨 Suggested Stay near city center</p>
            <p>🚕 Local transport: Cab / Metro</p>
            <p>📱 Maps & navigation recommended</p>
            <p>💳 Carry digital payments</p>
          </div>
        )}
      </div>

      {/* MAP */}
      {showMap && (
        <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50">
          <button
            onClick={() => {
              setShowMap(false);
              setActiveTab("plan");
            }}
            className="absolute top-4 right-4 bg-white rounded-full shadow px-3 py-1 font-bold"
          >
            ✕
          </button>

          <iframe
            title="map"
            className="w-full h-full"
            loading="lazy"
            src={`https://www.google.com/maps?q=${destination}&output=embed`}
          />
        </div>
      )}

      <ChatBot />
    </div>
  );
};

export default TripPlanPage;
