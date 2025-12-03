import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Signing in...");

      const res = await axios.post("http://localhost:4000/api/auth/signin", formData);
      toast.dismiss(loadingToast);
      toast.success(`Welcome back, ${res.data.user.name}!`);

      const userWithToken = { ...res.data.user, token: res.data.token };
      localStorage.setItem("user", JSON.stringify(userWithToken));

      navigate("/app/layout");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left side - Hidden on mobile/tablet */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center text-center p-8 xl:p-16 bg-gray-100/90">
        <div className="max-w-md w-full px-4">
          <img
            src={assets.logo}
            alt="Legacy Loop"
            className="h-6 sm:h-8 mb-8 lg:mb-10 mx-auto"
          />
          <p className="text-xl lg:text-2xl xl:text-3xl font-medium text-gray-900 mb-6 lg:mb-8 leading-snug">
            One Loop. Endless Connections.
          </p>
          <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
            Empower your campus community. Legacy Loop bridges{" "}
            <span className="font-medium text-gray-800">
              students, alumni, and colleges
            </span>{" "}
            — creating a continuous circle of mentorship, opportunity, and
            growth that strengthens every generation.
          </p>
        </div>
      </div>

      {/* Right side - Full width on mobile */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-8 md:p-12 lg:p-16 min-h-screen">
        <div className="w-full max-w-sm">
          {/* Mobile logo - only shown on small screens */}
          <div className="lg:hidden text-center mb-8">
            <img
              src={assets.logo}
              alt="Legacy Loop"
              className="h-6 mx-auto mb-4"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
            Login to your account
          </h2>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-2 font-medium text-sm sm:text-base text-gray-700 flex justify-center items-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src={assets.google_icon}
              alt="Google"
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
            Sign in with Google
          </button>

          <div className="flex items-center my-5 sm:my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-xs sm:text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword((s) => !s)} 
                  aria-label={showPassword ? "Hide password" : "Show password"} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded focus:outline-none hover:bg-gray-100 transition"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2 sm:gap-0">
                <label className="flex items-center text-xs sm:text-sm text-gray-600 font-medium">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-black hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-black/85 text-white rounded-lg py-2.5 sm:py-2 font-medium text-sm sm:text-base transition mt-6"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-5 sm:mt-6">
            Alumni joining for the first time?{" "}
            <Link to="/signup" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn;