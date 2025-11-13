import { useState } from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (isSignup) {
  //     console.log('Signup data:', formData);
  //     // Example: POST to your backend
  //     // await axios.post('/api/signup', formData)
  //   } else {
  //     console.log('Signin data:', formData);
  //     // Example: POST to your backend
  //     // await axios.post('/api/login', { email, password })
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:4000/api/auth/signup"
        : "http://localhost:4000/api/auth/signin";

      const res = await axios.post(url, formData);

      // store token and user data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // navigate to feed page
      navigate("/layout");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Testimonial */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-8 md:p-16 border-r border-gray-200 max-md:hidden">
        <div className="max-w-md">
          <img
            src={assets.logo}
            alt="Untitled UI"
            className="h-8 mb-10 mx-auto"
          />

          <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-snug">
            We've been using <span className="font-semibold">Untitled</span> to
            kick start every new project and can't imagine working without it.
          </p>

          <div className="flex flex-col items-center">
            <img
              src={assets.logo}
              alt="User"
              className="h-14 w-14 rounded-full mb-3 object-cover"
            />
            <p className="font-semibold text-gray-900">Pippa Wilkinson</p>
            <p className="text-sm text-gray-500 mb-2">Head of Design, Layers</p>

            <div className="flex justify-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-amber-400 fill-amber-400"
                  />
                ))}
            </div>
          </div>

          <footer className="text-gray-400 text-xs mt-10">
            © Legacy Loop 2025
          </footer>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {isSignup ? "Create an account" : "Welcome back"}
          </h2>
          {/* <p className="text-gray-600 mb-8">
            {isSignup
              ? 'Start your 30-day free trial.'
              : 'Welcome back! Please enter your details.'}
          </p> */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {!isSignup && (
                <div className="flex justify-between items-center mt-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-gray-300"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Forgot password
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 font-medium transition"
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 rounded-lg py-2 font-medium text-gray-700 flex justify-center items-center gap-2"
            >
              <img src={assets.logo} alt="Google" className="h-5 w-5" />
              {isSignup ? "Sign up with Google" : "Sign in with Google"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-600 font-medium hover:underline"
                  onClick={() => setIsSignup(false)}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-600 font-medium hover:underline"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
