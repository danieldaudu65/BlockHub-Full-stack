import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../confiq";

const Signin:React.FC = () => {
  const [twitterHandle, setTwitterHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!twitterHandle) {
      toast.error("Please enter your Twitter handle");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/project_auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twitterHandle }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed ❌");
        setLoading(false);
        return;
      }

      // Store project info in localStorage exactly like ProjectEdit expects
      localStorage.setItem("project_token", data.token);
      localStorage.setItem("project_name", data.name);
      localStorage.setItem("project_username", data.handle);
      localStorage.setItem("project_image", data.img || "");
      localStorage.setItem("project_desc", data.description || "");
      localStorage.setItem("project_id", data.id);
      localStorage.setItem("logged_in", "true"); // flag first login if needed

      toast.success("Logged in successfully ✅");

      // Navigate to edit page like ProjectEdit expects
      navigate("/grindfi/edit");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Project Login</h1>

        <div className="border border-gray-700 rounded-xl p-6 w-full max-w-2xl flex flex-col gap-4">
          <label className="text-gray-300">Twitter Handle *</label>
          <input
            type="text"
            value={twitterHandle}
            onChange={e => setTwitterHandle(e.target.value)}
            placeholder="@yourhandle"
            className="p-2 py-3 px-2 placeholder:text-gray-600 text-sm placeholder:text-sm outline-none bg-transparent rounded-md w-full border border-gray-700 text-white"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-4 py-2 rounded-xl font-semibold text-black ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-white hover:bg-gray-200"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        <Toaster position="top-center" />
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
