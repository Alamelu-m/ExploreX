import logo from "../../assets/Logo_copy.png";

const HomeIntro = () => {
  return (
    <div className="max-w-lg space-y-8 -mt-60">
      
      {/* BRAND */}
      <div className="flex items-center gap-3 -ml-20">
        <img 
          src={logo} 
          alt="ExploreX Logo" 
          className="w-[120px] h-[90px] mb- object-contain"
        // className="w-28 mb-3 object-contain"
        />
        <span className="text-5xl font-bold tracking-wide">
          ExploreX
        </span>
      </div>

      <div className="pl-20 space-y-10">

      {/* MAIN HEADING */}
      <h1 className="text-7xl font-serifBold  leading-[1.5] drop-shadow-md"
       style={{ WebkitTextStroke: "0.5px black" }}>
        "Crafting Journeys, <br />
        Not Just <br/>
        Itineraries"
      </h1>

      {/* DESCRIPTION */}
      <p className=" text-gray-600 text-lg xl:text-xl leading-loose">
        We believe travel should be as seamless as a breeze. ExploreX uses 
        intelligent design to turn your dream destinations into reality, 
        one plan at a time.
      </p>

      {/* FEATURES */}
      <div className="space-y-5 pt-6">
        
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-sm font-bold">
            ✓
          </span>
          <p className="text-lg xl:text-xl font-medium">
            Smart AI based trip planning
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-sm font-bold">
            ✓
          </span>
          <p className="text-lg xl:text-xl font-medium">
            Budget optimized itineraries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-sm font-bold">
            ✓
          </span>
          <p className="text-lg xl:text-xl font-medium">
            Real location based suggestions
          </p>
        </div>

      </div>
    </div>
    </div>
  );
};

export default HomeIntro;