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
  const { user, fetchUser, updateUser, isLoading, isUpdating } = useProfileStore();
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
    coverImage: null,
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

      // Function to normalize image paths
      const normalizeImagePath = (path) => {
        if (!path) return null;
        if (path.startsWith("http")) return path;
        // Remove any leading slash and then add one to ensure exactly one slash
        return `${API_BASE_URL}/${path.replace(/^\//, '')}`;
      };

      const fixedProfilePic = normalizeImagePath(currentUser.profilePic);
      const fixedCoverImage = normalizeImagePath(currentUser.coverImage);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Cover Photo Section */}
        <div className="h-64 relative overflow-hidden">
          {previewImages.coverImage ? (
            <>
              <img
                src={previewImages.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Cover image failed to load:", e.target.src);
                  // Remove the failed image and show gradient background
                  setPreviewImages(prev => ({ ...prev, coverImage: null }));
                }}
              />
              {/* Very light overlay for text readability only */}
              <div className="absolute inset-0 bg-black/5"></div>
            </>
          ) : (
            /* Default gradient background when no cover image */
            <div className="w-full h-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"></div>
          )}

          {/* Bottom gradient fade for profile picture area */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 via-white/60 to-transparent"></div>

          {editing && (
            <label className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full cursor-pointer hover:bg-white transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
        </div>

        {/* Profile Header */}
        <div className="relative px-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-20">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                {previewImages.profilePic ? (
                  <img
                    src={previewImages.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-6xl font-bold text-gray-600">
                      {(currentUser?.firstName || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              {editing && (
                <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-4 md:mt-0 pb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {currentUser?.firstName} {currentUser?.lastName}
              </h1>
              <p className="text-xl text-gray-600 mb-2 capitalize">{currentUser?.role || 'Farmer'}</p>
              <p className="text-gray-600 mb-3">{currentUser?.location}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleEditToggle}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button className="bg-white text-gray-700 px-6 py-2 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                {currentUser?.bio ? (
                  <p className="text-gray-700 leading-relaxed">{currentUser.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">No bio added yet</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {currentUser?.email && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{currentUser.email}</span>
                    </div>
                  )}
                  {currentUser?.phone && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">{currentUser.phone}</span>
                    </div>
                  )}
                  {currentUser?.location && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{currentUser.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <ProfileStats user={currentUser} />
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2">
              {editing ? (
                <div className="bg-white rounded-lg shadow border border-gray-200">
                  <ProfileEditForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onFileChange={handleChange}
                    onTogglePassword={handleTogglePassword}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isUpdating={isUpdating}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow border border-gray-200">
                  <ProfileOverview onEditToggle={handleEditToggle} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;