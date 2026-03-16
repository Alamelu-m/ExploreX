import { useEffect, useState } from "react";
import { Pencil, Map, Gift } from "lucide-react";

const ProfilePage = () => {
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");

  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [isAboutEditing, setIsAboutEditing] = useState(false);

  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  // 🔹 FETCH USER FROM DB
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/api/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.location && Object.keys(data.location).length > 0) {
          const loc = [
            data.location.city,
            data.location.state,
            data.location.country,
          ]
            .filter(Boolean)
            .join(", ");
          setLocation(loc);
        } else {
          setLocation(""); // default if no location
        }
      })
      .catch(console.error);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Not logged in</p>
      </div>
    );
  }

  // 🔹 SAVE LOCATION TO DB
  const saveLocation = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: {
            city: location, // for now just city
            // state: state, // add if you have state input
            // country: country // add if you have country input
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to save location");

      setIsLocationEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving location");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <div
        className="h-[280px] w-full relative bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?q=80&w=2500&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* PROFILE CARD */}
      <div className="relative max-w-4xl mx-auto -mt-36 px-4">
        <div className="bg-white rounded-3xl shadow-xl pt-28 pb-10 px-8 text-center">

          {/* AVATAR */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2">
            <div className="w-40 h-40 rounded-full bg-gray-500 text-white flex items-center justify-center text-5xl font-bold border-4 border-white shadow-lg">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* NAME */}
          <h1 className="text-3xl font-bold text-gray-900">
            {user.username}
          </h1>

          {/* EMAIL */}
          <p className="text-gray-500 mt-1">{user.email}</p>

          {/* LOCATION */}
          <div className="mt-4 flex justify-center items-center gap-2">
            {isLocationEditing ? (
              <>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="text-sm text-center border rounded-full px-4 py-1
                             focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button
                  onClick={saveLocation}
                  className="text-xs px-3 py-1 rounded-full bg-gray-500 text-white"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">
                  📍 {location || "Location not set"}
                </p>
                <button onClick={() => setIsLocationEditing(true)}>
                  <Pencil size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              </>
            )}
          </div>

          {/* ABOUT */}
          <div className="mt-6 max-w-xl mx-auto relative text-left">
            {isAboutEditing ? (
              <>
                <textarea
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write something about you..."
                  className="w-full text-sm border rounded-xl px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                />
                <button
                  onClick={() => setIsAboutEditing(false)}
                  className="absolute right-2 bottom-2 px-4 py-1 text-xs
                             rounded-full bg-gray-500 text-white"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-sm pr-8">
                  {about || "No description added yet."}
                </p>
                <button
                  onClick={() => setIsAboutEditing(true)}
                  className="absolute right-0 top-0"
                >
                  <Pencil size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              </>
            )}
          </div>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-2 gap-6 max-w-md mx-auto">
            <div className="border rounded-2xl p-6 flex flex-col items-center gap-2 bg-white shadow-sm">
              <Map size={28} className="text-gray-500" />
              <p className="text-4xl font-bold text-gray-900">18</p>
              <p className="text-sm text-gray-500">Trips</p>
            </div>

            <div className="border rounded-2xl p-6 flex flex-col items-center gap-2 bg-white shadow-sm">
              <Gift size={28} className="text-gray-500" />
              <p className="text-4xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-500">Rewards</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
