import { motion } from "framer-motion";

const SuccessPopup = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-[999]"
    >
      <div className="bg-[#0f0f0f] border border-green-500 p-6 py-12 rounded-2xl max-w-sm text-center shadow-xl">
        <h2 className="text-green-400 font-bold text-xl mb-2">
          🎉 You're on the Waitlist!
        </h2>

        <p className="text-white/70 text-sm">
          Email registered successfully. <br />
          Continue exploring BlockHub 🚀
        </p>
      </div>
    </motion.div>
  );
};

export default SuccessPopup;