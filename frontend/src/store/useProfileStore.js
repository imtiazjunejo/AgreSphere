// frontend/src/store/useProfileStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:3000"; // ✅ backend base URL

export const useProfileStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isUpdating: false,

  // ✅ Fetch current user profile
  fetchUser: async () => {
    const { isLoading } = get();
    if (isLoading) return; // Prevent multiple simultaneous calls

    set({ isLoading: true });
    try {
      // Updated endpoint to match backend route
      const res = await axiosInstance.get("/profile/me");
      const userData = res.data.data; // Access the data property from ApiResponse

      // ✅ Fix image URLs
      if (userData.profilePic && !userData.profilePic.startsWith("http")) {
        userData.profilePic = `${API_BASE_URL}${userData.profilePic}`;
      }
      if (userData.coverImage && !userData.coverImage.startsWith("http")) {
        userData.coverImage = `${API_BASE_URL}${userData.coverImage}`;
      }

      set({ user: userData, isLoading: false });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch profile");
      set({ isLoading: false });
    }
  },

  // ✅ Update profile with image upload
  updateUser: async (formData) => {
    const { isUpdating } = get();
    if (isUpdating) return; // Prevent multiple simultaneous calls

    set({ isUpdating: true });
    try {
      // Updated endpoint to match backend route
      const res = await axiosInstance.patch("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data.data; // Access the data property from ApiResponse

      // ✅ Fix image URLs again
      if (updatedUser.profilePic && !updatedUser.profilePic.startsWith("http")) {
        updatedUser.profilePic = `${API_BASE_URL}${updatedUser.profilePic}`;
      }
      if (updatedUser.coverImage && !updatedUser.coverImage.startsWith("http")) {
        updatedUser.coverImage = `${API_BASE_URL}${updatedUser.coverImage}`;
      }

      set({ user: updatedUser, isUpdating: false });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      set({ isUpdating: false });
    }
  },
}));