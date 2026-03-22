import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { success, data } = await apiRequest("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    setLoading(false);

    if (success && data) {
      // Save JWT & full user locally
      localStorage.setItem("auth-token", data.fullUser.token);
      localStorage.setItem("user-data", JSON.stringify(data.fullUser));

      toast.success(`Welcome back, ${data.fullUser.fullName}!`);

      // Use the redirect URL sent by backend (same as Twitter login)
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen relative overflow-hidden px-6 md:px-12 lg:px-20 flex items-center justify-center">
      {/* Background gradients */}
      <div
        className="absolute inset-0 opacity-30 animate-[pulse_4s_ease-in-out_infinite]
          bg-[radial-gradient(circle_at_20%_30%,rgba(72,255,117,0.4),transparent_40%),
               radial-gradient(circle_at_80%_70%,rgba(72,255,117,0.3),transparent_40%)]"
      />

      {/* Login form */}
      <form
        onSubmit={handleLogin}
        className="relative bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        <label className="block mb-4">
          <span className="text-white mb-1 block">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-white mb-1 block">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter password"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;