// import React, { useState } from 'react';
// import logo from "../src/assets/Logo.svg";
// import { Link, useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("Please fill all the fields.");
//       return;
//     }

//     // Show success
//     setSuccess("Login Successful!");

//     // Redirect to /home after 1 second
//     setTimeout(() => {
//       navigate("/home");
//     }, 1000);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full font-sans">

//       {/* LEFT SIDE */}
//       <div
//         className="relative h-[40vh] md:h-auto md:flex-1 bg-cover bg-center flex flex-col justify-end p-8 md:p-16 text-white"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?q=80&w=2500&auto=format&fit=crop')",
//         }}
//       >
//         <div className="z-10 relative">
//           <div className="flex flex-col items-start gap-4 mb-4">
//             <img src={logo} alt="ExploreX Logo" className="w-20 h-20 object-contain" />
//             <h1 className="text-3xl md:text-5xl font-bold tracking-tight">ExploreX</h1>
//           </div>

//           <p className="text-lg md:text-xl font-medium mb-2 opacity-90">Explore beyond. Live beyond.</p>
//           <p className="hidden sm:block text-sm md:text-base opacity-80 max-w-md leading-relaxed">
//             Intelligent, vibe-based itinerary planning crafted just for you.
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-12">
//         <div className="w-full max-w-md">
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
//             <p className="text-gray-500">Enter your credentials to access your trips.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* ERROR */}
//             {error && (
//               <p className="text-red-600 text-sm font-medium bg-red-100 p-2 rounded-md">
//                 {error}
//               </p>
//             )}

//             {/* SUCCESS */}
//             {success && (
//               <p className="text-green-600 text-sm font-medium bg-green-100 p-2 rounded-md">
//                 {success}
//               </p>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 onChange={handleChange}
//                 className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-900 mb-1">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 onChange={handleChange}
//                 className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
//             >
//               Sign In
//             </button>

//             <p className="text-sm text-center text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-blue-600 font-medium hover:underline">
//                 Sign up
//               </Link>
//             </p>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from "react";
import logo from "../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const res = await API.post("/auth/login", formData);

      setSuccess(res.data.message || "Login Successful!");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-sans">

      {/* LEFT SIDE */}
      <div
        className="relative h-[40vh] md:h-auto md:flex-1 bg-cover bg-center flex flex-col justify-end p-8 md:p-16 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?q=80&w=2500&auto=format&fit=crop')",
        }}
      >
        <div className="z-10 relative">
          <div className="flex flex-col items-start gap-4 mb-4">
            <img src={logo} alt="ExploreX Logo" className="w-20 h-20 object-contain" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              ExploreX
            </h1>
          </div>

          <p className="text-lg md:text-xl font-medium mb-2 opacity-90">
            Explore beyond. Live beyond.
          </p>

          <p className="hidden sm:block text-sm md:text-base opacity-80 max-w-md leading-relaxed">
            Intelligent, vibe-based itinerary planning crafted just for you.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500">
              Enter your credentials to access your trips.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-sm font-medium bg-red-100 p-2 rounded-md">
                {error}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="text-green-600 text-sm font-medium bg-green-100 p-2 rounded-md">
                {success}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
