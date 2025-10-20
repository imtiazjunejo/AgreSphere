// frontend/src/store/useProfileStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProfileStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isUpdating: false,

  // ✅ Fetch current user
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/profile/me"); // fixed endpoint
      set({ user: res.data, isLoading: false });
    } catch (error) {
      console.error("Fetch User Error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch user");
      set({ isLoading: false });
    }
  },

  // ✅ Update user profile
  updateUser: async (formData) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ user: res.data, isUpdating: false });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      set({ isUpdating: false });
    }
  },

  // ✅ Logout user
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout");
    }
  },
}));
