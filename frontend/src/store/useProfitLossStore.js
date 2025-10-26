// frontend/src/store/useProfitLossStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useProfitLossStore = create((set) => ({
  data: [],
  summary: null,
  loading: false,
  error: null,

  fetchProfitLoss: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/profitloss/analytics");
      set({
        data: res?.data?.data || [],
        summary: res?.data?.summary || null,
        loading: false,
      });
    } catch (err) {
      console.error("❌ Error fetching profit/loss:", err);
      set({ error: "Failed to fetch profit/loss data", loading: false });
    }
  },
}));
