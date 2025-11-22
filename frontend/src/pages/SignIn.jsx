import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Eye, EyeOff, Star } from "lucide-react";
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Signing in...");

      const res = await axios.post(
        "http://localhost:4000/api/auth/signin",
        formData
      );

      toast.dismiss(loadingToast);
      // Success toast
      toast.success(`Welcome back, ${res.data.user.name}!`);

      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      const userWithToken = { ...res.data.user, token: res.data.token };
localStorage.setItem("user", JSON.stringify(userWithToken));

      // Redirect
      navigate("/layout");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* left side */}

        <div className="flex flex-1 flex-col justify-center items-center text-center p-8 md:p-16 max-md:hidden bg-gray-100/90">
          <div className="max-w-md">
            <img
              src={assets.logo}
              alt="Legacy Loop"
              className="h-8 mb-10 mx-auto"
            />

            {/* <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-snug">
              We've been using <span className="font-semibold">Untitled</span>{" "}
              to kick start every new project and can't imagine working without
              it.
            </p> */}
            <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-snug">
              One Loop. Endless Connections.
            </p>

            <p className="text-gray-600 leading-relaxed">
                Empower your campus community. Legacy Loop bridges{" "}
                <span className="font-medium text-gray-800">
                  students, alumni, and colleges
                </span>{" "}
                — creating a continuous circle of mentorship, opportunity, and
                growth that strengthens every generation.
              </p>

            {/* <div className="flex flex-col items-center">
              <img
                src={assets.sample_profile}
                alt="User"
                className="h-14 w-14 rounded-full mb-3 object-cover"
              />
              <p className="font-semibold text-gray-900">Pippa Wilkinson</p>
              <p className="text-sm text-gray-500 mb-2">
                Head of Design, Layers
              </p>
            </div>

            <div className="flex justify-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
            </div> */}

            {/* <footer className="text-gray-400 text-xs mt-10">
              © Legacy Loop
            </footer> */}
          </div>
        </div>

        {/* right side */}

        <div className="flex-1 flex justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Login to your account
            </h2>

             <button
                type="button"
                className="w-full border border-gray-300 rounded-lg py-2 font-medium text-gray-700 flex justify-center items-center gap-2"
              >
                <img
                  src={assets.google_icon}
                  alt="Google"
                  className="h-5 w-5"
                />
                Sign in with Google
              </button>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 mt-7">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded focus:outline-none" >
                    {
                      showPassword ? (
                        <Eye className="w-5 h-5 text-gray-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-600" />
                      )
                    }
                  </button>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <label className="flex items-center text-sm text-gray-600 font-medium">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-gray-300"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-sm text-black hover:underline font-medium"
                  >
                    Forgot password
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-black/85 text-white rounded-lg py-2 font-medium transition"
              >
                Log in
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Alumni joining for the first time?{" "}
              <Link
                to="/signup"
                className="text-black font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
