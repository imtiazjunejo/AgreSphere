import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { v4 as uuidv4 } from "uuid";


export const useCropLogsStore = create((set, get) => ({
  cropLogs: [],            // list of cropLog documents (full docs)
  selectedCropLogId: null, // currently opened cropLog._id
  project: null,           // the project subdocument (cropLog.project)
  activities: [],          // current cropLog.activities
  loading: false,
  error: null,

  // Fetch all cropLogs for user (for listing)
  fetchProject: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/crop-logs");
      const list = res?.data?.data || [];
      set({ cropLogs: list, loading: false });
    } catch (err) {
      console.error("❌ Error fetching crop logs:", err);
      set({ error: "Failed to fetch crop logs", loading: false });
    }
  },

  // Select/open a particular cropLog by id (load its project & activities)
  fetchCropLogById: async (id) => {
    if (!id) return;
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/crop-logs/${id}`);
      const doc = res?.data?.data;
      set({
        selectedCropLogId: doc?._id || null,
        project: doc?.project || null,
        activities: doc?.activities || [],
        loading: false,
      });
    } catch (err) {
      console.error("❌ Error fetching crop log by id:", err);
      set({ error: "Failed to fetch crop log", loading: false });
    }
  },

  // Quick helper: fetch first project (useful for initial load)
  fetchFirstProject: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/crop-logs");
      const list = res?.data?.data || [];
      const first = list.length > 0 ? list[0] : null;
      set({
        cropLogs: list,
        selectedCropLogId: first?._id || null,
        project: first?.project || null,
        activities: first?.activities || [],
        loading: false,
      });
    } catch (err) {
      console.error("❌ Error fetching first project:", err);
      set({ error: "Failed to fetch project", loading: false });
    }
  },

  // Create a new cropLog (project). Backend expects `body.project`
  createOrUpdateProject: async (projectPayload) => {
    try {
      const res = await axiosInstance.post("/crop-logs", { project: projectPayload });
      const doc = res?.data?.data;
      // add to list and select it
      set((s) => ({
        cropLogs: [doc, ...(s.cropLogs || [])],
        selectedCropLogId: doc?._id || null,
        project: doc?.project || null,
        activities: doc?.activities || [],
      }));
      return doc;
    } catch (err) {
      console.error("❌ Error creating project:", err);
      throw err;
    }
  },

    // Manually set current open project (from list)
  setProject: (projectDoc) => {
    set({
      selectedCropLogId: projectDoc?._id || null,
      project: projectDoc?.project || null,
      activities: projectDoc?.activities || [],
    });
  },


  // Delete a cropLog by currently selected id
  deleteSelectedProject: async (idParam) => {
    try {
      const id = idParam || get().selectedCropLogId;
      if (!id) return;
      await axiosInstance.delete(`/crop-logs/${id}`);
      // remove from list and reset selection
      set((s) => {
        const nextList = (s.cropLogs || []).filter((c) => c._id !== id);
        const first = nextList.length ? nextList[0] : null;
        return {
          cropLogs: nextList,
          selectedCropLogId: first?._id || null,
          project: first?.project || null,
          activities: first?.activities || [],
        };
      });
    } catch (err) {
      console.error("❌ Error deleting project:", err);
    }
  },



  

addOrUpdateActivity: async (incomingActivity) => {
  try {
    const selectedId = get().selectedCropLogId;
    const project = get().project;
    if (!selectedId || !project) {
      console.warn("No selected project to attach activity to");
      return;
    }

    const activities = Array.isArray(get().activities) ? [...get().activities] : [];

    // Normalize incoming
    const incoming = { ...incomingActivity };

    // Always ensure a clientId exists for tracking before _id is returned
    if (!incoming._id && !incoming.clientId) {
      incoming.clientId = uuidv4();
    }

    // Find existing activity by _id or clientId
    let idx = -1;
    if (incoming._id) {
      idx = activities.findIndex((a) => a._id && a._id.toString() === incoming._id.toString());
    }
    if (idx === -1 && incoming.clientId) {
      idx = activities.findIndex((a) => a.clientId === incoming.clientId);
    }

    if (idx > -1) {
      // Update existing
      activities[idx] = { ...activities[idx], ...incoming };
    } else {
      // Insert fresh
      activities.push(incoming);
    }

    const res = await axiosInstance.put(`/crop-logs/${selectedId}`, {
      activities,
    });

    const doc = res?.data?.data;
    set({
      project: doc?.project || project,
      activities: doc?.activities || activities,
    });
  } catch (err) {
    console.error("❌ Error adding/updating activity:", err);
    throw err;
  }
},



  // Delete an activity by activityId (server _id) or clientId (UI id)
  deleteActivity: async (activityIdOrClientId) => {
    try {
      const selectedId = get().selectedCropLogId;
      const activities = Array.isArray(get().activities) ? [...get().activities] : [];
      if (!selectedId) return;

      const filtered = activities.filter(
        (a) => a._id?.toString() !== activityIdOrClientId?.toString() && a.clientId !== activityIdOrClientId
      );

      const res = await axiosInstance.put(`/crop-logs/${selectedId}`, {
        activities: filtered,
      });

      const doc = res?.data?.data;
      set({
        project: doc?.project || get().project,
        activities: doc?.activities || filtered,
      });
    } catch (err) {
      console.error("❌ Error deleting activity:", err);
      throw err;
    }
  },
}));
