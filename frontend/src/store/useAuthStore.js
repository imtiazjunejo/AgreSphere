// frontend/src/store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      // Updated endpoint to match backend route
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      // Updated endpoint to match backend route
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.data });
      toast.success("Account created successfully ✅", { duration: 3000 });
      return true;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      const status = error.response?.status;

      if (status === 400) {
        toast.error(backendMessage || "All fields are required.");
      } else if (status === 409) {
        toast.error(backendMessage || "User already exists, please login.");
      } else {
        toast.error(backendMessage || "Something went wrong while signing up.");
      }

      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      // Updated endpoint to match backend route
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.data });
      toast.success("Logged in successfully ✅", { duration: 3000 });
      return { success: true };
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      const status = error.response?.status;

      let field = null;
      let message = backendMessage || "Something went wrong while logging in.";

      if (status === 400) {
        field = "email";
        message = "All fields are required.";
      } else if (status === 401) {
        if (backendMessage?.toLowerCase().includes("user does not")) {
          field = "email";
          message = "User does not exist.";
        } else if (backendMessage?.toLowerCase().includes("incorrect password")) {
          field = "password";
          message = "Incorrect password.";
        }
      }

      toast.error(message, { duration: 3000 });
      return { success: false, field, message };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      // Updated endpoint to match backend route
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while logging out");
    }
  },
}));