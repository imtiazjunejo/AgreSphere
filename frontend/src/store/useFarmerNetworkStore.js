// src/store/useFarmerNetworkStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useFarmerNetworkStore = create((set, get) => ({
  farmers: [],
  connections: [],
  pendingRequests: [],
  selectedFarmerId: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalFarmers: 0,
    hasNextPage: false,
    hasPrevPage: false
  },

  // ✅ Fetch farmers with pagination and search
  fetchFarmers: async (page = 1, limit = 12, search = '') => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      if (search.trim()) {
        params.append('search', search.trim());
      }

      const res = await axiosInstance.get(`/network?${params}`);
      set({
        farmers: res.data.data.farmers || [],
        pagination: res.data.data.pagination || get().pagination
      });
    } catch (err) {
      console.error("Error fetching farmers:", err);
      set({ error: "Failed to load farmer data." });
      toast.error("Failed to load farmers");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Send connection request
  connectFarmer: async (farmerId) => {
    try {
      await axiosInstance.post(`/network/connect/${farmerId}`);
      toast.success("Connection request sent!");

      // Update the farmer's connection status in the store
      set((state) => ({
        farmers: state.farmers.map(farmer =>
          farmer._id === farmerId
            ? { ...farmer, connectionStatus: 'pending' }
            : farmer
        )
      }));
    } catch (err) {
      console.error("Error connecting farmer:", err);
      toast.error(err.response?.data?.message || "Failed to send connection request");
    }
  },

  // ✅ Accept connection request
  acceptConnection: async (connectionId) => {
    try {
      await axiosInstance.post(`/network/accept/${connectionId}`);
      toast.success("Connection request accepted!");

      // Refresh connections
      await get().fetchConnections();
    } catch (err) {
      console.error("Error accepting connection:", err);
      toast.error("Failed to accept connection request");
    }
  },

  // ✅ Reject connection request
  rejectConnection: async (connectionId) => {
    try {
      await axiosInstance.post(`/network/reject/${connectionId}`);
      toast.success("Connection request rejected");

      // Refresh connections
      await get().fetchConnections();
    } catch (err) {
      console.error("Error rejecting connection:", err);
      toast.error("Failed to reject connection request");
    }
  },

  // ✅ Fetch user's connections
  fetchConnections: async () => {
    try {
      const res = await axiosInstance.get("/network/connections");
      set({
        connections: res.data.data.connections,
        pendingRequests: res.data.data.pendingRequests
      });
    } catch (err) {
      console.error("Error fetching connections:", err);
      toast.error("Failed to load connections");
    }
  },

}));
