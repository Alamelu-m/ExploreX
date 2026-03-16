// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import TripPlannerCard from "../components/TripPlannerCard";
// import RecommendedPlaces from "../components/RecommendedPlaces";
// import NearbyPlaces from "../components/NearbyPlaces";
// import ChatBot from "../components/ChatBot";
// import bgPattern from "../assets/travel-pattern.jpg";
// import sample from "../assets/sample.jpg";
// import LocationPopup from "../components/LocationPopup";
// import whereToGo from "../assets/wheretogo.png";
// import Staysomewhere from "../assets/Staysomewhere.png";
// import dosomethingfun from "../assets/dosomethingfun.png";
// import findplaces from "../assets/findplaces.png"
//import HomeIntro from "../components/home/HomeIntro";

// const HomePage = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   useEffect(() => {
//     const currentRef = sectionRef.current;

//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       if (entry.isIntersecting) {
//         setIsVisible(true);
//       }
//     },
//     { threshold: 0.4 }
//   );

//   if (currentRef) {
//     observer.observe(currentRef);
//   }

//   return () => {
//     if (currentRef) {
//       observer.unobserve(currentRef);
//     }
//   };
// }, []);
//   // 🔹 CHECK LOCATION FROM DB (ONCE)
//   useEffect(() => {
//     if (!user) return;

//     fetch(`http://localhost:5000/api/users/${user.id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data.location || Object.keys(data.location).length === 0) {
//           setShowLocationPopup(true);
//         } else {
//           setShowLocationPopup(false);
//         }
//       })
//       .catch(console.error);
//   }, [user]);

//   // 🔹 ALLOW LOCATION
//   const handleAllowLocation = () => {
//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       try {
//         const res = await fetch("http://localhost:5000/api/location/store", {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: user.id,
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           console.error("Backend error:", data);
//           alert("Failed to save location");
//           return;
//         }

//         // ✅ SUCCESS
//         setShowLocationPopup(false);
//       } catch (err) {
//         console.error(err);
//       }
//     },
//     (err) => {
//       console.error(err);
//       alert("Location permission denied");
//     }
//   );
// };


//   // 🔹 SKIP LOCATION
//   const handleSkipLocation = () => {
//     setShowLocationPopup(false);
//   };

//   return (
//     <div className="min-h-screen relative text-black overflow-hidden">

//       {/* LOCATION POPUP */}
//       {showLocationPopup && (
//         <LocationPopup
//           onAllow={handleAllowLocation}
//           onSkip={handleSkipLocation}
//         />
//       )}
      

//       {/* BACKGROUND IMAGE */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `url(${bgPattern})`,
//           backgroundRepeat: "repeat",
//           backgroundSize: "300px",
//           opacity: 0.3,
//         }}
//       />

//       {/* CONTENT */}
//       <div className="relative z-10">

//         {/* Sidebar */}
//         <Sidebar isOpen={sidebarOpen} />

//         {/* Overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-30 z-40"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Navbar */}
//         <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         {/* HERO */}
//         <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
//           <img
//             src={sample}
//             alt="Travel Banner"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-20" />
//         </div>

//         {/* MAIN CONTENT */}
//         {/* <div className="flex justify-center items-center mt-10 px-4">
//           <TripPlannerCard />
//         </div> */}

//   <div className="flex items-center justify-center mt-10 px-6 gap-8 relative">

//   {/* LEFT IMAGE */}
//   <div className="hidden lg:flex w-3/12 justify-center group">
//     <div className="flex flex-col items-end relative -top-20 gap-6">
//       <img
//         src={whereToGo}
//         alt="Where To Go"
//         // className="w-[420px] xl:w-[520px] object-contain"
//         className="
//         w-[420px] xl:w-[520px] object-contain
//         group-hover:animate-slideFloatLeft
//         hover:scale-110
//         transition-all duration-300
//       "
//       />

//       <img
//         src={dosomethingfun}
//         alt="Where To Go"
//         // className="w-[420px] xl:w-[520px] object-contain"
//         className="
//         w-[420px] xl:w-[520px] object-contain
//         group-hover:animate-slideFloatLeft
//         hover:scale-110
//         transition-all duration-300
//       "
//       />
//     </div>
//     </div>

   

//     {/* CENTER CARD */}
//     <div className="w-full lg:w-6/12 flex justify-center">
//       <TripPlannerCard />
//     </div>

//     {/* RIGHT IMAGE */}
//     {/* <div className="hidden lg:flex w-1/4 justify-start relative -top-40">
//       <img
//         src={Staysomewhere}
//         alt="Travel Illustration"
//         className="w-[540px] xl:w-[640px] object-contain"
//       />
//     </div> */}

//     <div className="hidden lg:flex w-3/12 justify-center group">
//     <div className="flex flex-col items-center relative -top-20 gap-6 translate-x-[-40px]">
//       <img
//         src={Staysomewhere}
//         alt="Where To Go"
//         // className="w-[1020px] xl:w-[920px] object-contain"
//        className="
//         w-[1020px] xl:w-[920px] object-contain
//         group-hover:animate-slideFloatRight
//         hover:scale-110
//         transition-all duration-300
//       "
//       />

