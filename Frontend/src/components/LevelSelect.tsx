import React, { useState } from "react";
import {  Filter } from "lucide-react";

const levels = ["Beginners", "Intermediate", "Advance"];

const LevelSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Beginner");

  return (
    <div className="relative w-40">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          items-center
          justify-between
          bg-[#0A0A0A]
          text-xs
          text-[#757575]
          px-4
          py-2.5
          rounded-lg
          border
          border-white/10
          hover:bg-white/5
          transition
        "
      >
        <Filter className="mr-2" size={14} />
        {selected}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="
          absolute
          z-50
          mt-2
          w-full
          bg-[#0A0A0A]
          border
          border-green-main/30
          rounded-xl
          overflow-hidden
          shadow-xl
        ">
          {levels.map((level) => (
            <div
              key={level}
              onClick={() => {
                setSelected(level);
                setOpen(false);
              }}
              className="
                px-4
                py-2
                text-xs
                border border-white/5
                text-[#96FF96]
                hover:bg-green-main/10
                cursor-pointer
                transition
              "
            >
              {level}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LevelSelect;
