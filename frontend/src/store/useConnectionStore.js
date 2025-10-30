import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useConnectionStore = create((set, get) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async (farmerId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/network/connections/${farmerId}`);
      set({ requests: res.data });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to load requests" });
    } finally {
      set({ loading: false });
    }
  },

  acceptRequest: async (id) => {
    await axiosInstance.patch(`/connections/accept/${id}`);
    set((state) => ({
      requests: state.requests.filter((r) => r._id !== id),
    }));
  },

  rejectRequest: async (id) => {
    await axiosInstance.patch(`/connections/reject/${id}`);
    set((state) => ({
      requests: state.requests.filter((r) => r._id !== id),
    }));
  },
}));
