import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import SuccessPopup from "./SuccessPopup ";
import { API_URL } from "../confiq";


const WaitlistPopup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasJoined = sessionStorage.getItem("waitlist_joined");

    if (!hasJoined) {
      setTimeout(() => setShow(true), 1200);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/user_waitlist/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // ✅ ONLY EMAIL
      });

      const data = await res.json();

      // ✅ SUCCESS OR ALREADY EXISTS → treat same UX
      if (res.ok || data.message?.includes("already")) {
        sessionStorage.setItem("waitlist_joined", "true");

        setShow(false);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* MAIN POPUP */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-2"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md bg-[#0f0f0f] border border-green-500/30 rounded-2xl p-4 relative shadow-2xl"
            >
              {/* Close */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-3 right-3 text-white/50 hover:text-white"
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl ,b-4 text-white/80 font-bold">
                  Get Early Access to BlockHub Academy
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  Join the waitlist and be among the first builders inside.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border bg-black/20 border-green-500/40 text-white text-sm focus:outline-none focus:border-green-400"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold p-3 rounded-xl transition"
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                </button>
              </form>

              {/* Subtle trust line */}
              <p className="text-xs text-stone-500 mt-3 text-center">
                No spam. Just alpha, updates & opportunities.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {showSuccess && <SuccessPopup />}
      </AnimatePresence>
    </>
  );
};

export default WaitlistPopup;