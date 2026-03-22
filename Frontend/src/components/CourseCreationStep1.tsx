import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arrow } from "../assets";
import { MdOutlineFileUpload } from "react-icons/md";
import { apiRequest } from "../utils/apiRequest";


interface Props {
    courseData: any;
    setCourseData: React.Dispatch<React.SetStateAction<any>>;
}

const CourseCreationStep1: React.FC<Props> = ({
    courseData,
    setCourseData,
}) => {
    const [openLevel, setOpenLevel] = useState(false);
    const [openTag, setOpenTag] = useState(false);

    const levels = ["Beginner", "Intermediate", "Advanced"];

    const tags = [
        // Frontend & User Experience
        "DApps", "UI/UX", "Wallets", "Onboarding", "Gamification",

        // Backend / Smart Contracts
        "Smart Contracts", "Solidity", "Oracles", "Blockchain APIs",

        // Development / Full Stack
        "Web3 Development", "Ethereum", "Layer 2",

        // Crypto & DeFi
        "Crypto", "DeFi", "Tokenomics", "Staking", "NFTs",

        // Emerging & Future Trends
        "Metaverse", "Social Tokens", "Decentralized Identity"
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        });
    };

    

    let thumbnailSrc = "";

    if (!courseData.thumbnail) {
        thumbnailSrc = "";
    } else if ("url" in courseData.thumbnail && courseData.thumbnail.url) {
        // uploaded file
        thumbnailSrc = courseData.thumbnail.url;
    } else if ("file" in courseData.thumbnail && courseData.thumbnail.file instanceof File) {
        // local file
        thumbnailSrc = URL.createObjectURL(courseData.thumbnail.file);
    } else if (courseData.thumbnail instanceof File) {
        // directly a File (draft restore)
        thumbnailSrc = URL.createObjectURL(courseData.thumbnail);
    } else {
        thumbnailSrc = "";
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // preview locally while uploading
            setCourseData({
                ...courseData,
                thumbnail: { file },
            });

            // prepare FormData
            const formData = new FormData();
            formData.append("file", file);

            // upload to API
            const res = await apiRequest("/upload", {
                method: "POST",
                body: formData,
                isFormData: true,
            });

            if (res.success && res.data?.file) {
                // replace File object with uploaded file data
                setCourseData((prev: any) => ({
                    ...prev,
                    thumbnail: {
                        url: res.data.file.url,
                        id: res.data.file.id, // needed for deletion
                        name: file.name
                    }
                }));
            } else {
                // handle failed upload
                console.error("Thumbnail upload failed");
            }
        }
    };
    const handleFileDelete = async () => {
        if (!courseData.thumbnail || !courseData.thumbnail.id) {
            // nothing to delete yet (maybe it's just a local file)
            setCourseData({ ...courseData, thumbnail: null });
            return;
        }

        const res = await apiRequest("/delete-file", {
            method: "DELETE",
            body: { id: courseData.thumbnail.id },
        });

        if (res.success) {
            setCourseData({ ...courseData, thumbnail: null });
        } else {
            console.error("Failed to delete thumbnail");
        }
    };
    const handleSelect = (key: string, value: string) => {
        setCourseData({ ...courseData, [key]: value });
    };

    return (
        <div className="space-y-6 w-full">
            <h1 className="text-white text-xl font-semibold">Course Details</h1>

            {/* Wrap main course details & thumbnail for desktop */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Left column: Course name & overview */}
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-white/70 text-sm">Course Name</label>
                        <input
                            name="name"
                            value={courseData.name}
                            onChange={handleChange}
                            placeholder="Enter course name"
                            className="border outline-none border-[#232323] rounded-lg py-3 px-3 bg-transparent text-white text-sm w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white/70 text-sm">Course Overview</label>
                        <textarea
                            name="overview"
                            value={courseData.overview}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Enter course overview"
                            className="border outline-none border-[#232323] rounded-lg py-3 px-3 bg-transparent text-white text-sm w-full"
                        />
                    </div>
                </div>

                {/* Right column: Thumbnail */}
                <div className="flex-1 flex flex-col relative">
                    <label className="text-white/70 text-sm mb-2">
                        Upload course thumbnail
                    </label>

                    <label
                        htmlFor="file-upload"
                        className="flex flex-col md:flex-row items-center justify-center border-2 border-dashed border-[#232323] rounded-xl py-6 px-4 cursor-pointer hover:border-green-500 transition-colors bg-[#030303] text-white w-full"
                    >
                        <MdOutlineFileUpload className="w-6 h-6 text-white/40 mr-3 mb-2 md:mb-0" />

                        <div className="text-center md:text-left">
                            <p className="text-sm font-medium">
                                {courseData.thumbnail
                                    ? typeof courseData.thumbnail === "string"
                                        ? "Thumbnail uploaded"
                                        : courseData.thumbnail.name
                                    : "Click or drag file to upload"}
                            </p>
                            {!courseData.thumbnail && (
                                <p className="text-xs text-white/50">
                                    Supported formats: jpg, png, jpeg
                                </p>
                            )}
                        </div>

                        <input
                            id="file-upload"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {thumbnailSrc && (
                        <div className="mt-4 flex flex-col items-center">
                            <img
                                src={thumbnailSrc}
                                alt="Thumbnail Preview"
                                className="w-full h-40 object-cover rounded-xl border border-white/20 shadow-lg"
                            />
                            <button
                                type="button"
                                onClick={handleFileDelete}
                                className="mt-2 text-red-500 text-sm hover:underline"
                            >
                                Delete Thumbnail
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tag & Level */}
            <div className="border border-[#232323] bg-[#030303] rounded-xl p-6 space-y-4 w-full">
                <h2 className="text-white font-medium">Tag & Level</h2>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                    {/* Level Dropdown */}
                    <div className="flex-1 flex flex-col relative">
                        <label className="text-white/70 text-sm">Course Level</label>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full"
                        >
                            <div
                                onClick={() => setOpenLevel(!openLevel)}
                                className="border border-[#232323] rounded-lg py-3 px-3 bg-transparent text-white text-sm flex justify-between items-center cursor-pointer w-full"
                            >
                                {courseData.level || "Select level"}
                                <img src={arrow} alt="" className="w-4 h-4 ml-2" />
                            </div>

                            <AnimatePresence>
                                {openLevel && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 w-full bg-[#111] border border-[#232323] rounded-lg mt-1 z-10 overflow-hidden"
                                    >
                                        {levels.map((lvl) => (
                                            <li
                                                key={lvl}
                                                onClick={() => {
                                                    handleSelect("level", lvl);
                                                    setOpenLevel(false);
                                                }}
                                                className="px-3 py-2 text-white hover:bg-green-700/20 cursor-pointer text-sm"
                                            >
                                                {lvl}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Tag Dropdown */}
                    <div className="flex-1 flex flex-col relative">
                        <label className="text-white/70 text-sm">Course Tag</label>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full"
                        >
                            <div
                                onClick={() => setOpenTag(!openTag)}
                                className="border border-[#232323] rounded-lg py-3 px-3 bg-transparent text-white text-sm flex justify-between items-center cursor-pointer w-full"
                            >
                                {courseData.tag || "Select tag"}
                                <img src={arrow} alt="" className="w-4 h-4 ml-2" />
                            </div>

                            <AnimatePresence>
                                {openTag && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 w-full bg-[#111] border border-[#232323] rounded-lg mt-1 z-10 overflow-hidden"
                                    >
                                        {tags.map((tag) => (
                                            <li
                                                key={tag}
                                                onClick={() => {
                                                    handleSelect("tag", tag);
                                                    setOpenTag(false);
                                                }}
                                                className="px-3 py-2 text-white hover:bg-green-700/20 cursor-pointer text-sm"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Social Handles (Optional) */}
            <div className="border border-[#232323] bg-[#020202] rounded-xl p-6 space-y-4 w-full">
                <h2 className="text-white font-medium text-white/80">Social Handle (Optional)</h2>

                <div className="flex flex-col">
                    <label className="text-white/60 text-sm">Twitter</label>
                    <input
                        type="text"
                        placeholder="Enter your Twitter or X link"
                        value={courseData.twitter || ""}
                        onChange={e =>
                            setCourseData((prev: any) => ({ ...prev, twitter: e.target.value }))
                        }
                        className="border border-[#232323] rounded-lg py-3 px-3 bg-transparent text-white text-sm w-full"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white/60 text-sm">Website</label>
                    <input
                        name="website"
                        value={courseData.website}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="border border-[#232323] rounded-lg py-3 px-3 bg-transparent text-white text-sm w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseCreationStep1;