// import React from "react";

// const MapComponent = ({ destination, onClose }) => {
//   if (!destination) return null;

//   return (
//     <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50">
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 bg-white rounded-full shadow px-3 py-1 font-bold"
//       >
//         ✕
//       </button>

//       {/* Google Map */}
//       <iframe
//         title="map"
//         className="w-full h-full"
//         loading="lazy"
//         src={`https://www.google.com/maps?q=${destination}&output=embed`}
//       />
//     </div>
//   );
// };

// export default MapComponent;-----------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const MapComponent = ({ plan, logistics, destination, onClose }) => {

//   const [markers, setMarkers] = useState([]);


//   useEffect(() => {
//     if (!plan) return;

//     const fetchMarkers = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/map/markers",
//           {
//             plan,
//             logistics,
//             destination
//           }
//         );

//         setMarkers(res.data.markers || []);
//       } catch (err) {
//         console.error("Map markers error:", err);
//       }
//     };

//     fetchMarkers();
//   }, [plan, logistics, destination]);

//   if (!destination) return null;

//   const center =
//     markers.length > 0
//       ? [markers[0].lat, markers[0].lng]
//       : null; // Chennai fallback

//   return (
//     <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50">

//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 bg-white rounded-full shadow px-3 py-1 font-bold z-[1000]"
//       >
//         ✕
//       </button>
      
//       <MapContainer 
//         center={center}
//         zoom={12}
//         className="w-full h-full"
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {markers.map((m, i) => (
//           <Marker key={i} position={[m.lat, m.lng]}>
//             <Popup>
//               <b>{m.name}</b>
//               <br />
//               Type: {m.type}
//               <br />
//               Day: {m.day}
//               <br />
//               {m.time}
//             </Popup>
//           </Marker>
//         ))}

//       </MapContainer>
      

//     </div>
//   );
// };

// export default MapComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const destinationCenters = {
  Coimbatore: [11.0168, 76.9558],
  Chennai: [13.0827, 80.2707],
  Bangalore: [12.9716, 77.5946],
  Madurai: [9.9252, 78.1198]
};

const MapComponent = ({ plan, logistics, destination, onClose }) => {

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!plan) return;

    const fetchMarkers = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/map/markers",
          { plan, logistics, destination }
        );

        setMarkers(res.data.markers || []);
      } catch (err) {
        console.error("Map markers error:", err);
      }
    };

    fetchMarkers();
  }, [plan, logistics, destination]);

  const center =
    markers.length > 0
      ? [markers[0].lat, markers[0].lng]
      : destinationCenters[destination] || [20.5937, 78.9629];

  if (!center) return null;

  return (
    <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl z-50">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white rounded-full shadow px-3 py-1 font-bold z-[1000]"
      >
        ✕
      </button>

      <MapContainer
        center={center}
        zoom={12}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              <b>{m.name}</b>
              <br />
              Type: {m.type}
              <br />
              Day: {m.day}
              <br />
              {m.time}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
