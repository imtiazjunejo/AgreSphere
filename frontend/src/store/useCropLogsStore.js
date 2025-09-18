// // frontend/store/useCropLogsStore.js
// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";

// export const useCropLogsStore = create((set, get) => ({
//   cropLogs: [],
//   loading: false,
//   error: null,

//   // 🔹 Fetch all crop logs
//   fetchCropLogs: async () => {
//     set({ loading: true, error: null });
//     try {
//       const res = await axiosInstance.get("/crop-logs");
//       set({ cropLogs: res.data.data || [], loading: false });
//     } catch (err) {
//       console.error("Error fetching crop logs:", err);
//       set({ error: "Failed to fetch crop logs", loading: false });
//     }
//   },

//   // 🔹 Add new crop log
//   addCropLog: async (data) => {
//     try {
//       const res = await axiosInstance.post("/crop-logs", data);
//       set((state) => ({
//         cropLogs: [res.data.data, ...state.cropLogs],
//       }));
//     } catch (err) {
//       console.error("Error adding crop log:", err);
//     }
//   },

//   // 🔹 Update crop log
//   updateCropLog: async (id, data) => {
//     try {
//       const res = await axiosInstance.put(`/crop-logs/${id}`, data);
//       set((state) => ({
//         cropLogs: state.cropLogs.map((log) =>
//           log._id === id ? res.data.data : log
//         ),
//       }));
//     } catch (err) {
//       console.error("Error updating crop log:", err);
//     }
//   },

//   // 🔹 Delete crop log
//   deleteCropLog: async (id) => {
//     try {
//       await axiosInstance.delete(`/crop-logs/${id}`);
//       set((state) => ({
//         cropLogs: state.cropLogs.filter((log) => log._id !== id),
//       }));
//     } catch (err) {
//       console.error("Error deleting crop log:", err);
//     }
//   },

//   // 🔹 Add activity (update whole crop log)
//   addActivity: async (cropLogId, activity) => {
//     try {
//       const cropLog = get().cropLogs.find((log) => log._id === cropLogId);
//       if (!cropLog) return;

//       const updatedLog = {
//         ...cropLog,
//         activities: [...cropLog.activities, activity],
//       };

//       const res = await axiosInstance.put(`/crop-logs/${cropLogId}`, updatedLog);
//       set((state) => ({
//         cropLogs: state.cropLogs.map((log) =>
//           log._id === cropLogId ? res.data.data : log
//         ),
//       }));
//     } catch (err) {
//       console.error("Error adding activity:", err);
//     }
//   },

//   // 🔹 Update activity
//   updateActivity: async (cropLogId, activityId, data) => {
//     try {
//       const cropLog = get().cropLogs.find((log) => log._id === cropLogId);
//       if (!cropLog) return;

//       const updatedLog = {
//         ...cropLog,
//         activities: cropLog.activities.map((a) =>
//           a._id === activityId ? { ...a, ...data } : a
//         ),
//       };

//       const res = await axiosInstance.put(`/crop-logs/${cropLogId}`, updatedLog);
//       set((state) => ({
//         cropLogs: state.cropLogs.map((log) =>
//           log._id === cropLogId ? res.data.data : log
//         ),
//       }));
//     } catch (err) {
//       console.error("Error updating activity:", err);
//     }
//   },

//   // 🔹 Delete activity
//   deleteActivity: async (cropLogId, activityId) => {
//     try {
//       const cropLog = get().cropLogs.find((log) => log._id === cropLogId);
//       if (!cropLog) return;

//       const updatedLog = {
//         ...cropLog,
//         activities: cropLog.activities.filter((a) => a._id !== activityId),
//       };

//       const res = await axiosInstance.put(`/crop-logs/${cropLogId}`, updatedLog);
//       set((state) => ({
//         cropLogs: state.cropLogs.map((log) =>
//           log._id === cropLogId ? res.data.data : log
//         ),
//       }));
//     } catch (err) {
//       console.error("Error deleting activity:", err);
//     }
//   },

//   // 🔹 Mark activity as done (local only)
//   markActivityDone: (cropLogId, activityId) => {
//     set((state) => ({
//       cropLogs: state.cropLogs.map((log) =>
//         log._id === cropLogId
//           ? {
//               ...log,
//               activities: log.activities.map((a) =>
//                 a._id === activityId ? { ...a, status: "Done" } : a
//               ),
//             }
//           : log
//       ),
//     }));
//   },
// }));



// frontend/store/useCropLogsStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCropLogsStore = create((set, get) => ({
  projects: [],

  /* -------- Fetch all projects -------- */
  fetchProjects: async () => {
    try {
      const res = await axiosInstance.get("/cropLogs");
      set({ projects: res.data || [] });
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
    }
  },

  /* -------- Add new project -------- */
  addProject: async (data) => {
    try {
      const res = await axiosInstance.post("/cropLogs", data);
      set((state) => ({
        projects: [...state.projects, res.data],
      }));
    } catch (err) {
      console.error("❌ Error adding project:", err);
    }
  },

  /* -------- Update project -------- */
  updateProject: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/cropLogs/${id}`, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...res.data } : p
        ),
      }));
    } catch (err) {
      console.error("❌ Error updating project:", err);
    }
  },

  /* -------- Delete project -------- */
  deleteProject: async (id) => {
    try {
      await axiosInstance.delete(`/cropLogs/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error("❌ Error deleting project:", err);
    }
  },

  /* -------- Add activity -------- */
  addActivity: async (projectId, activity) => {
    try {
      const res = await axiosInstance.post(
        `/cropLogs/${projectId}/activities`,
        activity
      );
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId
            ? { ...p, activities: [...(p.activities || []), res.data] }
            : p
        ),
      }));
    } catch (err) {
      console.error("❌ Error adding activity:", err);
    }
  },

  /* -------- Update activity -------- */
  updateActivity: async (projectId, activityId, data) => {
    try {
      const res = await axiosInstance.put(
        `/cropLogs/${projectId}/activities/${activityId}`,
        data
      );
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                activities: p.activities.map((a) =>
                  a.id === activityId ? { ...a, ...res.data } : a
                ),
              }
            : p
        ),
      }));
    } catch (err) {
      console.error("❌ Error updating activity:", err);
    }
  },

  /* -------- Delete activity -------- */
  deleteActivity: async (projectId, activityId) => {
    try {
      await axiosInstance.delete(`/cropLogs/${projectId}/activities/${activityId}`);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                activities: p.activities.filter((a) => a.id !== activityId),
              }
            : p
        ),
      }));
    } catch (err) {
      console.error("❌ Error deleting activity:", err);
    }
  },

  /* -------- Mark activity as Done -------- */
  markActivityDone: async (projectId, activityId) => {
    try {
      const res = await axiosInstance.patch(
        `/cropLogs/${projectId}/activities/${activityId}`,
        { status: "Done" }
      );
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                activities: p.activities.map((a) =>
                  a.id === activityId ? { ...a, ...res.data } : a
                ),
              }
            : p
        ),
      }));
    } catch (err) {
      console.error("❌ Error marking activity done:", err);
    }
  },
}));
