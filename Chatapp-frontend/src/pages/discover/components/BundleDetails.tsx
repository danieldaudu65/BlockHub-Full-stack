import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Arrow__ } from "../../../assets";
import Bundle2Note from "../../../data/BundleNote2";
import Bundle3Note from "../../../data/BundleNote3";
import Bundle4Note from "../../../data/BundleNote4";
import Bundle5Note from "../../../data/BundleNote5";
import Bundle6Note from "../../../data/BundleNote6";

// Map noteKey to React components
const notesMap: Record<string, React.ReactNode> = {
  "bundle-2": <Bundle2Note />,
  "bundle-3": <Bundle3Note />,
  "bundle-4": <Bundle4Note />,
  "bundle-5": <Bundle5Note />,
  "bundle-6": <Bundle6Note />,
};

const BundleDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const noteKey = location.state?.noteKey;
  const topic = location.state?.topic || "No topic available";
  const note = noteKey ? notesMap[noteKey] : <p>No note available</p>;

  return (
    <div className="bg-[#1D1C1F] pt-6 text-white min-h-screen">
      <div onClick={() => navigate(-1)} className="flex p-4 items-center gap-1.5 mb-4 cursor-pointer">
        <img src={Arrow__} alt="arrow" />
        <h2 className="text-white font-semibold">Back</h2>
      </div>

      <div className="bg-[#141414] py-6 px-4 rounded">
        <h1 className="text-lg mb-4 underline text-gray-500">{topic}</h1>
        <div className="prose  max-w-none">{note}</div>
      </div>
    </div>
  );
};

export default BundleDetail;
