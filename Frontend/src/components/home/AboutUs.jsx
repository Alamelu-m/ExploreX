// import { motion } from "framer-motion";
// import logo from "../../assets/Logo.png";

// const AboutUs = () => {
//   return (
//     <section className="w-full py-20 bg-white">

//       <div className="max-w-6xl mx-auto px-6">

//         <div className="grid md:grid-cols-2 gap-12 items-center">

//           {/* LEFT → IMAGE */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <img
//               src={logo}
//               alt="Travel Planning"
//               className="w-full max-w-sm object-contain"
//             />
//           </motion.div>

//           {/* RIGHT → CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl font-bold mb-6">
//               About ExploreX
//             </h2>

//             <p className="text-gray-600 mb-4 leading-relaxed">
//               ExploreX is built to make travel planning simple, smart and stress-free.
//               We combine intelligent trip planning with real budget insights to help
//               travellers create meaningful journeys without wasting time.
//             </p>

//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Whether you are planning a romantic getaway, family vacation or solo
//               adventure, our platform helps you discover the best places, food and
//               stays — all optimized for your budget and travel vibe.
//             </p>

//             {/* Highlight Points */}
//             <div className="space-y-3">

//               <div className="flex items-center gap-3">
//                 <span className="text-green-500 text-xl">✔</span>
//                 <p className="text-gray-700">Smart AI based trip planning</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-green-500 text-xl">✔</span>
//                 <p className="text-gray-700">Budget optimized itineraries</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-green-500 text-xl">✔</span>
//                 <p className="text-gray-700">Real location based suggestions</p>
//               </div>

//             </div>

//           </motion.div>

//         </div>

//       </div>

//     </section>
//   );
// };

// export default AboutUs;--------------------------------------------------


import { motion } from "framer-motion";
import logo from "../../assets/Logo.png";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      viewport={{ once: true }}
      className="bg-[#F4FBFA] rounded-2xl shadow-xl p-8 
                 max-w-md w-full
                 hover:shadow-2xl hover:shadow-[#CDEDEC]/60 
                 hover:-translate-y-2 
                 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        
        <img
          src={logo}
          alt="ExploreX Logo"
          className="w-28 mb-5 object-contain"
        />

        <h2 className="text-2xl font-bold mb-4 text-black">
          About ExploreX
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          ExploreX makes travel planning simple, smart and stress-free.
          We help you create meaningful journeys without wasting time.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          Whether it's a romantic getaway, family vacation or solo adventure,
          we optimize everything based on your budget and vibe.
        </p>

        <div className="space-y-3 text-left w-full text-sm">
          
          <div className="flex items-center gap-3">
            <span className="text-black">✔</span>
            <p className="text-gray-700">AI based smart planning</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black">✔</span>
            <p className="text-gray-700">Budget optimized itineraries</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black">✔</span>
            <p className="text-gray-700">Real location suggestions</p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;