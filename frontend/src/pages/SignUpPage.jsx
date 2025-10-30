import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Added

const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div className="w-full">
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`peer w-full h-12 px-4 pt-3 pb-2 border rounded-[8px] text-gray-900 bg-gray-100 placeholder-transparent focus:outline-none focus:ring-1
          ${
            error && touched
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-400 focus:ring-gray-400"
          }`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 -top-2 px-1 bg-gray-100 text-sm transition-all duration-200
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:px-0
          peer-focus:-top-2 peer-focus:text-sm peer-focus:px-2
          ${error && touched ? "text-red-500" : "text-gray-500 peer-focus:text-gray-500"}
        `}
      >
        {label}
      </label>
    </div>
    <div className="h-1 mt-1">
      {touched && error && (
        <p className="text-red-500 text-sm text-left px-5">{error}</p>
      )}
    </div>
  </div>
);

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
    phone: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        break;
      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (!value.trim()) return "Confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        await signup(formData);
        
      } catch (error) {
        // ✅ Error Toasts
        if (error.response?.status === 409) {
          toast.error("Email already exists ⚠️");
        } else if (error.response?.status === 400) {
          toast.error("Please fill all required fields!");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-6">
      <div className="w-full max-w-lg bg-gray-300 rounded-2xl shadow-lg p-8 mt-14">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-1 group">
            <h1 className="text-2xl font-bold mt-2 text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500">
              Get started with your free account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <FloatingInput
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                error={errors.firstName}
                touched={touchedFields.firstName}
              />
            </div>
            <div className="flex-1">
              <FloatingInput
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                error={errors.lastName}
                touched={touchedFields.lastName}
              />
            </div>
          </div>

          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            touched={touchedFields.email}
          />

          {/* Password */}
          <div className="relative w-full">
            <FloatingInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touchedFields.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <FloatingInput
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touchedFields.confirmPassword}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* New Fields */}
          <FloatingInput
            id="location"
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            onBlur={() => handleBlur("location")}
            error={errors.location}
            touched={touchedFields.location}
          />

          <FloatingInput
            id="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
            touched={touchedFields.phone}
          />

          <div>
            <label className="block mb-2 text-gray-600 font-medium">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border border-gray-400 rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              
              <option value="">--select role--</option>
              <option value="Farmer">Farmer</option>
              <option value="landloard">Landloard</option>
              <option value="labourer">labourer</option>
              <option value="stackholder">StackHolder</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-600 font-medium">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full border border-gray-400 rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
