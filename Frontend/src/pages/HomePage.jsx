
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TripPlannerCard from "../components/TripPlannerCard";
import RecommendedPlaces from "../components/RecommendedPlaces";
import NearbyPlaces from "../components/NearbyPlaces";
import ChatBot from "../components/ChatBot";
import bgPattern from "../assets/travel-pattern.jpg";
import sample from "../assets/sample.jpg"

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative text-black overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px",
          opacity: 0.3, 
        }}
      />

      {/* BACKGROUND COLOR OVERLAY */}
      {/* <div className="absolute inset-0 bg-[#E4EDEB] z-0 opacity-90" /> */}

      {/* CONTENT */}
      <div className="relative z-10">

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
        <img
          src={sample}
          alt="Travel Banner"
          className="w-full h-full object-cover"
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Optional text */}
        
      </div>

        {/* Main content */}
        <div className="flex justify-center items-center mt-10 px-4">
          <TripPlannerCard />
        </div>

        {/* Sections */}
        <RecommendedPlaces />
        <NearbyPlaces />
        <ChatBot />
      </div>
    </div>
  );
};

export default HomePage;

