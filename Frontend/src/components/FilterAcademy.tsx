import React, { useState } from "react";
import LevelSelect from "./LevelSelect";

const FilterAcademy: React.FC = () => {
  const categories = ["All", "Development", "Design", "Marketing", "Management"];
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex md:flex-row gap-4 lg:px-52 items-center">

      <LevelSelect />

      {/* Categories scrollable row */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-3 flex-nowrap px-2 py-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex-shrink-0
                whitespace-nowrap
                px-4
                py-2
                rounded-lg
                text-sm
                transition
                cursor-pointer
                ${
                  activeCategory === cat
                    ? "text-[#66cc66] border border-white/10 -main/10"
                    : "text-white/30 bg-[#0A0A0A] hover:text-white"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterAcademy;
