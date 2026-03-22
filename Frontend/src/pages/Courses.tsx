import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LearnGrowExcel from "../components/LearnGrowExcel";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../confiq";
import { backarr } from "../assets";

const Courses: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const encodedUser = params.get("user");

    // ✅ Case 1: User coming from Twitter redirect
    if (token && encodedUser) {
      try {
        const decodedUser = JSON.parse(atob(decodeURIComponent(encodedUser)));

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decodedUser));

        setUser(decodedUser);

        // Clean URL
        navigate("/academy/courses", { replace: true });
        return;
      } catch (err) {
        console.error("Failed to decode user:", err);
      }
    }

    // ✅ Case 2: Normal page reload → restore from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      // 🔥 Not authenticated → redirect to Twitter login in a new tab
      window.open(
        `${API_URL}/auth/auth/twitter?source=newAcademy`,
        "_blank"
      );
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [location, navigate]);

  return (
    <div
      className="relative min-h-[100vh] flex flex-col
      lg:bg-[radial-gradient(circle_at_100%_50%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]
      bg-[radial-gradient(circle_at_50%_120%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]"
    >
      <Navbar />
      <div className="flex items-center gap-2 text-white text-sm mt-4 ml-4 cursor-pointer" onClick={() => navigate("/academy")}>
        <img src={backarr} alt="" className="w-6" />
        <p>Back</p>
      </div>

      {user ? (
        <LearnGrowExcel />
      ) : (
        <p className="text-white/50 text-center mt-12">
          Redirecting to login...
        </p>
      )}

      <Footer />
    </div>
  );
};

export default Courses;