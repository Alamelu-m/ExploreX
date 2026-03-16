import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "Sit back and relax...",
  "We are creating an amazing trip plan for you ✨",
  "Finding best places, food and stays 🏨",
  "Almost ready… packing magic into your trip 🌍",
];

const TripLoading = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500); // change text every 2.5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black">

      {/* Orbit System */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">

        {/* Earth */}
        <div className="absolute text-5xl">
          🌍
        </div>

        {/* Plane Orbit */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 text-3xl">
            ✈️
          </div>
        </motion.div>

      </div>

      {/* Dynamic Text */}
      <div className="h-10 flex items-center justify-center">

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-lg font-medium text-center px-6"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>

      </div>

    </div>
  );
};

export default TripLoading;


