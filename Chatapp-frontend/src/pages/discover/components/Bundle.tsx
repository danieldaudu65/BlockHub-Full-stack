import React from "react";
import { Arrow__, bundlebg } from "../../../assets";
import { useNavigate } from "react-router-dom";
// import Bundle2Note from "../../../data/BundleNote2";
// import Bundle3Note from "../../../data/BundleNote3";
// import Bundle4Note from "../../../data/BundleNote4";
// import Bundle5Note from "../../../data/BundleNote5";

// Define the type for items
interface Item {
  id: string;
  details: string;
}

const Bundle: React.FC = () => {
  const navigate = useNavigate();
  const items: Item[] = [
    { id: "bundle-1", details: "Curated list of 2,000+ early-stage Web3 projects to pitch your skills and land opportunities." },
    { id: "bundle-2", details: "Ready-to-use pitch templates tailored to your niche for higher response rates from founders." },
    { id: "bundle-3", details: "Premium follow-up sequences for devs, community managers, and content creators to stay top-of-mind." },
    { id: "bundle-4", details: "Step-by-step guide on giving value first before asking, with examples of engagement strategies and mini plans." },
    { id: "bundle-5", details: "Guide on asking for payment professionally in Web3 roles with examples of hourly, retainer, and hybrid models." },
    { id: "bundle-6", details: "The Psychology of Founders for Jobbers" }];

  const handleClick = (item: Item, idx: number) => {
    if (idx === 0) {
      navigate("projects");
    } else {
      // Pass only serializable data
      navigate(`/bundle/${item.id}`, { state: { noteKey: item.id, topic: item.details } });
    }
  };

  return (
    <div className="pt-6 bg-[#1D1C1F] rounded">
      <div onClick={() => navigate(-1)} className="flex p-4 items-center gap-1.5 mb-4 cursor-pointer">
        <img src={Arrow__} alt="arrow" />
        <h2 className="text-white font-semibold">Market</h2>
      </div>

      <div className="bg-[#141414] h-[100vh] p-4">
        <div className="mt-4 grid gap-2 rounded">
          {items.map((item, idx) => (
            <div key={item.id} className="flex rounded-xl py-4 px-2 relative border border-[#1D1C1F] bg-[#181819] flex-col mb-3">
              <p className="text-gray-300 text-left mt-2 mb-2 text-sm">{item.details}</p>
              <img src={bundlebg} className="absolute right-0 -top-5 opacity-30" alt="" />
              <button
                onClick={() => handleClick(item, idx)}
                className="text-[#96FF96] z-10 mt-4 py-4 rounded-lg w-full border border-[#009C004D] bg-[#151515] text-xs underline hover:text-blue-300"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bundle;
