import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    rollNumber: "",
    graduationYear: "",
    department: "",
    password: "",
    role: "alumni",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Creating your alumni account...");
      const res = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );
      toast.dismiss(loadingToast);
      toast.success("Welcome to Legacy Loop 🎓");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      navigate("/app/layout");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Signup failed. Try again!");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* Left side - Scrollable form */}
      <div className="w-full lg:w-1/2 overflow-y-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 no-scrollbar">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-6">
            <img
              src={assets.logo}
              alt="Legacy Loop"
              className="h-6 mx-auto"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Alumni Registration
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            Join the Legacy Loop and reconnect with your college community.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Father's Name (for verification)
              </label>
              <input
                type="text"
                name="fatherName"
                placeholder="Michael Doe"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Roll Number (optional) */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                name="rollNumber"
                placeholder="Ex: 20CSE1234"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-black outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                If you don't remember it, you can leave this blank.
              </p>
            </div>

            {/* Department + Graduation Year - Stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  placeholder="2022"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-black outline-none bg-white"
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="BT">Biotechnology</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-black/80 text-white rounded-lg py-2.5 sm:py-2 font-medium text-sm sm:text-base transition"
            >
              Sign Up
            </button>

            <div className="flex items-center my-4 sm:my-6 mt-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-xs sm:text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-2 font-medium text-sm sm:text-base text-gray-700 flex justify-center items-center gap-2 hover:bg-gray-50 transition"
            >
              <img src={assets.google_icon} alt="Google" className="h-4 w-4 sm:h-5 sm:w-5" />
              Sign Up with Google
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-5 sm:mt-6">
            Already a member?{" "}
            <Link
              to="/signin"
              className="text-black font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400 mt-3 mb-6 sm:mb-0">
            *Sign up is only available for verified alumni.*
          </p>
        </div>
      </div>

      {/* Right side - Hidden on mobile/tablet */}
      <div className="hidden lg:flex lg:fixed lg:right-0 lg:top-0 lg:h-screen lg:w-1/2 flex-col justify-center items-center text-center bg-gray-100/90 p-12 xl:p-16">
        <div className="max-w-md w-full px-4">
          <img
            src={assets.logo}
            alt="Legacy Loop"
            className="h-8 mb-10 mx-auto"
          />
          <p className="text-2xl xl:text-3xl font-semibold text-gray-900 mb-4 leading-snug">
            One Loop. Endless Connections.
          </p>
          <p className="text-gray-600 text-sm xl:text-base mb-8">
            Reconnect with your batchmates, mentor students, and build
            opportunities that strengthen your college legacy.
          </p>
          <footer className="text-gray-400 text-xs mt-10">
            © 2025 Legacy Loop
          </footer>
        </div>
      </div>
    </div>
  )
}

export default SignUp;