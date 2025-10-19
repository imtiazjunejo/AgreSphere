import { useEffect } from "react";
import { useConnectionStore } from "../store/useConnectionStore";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ConnectionsRequests = () => {
  const { authUser } = useAuthStore();
  const { requests, fetchRequests, acceptRequest, rejectRequest, loading } =
    useConnectionStore();

  useEffect(() => {
    if (authUser?._id) fetchRequests(authUser._id);
  }, [authUser]);

  if (loading) return <p className="p-4 text-gray-600">Loading requests...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Connection Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">No pending connection requests.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center"
            >
              <img
                src={req.sender.profilePic || "/default-farmer.jpg"}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h2 className="font-semibold text-gray-800">{req.sender.name}</h2>
              <p className="text-gray-600 text-sm">{req.sender.location}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => acceptRequest(req._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle size={18} /> Accept
                </button>
                <button
                  onClick={() => rejectRequest(req._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionsRequests;
