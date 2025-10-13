// frontend/pages/CropLogs.jsx
import React, { useEffect, useState } from "react";
import { useCropLogsStore } from "../store/useCropLogsStore";

const CropLogs = () => {
  const {
    cropLogs,
    fetchCropLogs,
    addCropLog,
    updateCropLog,
    deleteCropLog,
    addActivity,
    deleteActivity,
    loading,
    error,
  } = useCropLogsStore();

  const [newCropName, setNewCropName] = useState("");
  const [newActivity, setNewActivity] = useState({});
  const [saleAmount, setSaleAmount] = useState({});
  const [distribution, setDistribution] = useState({});

  // fetch crop logs on mount
  useEffect(() => {
    fetchCropLogs();
  }, [fetchCropLogs]);

  const handleAddCrop = () => {
    if (!newCropName.trim()) return;
    addCropLog({ crop: newCropName, activities: [], saleAmount: 0, distribution: "" });
    setNewCropName("");
  };

  const handleAddActivity = (logId) => {
    if (!newActivity[logId]?.trim()) return;
    addActivity(logId, { id: Date.now(), name: newActivity[logId], status: "Pending" });
    setNewActivity((prev) => ({ ...prev, [logId]: "" }));
  };

  const handleSell = (log) => {
    if (!saleAmount[log._id]) return;
    updateCropLog(log._id, {
      ...log,
      saleAmount: Number(saleAmount[log._id]),
      distribution: distribution[log._id] || "",
    });
    setSaleAmount((prev) => ({ ...prev, [log._id]: "" }));
    setDistribution((prev) => ({ ...prev, [log._id]: "" }));
  };

  if (loading) return <p className="text-center mt-4">Loading crop logs...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crop Logs</h2>

      {/* Add new crop form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCropName}
          onChange={(e) => setNewCropName(e.target.value)}
          placeholder="Enter crop name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddCrop}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Crop
        </button>
      </div>

      {/* Crop logs list */}
      <div className="space-y-6">
        {cropLogs.length === 0 ? (
          <p className="text-gray-500">No crop logs found. Add a crop to get started.</p>
        ) : (
          cropLogs.map((log) => (
            <div key={log._id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{log.crop}</h3>
                <button
                  onClick={() => deleteCropLog(log._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>

              {/* Activities */}
              <div className="mb-3">
                <h4 className="font-medium mb-1">Activities:</h4>
                <ul className="list-disc pl-5">
                  {(log.activities || []).map((a) => (
                    <li key={a.id} className="flex justify-between items-center">
                      <span>
                        {a.name} —{" "}
                        <span className={a.status === "Done" ? "text-green-600" : "text-yellow-600"}>
                          {a.status}
                        </span>
                      </span>
                      <button
                        onClick={() => deleteActivity(log._id, a.id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Add new activity */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newActivity[log._id] || ""}
                    onChange={(e) =>
                      setNewActivity((prev) => ({ ...prev, [log._id]: e.target.value }))
                    }
                    placeholder="New activity"
                    className="border p-1 rounded w-full"
                  />
                  <button
                    onClick={() => handleAddActivity(log._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Sale & Distribution */}
              <div>
                <h4 className="font-medium mb-1">Sale:</h4>
                <p className="mb-1">
                  Sold: <span className="font-semibold">{log.saleAmount || 0}</span> |{" "}
                  Distribution:{" "}
                  <span className="font-semibold">{log.distribution || "N/A"}</span>
                </p>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={saleAmount[log._id] || ""}
                    onChange={(e) =>
                      setSaleAmount((prev) => ({ ...prev, [log._id]: e.target.value }))
                    }
                    placeholder="Sale amount"
                    className="border p-1 rounded w-32"
                  />
                  <input
                    type="text"
                    value={distribution[log._id] || ""}
                    onChange={(e) =>
                      setDistribution((prev) => ({ ...prev, [log._id]: e.target.value }))
                    }
                    placeholder="Distribution"
                    className="border p-1 rounded w-40"
                  />
                  <button
                    onClick={() => handleSell(log)}
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CropLogs;
