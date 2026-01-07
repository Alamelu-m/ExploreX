import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";

const SignupPage = () => {
  const navigate = useNavigate(); // ✅ added

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Signup Attempt:", formData);

    // ✅ navigate to home
    navigate("/home");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-sans">
      {/* LEFT SIDE IMAGE */}
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
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">ExploreX</h1>
          </div>

          <p className="text-lg md:text-xl font-medium mb-2 opacity-90">
            Explore beyond. Live beyond.
          </p>
          <p className="hidden sm:block text-sm md:text-base opacity-80 max-w-md leading-relaxed">
            Intelligent, vibe-based itinerary planning crafted just for you.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create an account
            </h2>
            <p className="text-gray-500">
              Join ExploreX and start planning your trips.
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="john_doe"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600">
              If you have an account?{" "}
              <Link to="/" className="text-blue-600 font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
