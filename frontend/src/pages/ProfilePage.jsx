import { useEffect, useState } from "react";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Import profile components
import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import ProfileOverview from "../components/profile/ProfileOverview";

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
    coverImage: `${API_BASE_URL}/profile/uploads/default-cover.jpg`,
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
      console.log("Current user data:", currentUser);
      console.log("Profile pic:", currentUser.profilePic);
      console.log("Cover image:", currentUser.coverImage);

      // Fix image paths coming from backend like `/uploads/...`
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

      console.log("Fixed profile pic URL:", fixedProfilePic);
      console.log("Fixed cover image URL:", fixedCoverImage);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (isLoading || !authUser)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  const currentUser = user || authUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard
              user={currentUser}
              editing={editing}
              onEditToggle={handleEditToggle}
              onFileChange={handleChange}
              previewImages={previewImages}
            />
            <ProfileStats user={currentUser} />
          </div>

          {/* Right Content - Edit Form */}
          <div className="lg:col-span-2">
            {editing ? (
              <ProfileEditForm
                formData={formData}
                onInputChange={handleInputChange}
                onFileChange={handleChange}
                onTogglePassword={handleTogglePassword}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isUpdating={isUpdating}
              />
            ) : (
              <ProfileOverview onEditToggle={handleEditToggle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
