import React from "react";

interface TabsProps {
  section: string;
  current: string;
  subCurrent?: string; // 👈 optional
  onSectionClick: () => void;
}

const Tabs: React.FC<TabsProps> = ({
  section,
  current,
  subCurrent,
  onSectionClick,
}) => {
  return (
    <div
      className={`text-white px-6 lg:px-0 py-4 ${subCurrent ? "text-xs" : "text-sm"
        } flex items-center`}
    >
      {/* Section */}
      <span
        onClick={onSectionClick}
        className="flex items-center gap-1 cursor-pointer text-green-400 hover:text-green-300 font-medium transition"
      >
        {section}
        <span className="text-xs lg:hidden">↩</span>
      </span>

      <span className="mx-2">{">"}</span>

      {/* Current */}
      <span className={subCurrent ? "cursor-pointer hover:text-green-300 transition" : "font-semibold"}>
        {current}
      </span>

      {/* If third level exists */}
      {subCurrent && (
        <>
          <span className="mx-2">{">"}</span>
          <span className="font-semibold">
            {subCurrent}
          </span>
        </>
      )}
    </div>
  );
};

export default Tabs;