const ProfilePage = () => {
  // Later you will fetch this from backend
  const user = {
    name: "Demo User",
    email: "demo@explorex.com",
    role: "Traveler",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Profile
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            D
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-gray-900 font-medium">{user.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-gray-900 font-medium">{user.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <p className="text-gray-900 font-medium">{user.role}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
            Edit Profile
          </button>

          <button className="flex-1 border border-gray-300 hover:bg-gray-50 font-bold py-3 rounded-lg transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

