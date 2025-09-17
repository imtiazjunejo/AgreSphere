import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Download } from "lucide-react";
import { exportToPDF, exportToWord, exportToExcel } from "../utils/exportUtils";

/**
 * CropLogs.jsx
 * - Multiple farmers (add/remove) when "Hire Farmer" is checked
 * - Farmer total = 25% of total net profit, split equally among farmers
 * - Sale & Distribution: shows Gross Sale, Expenses (deduction), Net Profit, then distribution rows
 * - Distribution shown only after clicking "Calculate Distribution"
 * - Activities add/edit/delete; activities drive expenses
 */

// small currency formatter
const fmt = (n) =>
  typeof n === "number"
    ? `Rs ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "Rs 0.00";

export default function CropLogs() {
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [isEditingProject, setIsEditingProject] = useState(false);

  const [saleAmount, setSaleAmount] = useState("");
  const [distribution, setDistribution] = useState(null); // computed distribution object (shown after calculate)

  // expenses are derived from activities
  const totalExpenses = activities.reduce((s, a) => s + (Number(a.cost) || 0), 0);

  // ---------------- Project handlers ----------------
  const handleCreateOrUpdateProject = (data) => {
    // ensure structure
    const normalized = {
      ...data,
      farmers: Array.isArray(data.farmers) ? data.farmers.filter(Boolean) : [],
      leaseAmount: Number(data.leaseAmount || 0),
    };
    setProject(normalized);
    setShowProjectModal(false);
    setIsEditingProject(false);
    setDistribution(null); // reset distribution on project change
  };

  const handleDeleteProject = () => {
    if (!confirm("Delete this project?")) return;
    setProject(null);
    setActivities([]);
    setSaleAmount("");
    setDistribution(null);
  };

  // ---------------- Activity handlers ----------------
  const handleAddOrUpdateActivity = (payload) => {
    if (payload.id) {
      // update existing
      setActivities((prev) => prev.map((a) => (a.id === payload.id ? payload : a)));
    } else {
      // create new
      payload.id = Date.now();
      setActivities((prev) => [...prev, payload]);
    }
    setShowActivityModal(false);
    setEditingActivity(null);
    setDistribution(null); // reset distribution when activities change
  };

  const handleDeleteActivity = (id) => {
    if (!confirm("Delete this activity?")) return;
    setActivities((prev) => prev.filter((a) => a.id !== id));
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

    // Show choice to user
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

  // ---------------- Distribution calc (on button click) ----------------
  function computeDistribution() {
    const sale = Number(saleAmount || 0);
    const expensesSum = totalExpenses;
    const netProfit = sale - expensesSum; // can be negative
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
      userFinal = userBeforeLease - lease; // lease is paid by user (deducted from user's share)
    } else {
      // owner farming
      farmerTotalShare = hasFarmer ? netProfit * 0.25 : 0;
      userFinal = netProfit - farmerTotalShare;
    }

    const perFarmer = hasFarmer && farmersCount > 0 ? farmerTotalShare / farmersCount : 0;

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

  const handleCalculateDistribution = () => {
    if (!project) return alert("Create a project first");
    if (!saleAmount || Number(saleAmount) === 0) {
      if (!confirm("Sale amount is zero or empty — continue?")) return;
    }
    setDistribution(computeDistribution());
  };

  // ---------------- UI: no project -> prompt ----------------
  if (!project) {
    return (
      <div className="p-10 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">No Crop Project</h2>
          <p className="text-gray-600 mb-6">Create a project to track activities, expenses and distribution.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => { setIsEditingProject(false); setShowProjectModal(true); }}
              className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white shadow"
            >
              ➕ New Crop Project
            </button>
          </div>
        </div>

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

  // ---------------- Main page when project exists ----------------
  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-gray-200 space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">🌾 {project.name}</h1>
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
          <ActionButton onClick={() => { setProject(null); setShowProjectModal(true); }} color="green" icon={<Plus size={16} />}>New</ActionButton>
        </div>
      </div>

      {/* Activities table */}
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Activity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Notes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cost</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {activities.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No activities yet. Click "Add Activity".</td>
              </tr>
            ) : (
              activities.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{a.date}</td>
                  <td className="px-4 py-3 font-medium">{a.activity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.notes}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{fmt(a.cost)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => { setEditingActivity(a); setShowActivityModal(true); }} className="text-indigo-600 hover:text-indigo-800">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteActivity(a.id)} className="text-red-600 hover:text-red-800">
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
            className="p-2 border rounded-md bg-white"
          />
          <ActionButton color="blue" onClick={handleCalculateDistribution} icon={<Plus size={12} />}>Calculate Distribution</ActionButton>
        </div>
      </div>

      {/* Right column: Expense summary + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3">Expense Summary</h3>
          {totalExpenses === 0 ? (
            <p className="text-gray-500">No expenses recorded yet.</p>
          ) : (
            <>
              <ul className="space-y-2">
                {activities.map((a) => (
                  <li key={a.id} className="flex justify-between text-sm">
                    <span>{a.activity} — {a.date}</span>
                    <span>{fmt(a.cost)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total Expenses</span>
                <span>{fmt(totalExpenses)}</span>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3">Sale & Distribution</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Gross Sale</span>
              <strong>{fmt(Number(saleAmount || 0))}</strong>
            </div>

            <div className="flex justify-between">
              <span>Expenses (deducted)</span>
              <strong>- {fmt(totalExpenses)}</strong>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Net Profit</span>
              <strong>{fmt(Number(saleAmount || 0) - totalExpenses)}</strong>
            </div>

            {/* show distribution only after calculate */}
            {distribution ? (
              <div className="mt-3 space-y-2">
                {/* Partnership */}
                {project.farmingType === "partnership" && (
                  <>
                    <div className="flex justify-between">
                      <span>Landowner (50%)</span>
                      <strong>{fmt(distribution.landOwnerShare)}</strong>
                    </div>
                    {project.hasFarmer && project.farmers.length > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span>Farmers (total 25%)</span>
                          <strong>{fmt(distribution.farmerTotalShare)}</strong>
                        </div>
                        {project.farmers.map((f, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-700">
                            <span>— {f || `Farmer ${idx + 1}`}</span>
                            <span>{fmt(distribution.perFarmer)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Your final share</span>
                      <strong>{fmt(distribution.userFinal)}</strong>
                    </div>
                  </>
                )}

                {/* Lease */}
                {project.farmingType === "lease" && (
                  <>
                    {project.hasFarmer && (
                      <div className="flex justify-between">
                        <span>Farmers (total 25%)</span>
                        <strong>{fmt(distribution.farmerTotalShare)}</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Your share before lease</span>
                      <strong>{fmt(distribution.netProfit - distribution.farmerTotalShare)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Lease (deducted from your share)</span>
                      <strong className="text-red-600">- {fmt(distribution.lease)}</strong>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Your final share</span>
                      <strong>{fmt(distribution.userFinal)}</strong>
                    </div>
                  </>
                )}

                {/* Owner */}
                {project.farmingType === "owner" && (
                  <>
                    {project.hasFarmer && (
                      <>
                        <div className="flex justify-between">
                          <span>Farmers (total 25%)</span>
                          <strong>{fmt(distribution.farmerTotalShare)}</strong>
                        </div>
                        {project.farmers.map((f, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-700">
                            <span>— {f || `Farmer ${idx + 1}`}</span>
                            <span>{fmt(distribution.perFarmer)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Your final share</span>
                      <strong>{fmt(distribution.userFinal)}</strong>
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
          onSubmit={(payload) => handleAddOrUpdateActivity(payload)}
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

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold">{project ? "Edit Project" : "Create Crop Project"}</h3>

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Crop name" required className="w-full p-2 border rounded bg-gray-50" />
        <input value={season} onChange={(e) => setSeason(e.target.value)} placeholder="Season (e.g. Rabi 2025)" required className="w-full p-2 border rounded bg-gray-50" />

        <label className="block text-sm text-gray-600">Farming Type</label>
        <select value={farmingType} onChange={(e) => setFarmingType(e.target.value)} className="w-full p-2 border rounded bg-gray-50">
          <option value="owner">Owner Farming</option>
          <option value="partnership">Partnership Farming</option>
          <option value="lease">Lease Farming</option>
        </select>

        {farmingType === "lease" && (
          <input value={leaseAmount} onChange={(e) => setLeaseAmount(e.target.value)} type="number" placeholder="Lease amount (paid by user)" className="w-full p-2 border rounded bg-gray-50" />
        )}

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hasFarmer} onChange={(e) => setHasFarmer(e.target.checked)} />
          <span className="text-sm">Hire farmer(s) — farmers share 25% (split between them)</span>
        </label>

        {hasFarmer && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Farmers</div>
              <button type="button" onClick={addFarmer} className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded bg-green-500 text-white"> <Plus size={12}/> Add</button>
            </div>

            <div className="space-y-2">
              {farmers.length === 0 && <p className="text-sm text-gray-500">No farmer names — they will be treated as hired farmers.</p>}
              {farmers.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input value={f} onChange={(e) => updateFarmer(i, e.target.value)} placeholder={`Farmer ${i + 1} name`} className="flex-1 p-2 border rounded bg-gray-50" />
                  <button type="button" onClick={() => removeFarmer(i)} className="px-2 rounded py-1 text-sm bg-red-500 text-white">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-start gap-2 mt-3">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-gray-300 text-red-700 hover:bg-red-600 hover:text-white">Cancel</button>
          <button type="submit" className="px-3 py-2 bg-gray-300 text-green-700 hover:bg-green-600 hover:text-white rounded">Save</button>
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
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold">{activity ? "Edit Activity" : "Add Activity"}</h3>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border rounded bg-gray-50" />
        <input value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder="Activity (eg. Sowing)" required className="w-full p-2 border rounded bg-gray-50" />
        <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="w-full p-2 border rounded bg-gray-50" />
        <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Cost (Rs)" required className="w-full p-2 border rounded bg-gray-50" />
        <div className="flex justify-end gap-2 mt-3">
          <button type="button" onClick={onClose} className="px-3 py-2 text-gray-700">Cancel</button>
          <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">{activity ? "Save" : "Add"}</button>
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