//       <img
//         src={findplaces}
//         alt="Where To Go"
//         // className="w-[200px] xl:w-[320px] object-contain"
//         className="
//         w-[220px] xl:w-[320px] object-contain
//         group-hover:animate-slideFloatRight
//         hover:scale-110
//         transition-all duration-300
//       "
//       />
//     </div>
//     </div>


//   </div>
      
        
//         <RecommendedPlaces />
//         <NearbyPlaces userId={user?.id}/>
//         <ChatBot />
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TripPlannerCard from "../components/TripPlannerCard";
import RecommendedPlaces from "../components/RecommendedPlaces";
import NearbyPlaces from "../components/NearbyPlaces";
import ChatBot from "../components/ChatBot";
// import bgPattern from "../assets/travel-pattern.jpg";
import sample from "../assets/sample.jpg";
import LocationPopup from "../components/LocationPopup";
import whereToGo from "../assets/wheretogo.png";
import Staysomewhere from "../assets/Staysomewhere.png";
import dosomethingfun from "../assets/dosomethingfun.png";
import findplaces from "../assets/findplaces.png";
import HomeIntro from "../components/home/HomeIntro";
import Footer from "../components/home/Footer";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 SCROLL DETECTION (SLIDE WHEN NEAR)
  useEffect(() => {
    const currentRef = sectionRef.current;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.4 }
  );

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
}, []);

  // 🔹 LOCATION CHECK
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/api/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.location || Object.keys(data.location).length === 0) {
          setShowLocationPopup(true);
        }
      })
      .catch(console.error);
  }, [user]);

  const handleAllowLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await fetch("http://localhost:5000/api/location/store", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }),
        });
        setShowLocationPopup(false);
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <div className="min-h-screen relative text-black overflow-hidden">
      
      {showLocationPopup && (
        <LocationPopup
          onAllow={handleAllowLocation}
          onSkip={() => setShowLocationPopup(false)}
        />
      )}

      {/* Background */}
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px",
          opacity: 0.3,
        }}
      /> */}

      <div className="relative z-10">
        <Sidebar isOpen={sidebarOpen} />
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* HERO */}
        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
          <img
            src={sample}
            alt="Travel Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>

        {/* MAIN SECTION */}
        <div
          ref={sectionRef}
          className="flex items-center justify-center mt-16 px-6 gap-8"
        >
          <div className="hidden lg:flex w-3/12 justify-center pl-40">
              <div className="animate-slideFromLine">
              <HomeIntro />
            </div>
          </div>

          <div className="hidden lg:block w-[4px] bg-black mx-6  self-stretch  h-[600px] translate-x-16 mt-60"></div>
          {/* <div className="w-[5px] bg-red-500 h-[600px]"></div> */}
          {/* CENTER CARD */}
          <div className="w-full lg:w-6/12 flex justify-center">
            <TripPlannerCard />
          </div>

        
          <div className="hidden lg:flex w-3/12 justify-center">
            <div className="flex flex-col w-full  relative translate-x-[-100px]">
              
              <div className={`${isVisible ? "animate-slideFloatLeft delay-200" : "opacity-0"} self-start -mt-1`}>
              <div className="animate-float">
              <img
                src={whereToGo}
                alt="Where To Go"
                className="
                  w-[220px] xl:w-[300px] object-contain
                  opacity-90
                  transition-all duration-500
                  hover:opacity-100 hover:scale-110 hover:-translate-y-3
                "
              />
              </div>
              </div>
              
              

              <div className={`${isVisible ? "animate-slideFloatLeft delay-200" : "opacity-0"} self-end -mt-10`}>
              <div className="animate-float">
              <img
                src={Staysomewhere}
                alt="Do Something Fun"
                className="
                  w-[250px] xl:w-[300px] object-contain
                  opacity-90
                  transition-all duration-500
                  hover:opacity-100 hover:scale-110 hover:-translate-y-3
                "
              />
              </div>
            </div> 
              
              <div className={`${isVisible ? "animate-slideFloatRight" : "opacity-0"} self-start -mt-10`}>
              <div className="animate-float translate-x-[-0px]" >
              <img
                src={dosomethingfun}
                alt="Stay Somewhere"
                className="
                  w-[180px] xl:w-[280px] object-contain
                  opacity-90
                  transition-all duration-500
                  hover:opacity-100 hover:scale-110 hover:-translate-y-3
                "
              />
              </div>
              </div>
            
              
              <div className={`${isVisible ? "animate-slideFloatLeft delay-200" : "opacity-0"} self-end -mt-20`}>
              <div className="animate-float">
              <img
                src={findplaces}
                alt="Find Places"
                className="
                  w-[180px] xl:w-[280px] object-contain
                  transition-all duration-500
                  hover:opacity-100 hover:scale-110 hover:-translate-y-3
                "
              />
            </div>
            </div>
            </div>
          </div>
        </div>

        <RecommendedPlaces />
        <NearbyPlaces userId={user?.id} />
        <ChatBot />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;