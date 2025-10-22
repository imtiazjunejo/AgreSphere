import { useEffect, useState } from "react";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Eye, EyeOff, Camera } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:3000"; // ✅ Backend base URL

const Profile = () => {
  const { user, fetchUser, updateUser, logout, isLoading, isUpdating } = useProfileStore();
  const { authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    profilePic: null,
    coverImage: null,
    location: "",
    phone: "",
    bio: "",
  });

  const [previewImages, setPreviewImages] = useState({
    profilePic: null,
    coverImage: `${API_BASE_URL}/uploads/default-cover.jpg`,
  });
  const [editing, setEditing] = useState(false);

  // ✅ Fetch current user
  useEffect(() => {
    if (authUser) {
      fetchUser();
    }
  }, [authUser, fetchUser]);

  // ✅ Update previews after fetch
  useEffect(() => {
    const currentUser = user || authUser;
    if (currentUser) {
      // Fix image paths coming from backend like `/public/uploads/...`
      const fixedProfilePic = currentUser.profilePic
        ? currentUser.profilePic.startsWith("http")
          ? currentUser.profilePic
          : `${API_BASE_URL}${currentUser.profilePic}`
        : null;

      const fixedCoverImage = currentUser.coverImage
        ? currentUser.coverImage.startsWith("http")
          ? currentUser.coverImage
          : `${API_BASE_URL}${currentUser.coverImage}`
        : `${API_BASE_URL}/uploads/default-cover.jpg`;

      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        location: currentUser.location || "",
        phone: currentUser.phone || "",
        bio: currentUser.bio || "",
        password: "", // Always reset password field
        profilePic: null, // Reset file inputs
        coverImage: null,
      }));

      setPreviewImages({
        profilePic: fixedProfilePic,
        coverImage: fixedCoverImage,
      });
    }
  }, [user, authUser]);

  // ✅ Handle file selection
  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewImages((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleTogglePassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email } = formData;
    if (!firstName || !email)
      return toast.error("First Name and Email are required!");

    await updateUser(formData);
    setEditing(false);
  };

  if (isLoading || !authUser)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Card */}
      <div className="relative bg-white rounded shadow overflow-hidden">
        {/* Cover Image */}
        <div className="h-40 w-full relative bg-gray-200">
          <img
            src={previewImages.coverImage || `${API_BASE_URL}/uploads/default-cover.jpg`}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = `${API_BASE_URL}/uploads/default-cover.jpg`)}
          />
          {editing && (
            <label className="absolute right-2 top-2 bg-black/50 p-1 rounded-full cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Profile Image */}
        <div className="absolute left-6 bottom-3 w-40 h-40 rounded-full border-4 border-white overflow-hidden flex items-center justify-center bg-gray-300 text-white text-2xl font-bold">
          {previewImages.profilePic ? (
            <img
              src={previewImages.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "")}
            />
          ) : (
            (user?.firstName || authUser?.firstName || "U").charAt(0).toUpperCase()
          )}

          {editing && (
            <label className="absolute bottom-5 right-4 bg-black/50 p-1 rounded-full cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                name="profilePic"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Name & Role */}
        <div className="mt-16 p-6 pl-56 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {user?.firstName || authUser?.firstName} {user?.lastName || authUser?.lastName}
            </h2>
            <p className="text-gray-600 text-lg">{user?.role || authUser?.role}</p>
            {(user?.location || authUser?.location) && (
              <p className="text-gray-500 text-sm mt-1">
                📍 {user?.location || authUser?.location}
              </p>
            )}
            {(user?.phone || authUser?.phone) && (
              <p className="text-gray-500 text-sm">
                📞 {user?.phone || authUser?.phone}
              </p>
            )}
            {(user?.bio || authUser?.bio) && (
              <p className="text-gray-600 text-sm mt-2 max-w-md">
                {user?.bio || authUser?.bio}
              </p>
            )}
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editing ? "Cancel" : "Update"}
          </button>
        </div>
      </div>

      {/* Update Form */}
      {editing && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter new password"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {formData.showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
