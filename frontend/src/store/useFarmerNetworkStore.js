// src/store/useFarmerNetworkStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { v4 as uuidv4 } from "uuid";

export const useFarmerNetworkStore = create((set, get) => ({
  farmers: [],
  selectedFarmerId: null,
  loading: false,
  error: null,

  // ✅ Fetch all farmers
  fetchFarmers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/network");
      set({ farmers: res.data });
    } catch (err) {
      console.error("Error fetching farmers:", err);
      set({ error: "Failed to load farmer data." });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Add a new farmer
  addFarmer: async (farmerData) => {
    try {
      const res = await axiosInstance.post("/network", {
        id: uuidv4(),
        ...farmerData,
      });
      set((state) => ({
        farmers: [...state.farmers, res.data],
      }));
    } catch (err) {
      console.error("Error adding farmer:", err);
      set({ error: "Could not add farmer." });
    }
  },

    // ✅ Send a connection request
    connectFarmer: async (farmerId) => {
        const user = useAuthStore.getState().authUser;
        try {
            await axiosInstance.post(`/network/connect/${farmerId}`, {
            userId: user._id,   // ✅ send body
            });
            alert("Connection request sent!");
        } catch (err) {
            console.error("Error connecting farmer:", err);
        }
    },

}));
