import { useState, useEffect } from "react";

const ProjectModal = ({ isOpen, onClose, onSave, selectedProject }) => {
  const [cropName, setCropName] = useState("");
  const [season, setSeason] = useState("");

  useEffect(() => {
    if (selectedProject) {
      setCropName(selectedProject.cropName || "");
      setSeason(selectedProject.season || "");
    } else {
      setCropName("");
      setSeason("");
    }
  }, [selectedProject]);

  const handleSave = () => {
    if (!cropName.trim() || !season.trim()) {
      alert("Please fill both fields!");
      return;
    }
    onSave({ cropName, season });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg">
          {selectedProject ? "Edit Project" : "Add New Project"}
        </h3>

        <div className="mt-4">
          {/* Crop Name */}
          <label className="form-control w-full">
            <span className="label-text font-medium">Crop Name</span>
            <input
              type="text"
              placeholder="Enter crop name"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          {/* Season */}
          <label className="form-control w-full mt-4">
            <span className="label-text font-medium">Season</span>
            <input
              type="text"
              placeholder="Enter season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
