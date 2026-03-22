import React, { useState, useEffect } from "react";
import downbar from "../data/downbar";
import { Img as Image } from "react-image";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Upslider from "../pages/create/components/Upslider";

const Downbar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean | null>(false);


  useEffect(() => {
    const index = downbar.findIndex((bar) => pathname.startsWith(bar.link));
    setActiveIndex(index !== -1 ? index : 0);
  }, [pathname]);

  return (
    <div className="flex justify-around w-full bottom-0 bg-[#151718] fixed py-4 px-4 shadow-md z-50">
      {downbar.map((bar, index) => {
        const isHovered = hoverIndex === index;
        const isActive = activeIndex === index;
        const isReactIcon = bar.icon === "plus";

        return (
          <Link
            to={bar.link}
            key={index}
            className="flex gap-1 flex-col items-center cursor-pointer"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {isReactIcon ? (
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center transition duration-300 ${isActive || isHovered ? "bg-white text-gray-900" : "bg-[#292D32] text-white-main"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(!showModal);
                }}
              >
                <FaPlus
                  className="text-sm"
                />
              </div>
            ) : (
              <Image
                src={isActive || isHovered ? bar.icon_hover || bar.icon : bar.icon}
                alt={bar.label}
                className="w-7 h-7 transition duration-300 ease-in-out"
              />
            )}

            <span
              className={`text-xs mt-1 transition-colors duration-300 ${isActive || isHovered ? "text-white" : "text-white-main"
                }`}
            >
              {bar.label}
            </span>
          </Link>
        );
      })}

      {showModal && <Upslider onClose={() => setShowModal(false)} />}

    </div>
  );
};

export default Downbar;
