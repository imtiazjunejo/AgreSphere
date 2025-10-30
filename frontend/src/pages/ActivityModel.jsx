import { useState, useEffect } from "react";

export default function ActivityModal({ activity, onSave, onClose }) {
  const [formData, setFormData] = useState({
    date: "",
    activity: "",
    notes: "",
    cost: "",
  });

  useEffect(() => {
    if (activity) setFormData(activity);
  }, [activity]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.activity || !formData.date) {
      alert("Please fill in date and activity.");
      return;
    }
    onSave({ ...formData, cost: Number(formData.cost || 0) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {activity ? "Edit Activity" : "Add Activity"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Activity</label>
            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              placeholder="e.g. Ploughing"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Cost (Rs)</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="input input-bordered w-full"
              min="0"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {activity ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
