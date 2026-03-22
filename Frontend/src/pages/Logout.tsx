import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout:React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear everything in localStorage
    localStorage.clear();

    // (Optional) Clear sessionStorage too
    sessionStorage.clear();

    // You could also hit your backend logout endpoint here if needed
    // fetch("/api/logout", { method: "POST", credentials: "include" });

    // ✅ Redirect to login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Logging you out...</p>
    </div>
  );
};

export default Logout;
