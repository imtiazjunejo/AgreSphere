// src/pages/FarmerNetwork.jsx
import { useEffect, useState } from "react";
import { UserPlus, MapPin, Leaf } from "lucide-react";
import { useFarmerNetworkStore } from "../store/useFarmerNetworkStore.js";

const FarmerNetwork = () => {
  const { farmers, loading, error, fetchFarmers, connectFarmer } =
    useFarmerNetworkStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFarmers(); // ✅ Fetch using Zustand store
  }, [fetchFarmers]);

  // ✅ Filter farmers by name or location
  const filteredFarmers = farmers.filter((farmer) =>
    [farmer.name, farmer.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ Handle loading/error states
  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Loading farmers...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        {error}
      </div>
    );

  // ✅ Render farmer list
  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
            👩‍🌾 Farmer Network
          </h1>
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Farmer Cards */}
        {filteredFarmers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFarmers.map((farmer) => (
              <div
                key={farmer._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col items-center hover:shadow-md transition"
              >
                <img
                  src={farmer.profilePic}
                  alt={farmer.firstName}
                  className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-green-500"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {farmer.firstName+" "+ farmer.lastName || "Unkown"}
                </h2>

                <p className="text-gray-600 text-sm flex items-center mt-1">
                  <MapPin size={16} className="mr-1 text-green-500" />
                  {farmer.location || "Unknown location"}
                </p>

                {farmer.crops && farmer.crops.length > 0 && (
                  <p className="text-gray-700 text-sm mt-2 flex items-center">
                    <Leaf size={16} className="mr-1 text-green-600" />
                    {farmer.crops.join(", ")}
                  </p>
                )}

                <button
                  onClick={() => connectFarmer(farmer._id)}
                  className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <UserPlus size={18} />
                  Connect
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No farmers found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FarmerNetwork;
