// src/pages/FarmerNetwork.jsx
import { useEffect, useState } from "react";
import { Users, UserCheck, Clock } from "lucide-react";
import { useFarmerNetworkStore } from "../store/useFarmerNetworkStore.js";
import FarmerCard from "../components/farmerNetwork/FarmerCard.jsx";
import NetworkStats from "../components/farmerNetwork/NetworkStats.jsx";
import NetworkTabs from "../components/farmerNetwork/NetworkTabs.jsx";
import SearchBar from "../components/farmerNetwork/SearchBar.jsx";
import Pagination from "../components/farmerNetwork/Pagination.jsx";
import ConnectionRequests from "../components/farmerNetwork/ConnectionRequests.jsx";
import MyConnections from "../components/farmerNetwork/MyConnections.jsx";

const FarmerNetwork = () => {
  const {
    farmers,
    connections,
    loading,
    error,
    pagination,
    pendingRequests,
    fetchFarmers,
    connectFarmer,
    acceptConnection,
    rejectConnection,
    fetchConnections
  } = useFarmerNetworkStore();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("discover");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchFarmers(1, 12, debouncedSearch); // Load first page with search
  }, [debouncedSearch]);

  useEffect(() => {
    if (activeTab === 'requests' || activeTab === 'connections') {
      fetchConnections(); // Load connections and requests when either tab is active
    }
  }, [activeTab, fetchConnections]);

  const handlePageChange = (page) => {
    fetchFarmers(page, 12, debouncedSearch);
  };

  // No client-side filtering needed since search is done server-side
  const filteredFarmers = farmers;

  // ✅ Handle loading/error states
  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="text-gray-600 text-lg ml-3">Loading farmers...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Error loading farmers</p>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            👥 Farmer Network
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with fellow farmers, share knowledge, and build your agricultural community
          </p>
        </div>

        {/* Navigation Tabs */}
        <NetworkTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingRequestsCount={pendingRequests?.length || 0}
        />

        {/* Search Bar */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Content */}
        {activeTab === 'discover' && (
          <>
            {/* No stats cards - keeping it clean */}

            {/* Farmer Cards */}
            {filteredFarmers.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFarmers.map((farmer) => (
                    <FarmerCard
                      key={farmer._id}
                      farmer={farmer}
                      onConnect={connectFarmer}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <Users size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No farmers found matching your search.</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search terms.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'connections' && (
          <MyConnections
            connections={connections}
            onMessage={(userId) => {
              // TODO: Implement messaging functionality
              console.log('Message user:', userId);
            }}
          />
        )}

        {activeTab === 'requests' && (
          <ConnectionRequests
            pendingRequests={pendingRequests}
            onAccept={acceptConnection}
            onReject={rejectConnection}
          />
        )}
      </div>
    </div>
  );
};

export default FarmerNetwork;
