import { motion } from "framer-motion";

const TripLoading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black">

      {/* Orbit system */}
      {/* <div className="relative w-48 h-48 flex items-center justify-center mb-6"> */}

        {/* Dashed orbit */}
        {/* <div className="absolute w-full h-full rounded-full border-2 border-dashed border-gray-300" /> */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-6">

        {/* Earth (perfect center) */}
        <div className="absolute text-5xl">
          🌍
        </div>

        {/* Plane orbiting (REVERSE direction) */}
        <motion.div
          className="absolute w-full h-full "
          animate={{ rotate: -360 }}   // 🔄 reverse
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        >
          {/* Plane positioned on orbit */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 text-3xl">
            ✈️
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <p className="text-lg font-medium opacity-80 text-center">
        Sit back. We’re planning something magical ✨
      </p>

    </div>
  );
};

export default TripLoading;


