const LogisticsTab = ({ logistics, loading }) => {
  if (loading)
    return <p className="text-center text-gray-500">Loading logistics...</p>;

  if (!logistics || logistics.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No logistics available
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {logistics.map((day) => (
        <div key={day.day} className="space-y-6">
          
          {/* Day Heading (same style as Plan tab) */}
          <h2 className="text-2xl font-bold text-blue-600">
            Day {day.day}
          </h2>

          {/* Budget Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">
              💰 Budget Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-gray-800">
                  Stay & Food
                </p>
                <p>₹{day.budgetSplit?.perDayStayFood}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-gray-800">
                  Hotel Budget
                </p>
                <p>₹{day.budgetSplit?.hotelBudget}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-gray-800">
                  Food Budget
                </p>
                <p>₹{day.budgetSplit?.foodBudget}</p>
              </div>
            </div>
          </div>

          {/* Hotels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🏨 Recommended Hotels</h3>

            {day.hotels?.map((hotel, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h4 className="text-lg font-semibold">
                  {hotel.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {hotel.address}
                </p>

                <div className="mt-3 text-sm text-gray-600">
                  💵 {hotel.approxPerNight}
                </div>
              </div>
            ))}
          </div>

          {/* Restaurants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🍽 Restaurants</h3>

            {day.restaurants?.map((rest, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h4 className="text-lg font-semibold">
                  {rest.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {rest.address}
                </p>

                <div className="mt-3 text-sm text-gray-600">
                  💵 {rest.approxCost}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogisticsTab;
