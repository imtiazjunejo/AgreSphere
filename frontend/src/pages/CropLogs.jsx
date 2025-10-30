import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Download } from "lucide-react";
import { exportToPDF, exportToWord, exportToExcel } from "../utils/exportUtils";
import { useCropLogsStore } from "../store/useCropLogsStore";  // ✅ backend store



// small currency formatter
const fmt = (n) =>
  typeof n === "number"
    ? `Rs ${n.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "Rs 0.00";

export default function CropLogs() {

  const navigate = useNavigate()

  const {
  cropLogs,
  project,
  activities,
  setProject,
  fetchCropLogById,
  fetchProject,
  createOrUpdateProject,
  deleteSelectedProject,
  addOrUpdateActivity,
  deleteActivity,
} = useCropLogsStore();



  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [isEditingProject, setIsEditingProject] = useState(false);

  const [saleAmount, setSaleAmount] = useState("");
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    const load = async () => {
      await fetchProject();
    };
    load();
  }, [fetchProject]);

  // ✅ Restore sale amount after project is fetched
  useEffect(() => {
    if (project?.saleAmount) {
      setSaleAmount(project.saleAmount);
    }
  }, [project]);


console.log("📌 Project:", project ? JSON.stringify(project, null, 2) : "null");
console.log("📌 Activities:", JSON.stringify(activities, null, 2));
console.log("📌 fetchProject is a function?", typeof fetchProject);

  

  const totalExpenses = activities.reduce(
    (s, a) => s + (Number(a.cost) || 0),
    0
  );

  // ---------------- Project handlers ----------------
  const handleCreateOrUpdateProject = async (data) => {
    await createOrUpdateProject(data);
    setShowProjectModal(false);
    setIsEditingProject(false);
    setDistribution(null);
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteSelectedProject(id);
    setSaleAmount("");
    setDistribution(null);
  };

  // ---------------- Activity handlers ----------------
  const handleAddOrUpdateActivity = async (payload) => {
    await addOrUpdateActivity(payload);
    setShowActivityModal(false);
    setEditingActivity(null);
    setDistribution(null);
  };

  const handleDeleteActivity = async (id) => {
    if (!confirm("Delete this activity?")) return;
    await deleteActivity(id);
    setDistribution(null);
  };

  const handleDownload = async () => {
    if (!project) return alert("No project to export");
    const data = {
      project,
      activities,
      saleAmount,
      distribution: distribution || computeDistribution(),
    };

    const choice = prompt("Export as: pdf / word / excel").toLowerCase();
    if (choice === "pdf") {
      await exportToPDF(data);
    } else if (choice === "word") {
      await exportToWord(data);
    } else if (choice === "excel") {
      await exportToExcel(data);
    } else {
      alert("Invalid choice. Please type pdf, word or excel.");
    }
  };

  // ---------------- Distribution calc ----------------
  function computeDistribution() {
    const sale = Number(saleAmount || 0);
    const expensesSum = totalExpenses;
    const netProfit = sale - expensesSum;
    const farmersCount = project?.farmers?.length || 0;
    const hasFarmer = !!project?.hasFarmer && farmersCount > 0;

    let landOwnerShare = 0;
    let farmerTotalShare = 0;
    let userBeforeLease = 0;
    let userFinal = 0;
    const lease = Number(project?.leaseAmount || 0);

    if (project.farmingType === "partnership") {
      landOwnerShare = netProfit * 0.5;
      if (hasFarmer) {
        farmerTotalShare = netProfit * 0.25;
        userFinal = netProfit - landOwnerShare - farmerTotalShare;
      } else {
        userFinal = netProfit - landOwnerShare;
      }
    } else if (project.farmingType === "lease") {
      farmerTotalShare = hasFarmer ? netProfit * 0.25 : 0;
      userBeforeLease = netProfit - farmerTotalShare;
      userFinal = userBeforeLease - lease;
    } else {
      farmerTotalShare = hasFarmer ? netProfit * 0.25 : 0;
      userFinal = netProfit - farmerTotalShare;
    }

    const perFarmer =
      hasFarmer && farmersCount > 0 ? farmerTotalShare / farmersCount : 0;

    return {
      sale,
      expensesSum,
      netProfit,
      landOwnerShare,
      farmerTotalShare,
      perFarmer,
      userFinal,
      lease,
      farmersCount,
    };
  }

  const handleCalculateDistribution = async () => {
    if (!project) return alert("Create a project first");
    if (!saleAmount || Number(saleAmount) === 0) {
      if (!confirm("Sale amount is zero or empty — continue?")) return;
    }
      // ✅ Save sale amount to backend project
    await createOrUpdateProject({
      ...project,
      saleAmount: Number(saleAmount)
    });

    // ✅ Refresh project from backend to keep data in sync

    setSaleAmount(Number(saleAmount));

    setDistribution(computeDistribution());
    };
// ---------------- UI ----------------
if (!project) {
  return (
    <div className="p-10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🌾 Your Crop Projects</h2>

        {/* Existing Projects List */}
        {cropLogs && cropLogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cropLogs.map((log) => (
                <div
                  key={log._id}
                  className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-left mb-4">
                    <h3 className="font-bold text-xl text-green-700 mb-2">
                      {log.project?.name || "Unnamed Crop"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Area:</span> {log.project?.fieldArea
                        ? `${log.project.fieldArea} acres`
                        : "—"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Started:</span> {log.project?.startDate
                        ? new Date(log.project.startDate).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={
                      () => {
                        fetchCropLogById(log._id)
                        navigate(`/crop-logs/${log.project?.name}`)
                      }
                    }
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Open Project
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteProject(log._id)
                      }}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add new project button at the end */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setIsEditingProject(false);
                  setShowProjectModal(true);
                }}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-lg font-medium transition-colors"
              >
                ➕ Create New Crop Project
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">No Crop Projects Yet</h3>
              <p className="text-gray-600 text-lg mb-6">
                Start tracking your farming activities, expenses, and profit distribution by creating your first crop project.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setIsEditingProject(false);
                  setShowProjectModal(true);
                }}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-lg font-medium transition-colors"
              >
                ➕ Create Your First Project
              </button>
            </div>
          </>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <ProjectModal
          project={null}
          onClose={() => setShowProjectModal(false)}
          onSubmit={handleCreateOrUpdateProject}
        />
      )}
    </div>
  );
}


  // ✅ From here down, your UI stays unchanged (activities table, modals, buttons…)
  // The only difference is that project & activities are synced from backend.

 return (
   <div className="p-6 min-h-[calc(100vh-4rem)] space-y-6 bg-gray-50">
     {/* Header card */}
     <div className="bg-gray-300 rounded-xl shadow p-5 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-gray-900">🌾 {project.name}</h1>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Season:</strong> {project.season} • <strong>Type:</strong> {project.farmingType}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Landowner:</strong> {project.landOwner}
            {project.hasFarmer && project.farmers && project.farmers.length > 0 && (
              <> • <strong>Farmers:</strong> {project.farmers.join(", ")}</>
            )}
          </p>
          {project.farmingType === "lease" && (
            <p className="text-sm text-gray-600 mt-1">
              <strong>Lease amount:</strong> {fmt(project.leaseAmount)}
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <ActionButton onClick={() => { setIsEditingProject(true); setShowProjectModal(true); }} color="blue" icon={<Edit size={16} />}>Edit</ActionButton>
          <ActionButton onClick={() => { handleDownload(); }} color="yellow" icon={<Download size={16} />}>Export</ActionButton>
          <ActionButton onClick={handleDeleteProject} color="red" icon={<Trash2 size={16} />}>Delete</ActionButton>
          {/* <ActionButton onClick={() => { setProject(null); setShowProjectModal(true); }} color="green" icon={<Plus size={16} />}>New</ActionButton> */}
          <ActionButton onClick={() => { setIsEditingProject(false); setShowProjectModal(true); }} color="green" icon={<Plus size={16} />}> New </ActionButton>

        </div>
      </div>

      {/* Activities table */}
      <div className="bg-gray-300 rounded-xl shadow overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Activity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Notes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cost</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-gray-200 divide-y divide-gray-200">
            {activities.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No activities yet. Click "Add Activity".</td>
              </tr>
            ) : (
              activities.map((a) => (
                <tr key={a._id || (a.data + a.activity)} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{a.date}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{a.activity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.notes}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">{fmt(a.cost)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => { setEditingActivity(a); setShowActivityModal(true); }} className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteActivity(a.id)} className="text-red-600 hover:text-red-800 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <ActionButton color="green" onClick={() => { setEditingActivity(null); setShowActivityModal(true); }} icon={<Plus size={14} />}>Add Activity</ActionButton>

        <div className="flex items-center gap-3">
          <input
            type="number"
            value={saleAmount}
            onChange={(e) => { setSaleAmount(e.target.value); setDistribution(null); }}
            placeholder="Gross sale amount (Rs)"
            className="p-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500"
          />
          <ActionButton color="green" onClick={handleCalculateDistribution} icon={<Plus size={12} />}>Calculate Distribution</ActionButton>
        </div>
      </div>

      {/* Right column: Expense summary + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-300 rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3 text-gray-900">Expense Summary</h3>
          {totalExpenses === 0 ? (
            <p className="text-gray-500">No expenses recorded yet.</p>
          ) : (
            <>
              <ul className="space-y-2">
                {activities.map((a) => (
                  <li key={a._id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{a.activity} — {a.date}</span>
                    <span className="text-gray-600 font-medium">{fmt(a.cost)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-500 pt-2 mt-2 flex justify-between font-semibold">
                <span className="text-gray-900">Total Expenses</span>
                <span className="text-red-600">{fmt(totalExpenses)}</span>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-300 rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3 text-gray-900">Sale & Distribution</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Gross Sale</span>
              <strong className="text-green-600">{fmt(Number(saleAmount || 0))}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Expenses (deducted)</span>
              <strong className="text-red-600">- {fmt(totalExpenses)}</strong>
            </div>

            <div className="flex justify-between border-t border-gray-500 pt-2">
              <span className="text-gray-900 font-medium">Net Profit</span>
              <strong className="text-gray-600">{fmt(Number(saleAmount || 0) - totalExpenses)}</strong>
            </div>

            {/* show distribution only after calculate */}
            {distribution ? (
              <div className="mt-3 space-y-2">
                {/* Partnership */}
                {project.farmingType === "partnership" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Landowner (50%)</span>
                      <strong className="text-gray-600">{fmt(distribution.landOwnerShare)}</strong>
                    </div>
                    {project.hasFarmer && project.farmers.length > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Farmers (total 25%)</span>
                          <strong className="text-gray-600">{fmt(distribution.farmerTotalShare)}</strong>
                        </div>
                        {project.farmers.map((f, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-600">
                            <span>— {f || `Farmer ${idx + 1}`}</span>
                            <span className="text-gray-600">{fmt(distribution.perFarmer)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="flex justify-between font-semibold border-t border-gray-300 pt-2">
                      <span className="text-gray-900">Your final share</span>
                      <strong className="text-green-600">{fmt(distribution.userFinal)}</strong>
                    </div>
                  </>
                )}

                {/* Lease */}
                {project.farmingType === "lease" && (
                  <>
                    {project.hasFarmer && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Farmers (total 25%)</span>
                        <strong className="text-gray-600">{fmt(distribution.farmerTotalShare)}</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-700">Your share before lease</span>
                      <strong className="text-gray-600">{fmt(distribution.netProfit - distribution.farmerTotalShare)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Lease (deducted from your share)</span>
                      <strong className="text-red-600">- {fmt(distribution.lease)}</strong>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-gray-300 pt-2">
                      <span className="text-gray-900">Your final share</span>
                      <strong className="text-green-600">{fmt(distribution.userFinal)}</strong>
                    </div>
                  </>
                )}

                {/* Owner */}
                {project.farmingType === "owner" && (
                  <>
                    {project.hasFarmer && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Farmers (total 25%)</span>
                          <strong className="text-gray-600">{fmt(distribution.farmerTotalShare)}</strong>
                        </div>
                        {project.farmers.map((f, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-600">
                            <span>— {f || `Farmer ${idx + 1}`}</span>
                            <span className="text-gray-600">{fmt(distribution.perFarmer)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="flex justify-between font-semibold border-t border-gray-300 pt-2">
                      <span className="text-gray-900">Your final share</span>
                      <strong className="text-green-600">{fmt(distribution.userFinal)}</strong>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-3">Click "Calculate Distribution" to compute shares.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showProjectModal && (
        <ProjectModal
          project={isEditingProject ? project : null}
          onClose={() => { setShowProjectModal(false); setIsEditingProject(false); }}
          onSubmit={(data) => handleCreateOrUpdateProject(data)}
        />
      )}

      {showActivityModal && (
        <ActivityModal
          activity={editingActivity}
          onClose={() => { setShowActivityModal(false); setEditingActivity(null); }}
          onSubmit={(payload) => handleAddOrUpdateActivity({
                    ...payload,
                    id: editingActivity?._id || editingActivity?.id || null,  // ✅ preserve id
                    clientId: editingActivity?.clientId || null, // keep clientId if offline/local
                  })}
        />
      )}
    </div>
  );
}


























/* ---------------- Project Modal ---------------- */
function ProjectModal({ project, onClose, onSubmit }) {
  const [name, setName] = useState(project?.name || "");
  const [season, setSeason] = useState(project?.season || "");
  const [farmingType, setFarmingType] = useState(project?.farmingType || "owner");
  const [hasFarmer, setHasFarmer] = useState(!!project?.hasFarmer);
  const [farmers, setFarmers] = useState(project?.farmers?.length ? project.farmers : [""]);
  const [leaseAmount, setLeaseAmount] = useState(project?.leaseAmount || 0);

  useEffect(() => {
    if (!hasFarmer) setFarmers([]);
    if (hasFarmer && farmers.length === 0) setFarmers([""]);
  }, [hasFarmer]);

  const addFarmer = () => setFarmers((s) => [...s, ""]);
  const removeFarmer = (i) => setFarmers((s) => s.filter((_, idx) => idx !== i));
  const updateFarmer = (i, v) => setFarmers((s) => s.map((f, idx) => (idx === i ? v : f)));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name.trim(),
      season: season.trim(),
      farmingType,
      hasFarmer,
      farmers: hasFarmer ? farmers.map((f) => f.trim()).filter(Boolean) : [],
      leaseAmount: farmingType === "lease" ? Number(leaseAmount || 0) : 0,
      landOwner: project?.landOwner || "John Doe",
    };
    onSubmit(data);
  };

  const cropTypes = [
    "Rice", "Wheat", "Corn", "Cotton", "Sugarcane", "Soybean", "Barley", "Oats",
    "Millet", "Sorghum", "Potato", "Tomato", "Onion", "Garlic", "Carrot", "Cabbage",
    "Cauliflower", "Spinach", "Lettuce", "Broccoli", "Peas", "Beans", "Lentils",
    "Chickpeas", "Groundnut", "Sunflower", "Mustard", "Sesame", "Coconut", "Banana",
    "Mango", "Apple", "Orange", "Grapes", "Pineapple", "Papaya", "Guava", "Lemon"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project ? "Edit Project" : "Create New Crop Project"}</h3>
          <p className="text-gray-600">Set up your farming project details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Crop Type</label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select a crop type</option>
              {cropTypes.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              placeholder="e.g. Rabi 2025, Kharif 2025"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Farming Type</label>
          <select
            value={farmingType}
            onChange={(e) => setFarmingType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="owner">Owner Farming</option>
            <option value="partnership">Partnership Farming</option>
            <option value="lease">Lease Farming</option>
          </select>
        </div>

        {farmingType === "lease" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Lease Amount (Rs)</label>
            <input
              value={leaseAmount}
              onChange={(e) => setLeaseAmount(e.target.value)}
              type="number"
              placeholder="Amount paid for leasing the land"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        )}

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              checked={hasFarmer}
              onChange={(e) => setHasFarmer(e.target.checked)}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">Hire farmer(s)</span>
              <p className="text-sm text-gray-600">Farmers will share 25% of the profit (split equally)</p>
            </div>
          </label>

          {hasFarmer && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Farmers</h4>
                <button
                  type="button"
                  onClick={addFarmer}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors"
                >
                  <Plus size={14} />
                  Add Farmer
                </button>
              </div>

              <div className="space-y-3">
                {farmers.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No farmer names added — they will be treated as hired farmers.</p>
                )}
                {farmers.map((f, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input
                      value={f}
                      onChange={(e) => updateFarmer(i, e.target.value)}
                      placeholder={`Farmer ${i + 1} name`}
                      className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeFarmer(i)}
                      className="px-3 py-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {project ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Activity Modal ---------------- */
function ActivityModal({ activity, onClose, onSubmit }) {
  const [date, setDate] = useState(activity?.date || "");
  const [activityName, setActivityName] = useState(activity?.activity || "");
  const [notes, setNotes] = useState(activity?.notes || "");
  const [cost, setCost] = useState(activity?.cost ?? "");

  useEffect(() => {
    setDate(activity?.date || "");
    setActivityName(activity?.activity || "");
    setNotes(activity?.notes || "");
    setCost(activity?.cost ?? "");
  }, [activity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: activity?.id || null,
      date,
      activity: activityName,
      notes,
      cost: Number(cost || 0),
      status: activity?.status || "Pending",
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{activity ? "Edit Activity" : "Add New Activity"}</h3>
          <p className="text-gray-600">Record farming activity details</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Activity</label>
          <input
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="e.g. Sowing, Irrigation, Harvesting"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional details or observations"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cost (Rs)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {activity ? "Update Activity" : "Add Activity"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Reusable UI ---------------- */
function ActionButton({ color = "green", onClick, children, icon }) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };
  return (
    <button onClick={onClick} className={`${colors[color]} text-white px-4 py-2 rounded-md shadow inline-flex items-center gap-2`}>
      {icon} {children}
    </button>
  );
}









