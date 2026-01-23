

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ toggleSidebar }) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative">

//       {/* Sidebar toggle */}
//       <button
//         onClick={toggleSidebar}
//         className="text-blue-600 text-2xl font-bold"
//       >
//         ☰
//       </button>

//       {/* Center: Search bar */}
//       <div className="hidden md:flex flex-1 justify-center px-6">
//         <div className="w-full max-w-md relative">
//           <input
//             type="text"
//             placeholder="Search destinations, trips..."
//             className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-500">
//             🔍
//           </span>
//         </div>
//       </div>

//       {/* Right section */}
//       <div className="flex items-center gap-4 relative" ref={dropdownRef}>

//         <button className="text-gray-600 hover:text-blue-600 font-medium">
//           My Trips
//         </button>

//         {/* Profile Avatar */}
//         <div
//           onClick={() => setOpen(!open)}
//           className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer select-none"
//         >
//           D
//         </div>

//         {/* Dropdown */}
//         {open && (
//           <div className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-lg border z-50">
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/profile");
//               }}
//               className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//             >
//               Profile
//             </button>

//             <button
//               className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//             >
//               My Trips
//             </button>

//             <button
//               onClick={handleLogout}
//               className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  
  const [profileLetter, setProfileLetter] = useState("D");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Get logged-in user first letter
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username) {
      setProfileLetter(user.username.charAt(0).toUpperCase());
    }
  }, []);

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative">

      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="text-blue-600 text-2xl font-bold"
      >
        ☰
      </button>

      {/* Center: Search bar */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder="Search destinations, trips..."
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-500">
            🔍
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>

        <button className="text-gray-600 hover:text-blue-600 font-medium">
          My Trips
        </button>

        {/* Profile Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer select-none"
        >
          {profileLetter}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-lg border z-50">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              My Trips
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

