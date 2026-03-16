const LocationPopup = ({ onAllow, onSkip }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center">

        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
          📍
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Allow location access
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 mb-6">
          We need your location to show nearby places and personalized travel
          recommendations.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="w-1/2 py-2 rounded-xl border border-gray-300
                       text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Not now
          </button>

          <button
            onClick={onAllow}
            className="w-1/2 py-2 rounded-xl bg-black text-white
                       font-medium hover:bg-gray-800 transition"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;
