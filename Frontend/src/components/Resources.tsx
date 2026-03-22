import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { pdf } from "../assets"; // make sure pdf import is correct

const Resources:React.FC = () => {
    const resources = [
        {
            image: pdf,
            name: "Solidity Basics",
            size: "39kb",
            link: "#" // replace with actual download link
        },
        {
            image: pdf,
            name: "Module 2 Cheatsheet",
            size: "42kb",
            link: "#"
        },
        {
            image: pdf,
            name: "Smart Contract Template",
            size: "55kb",
            link: "#"
        }
    ];

    return (

        <div className="m-2">
            <h3 className="text-sm m-2">Resource</h3>
            <div className="space-y-3 max-w-md mx-auto">
                {resources.map((res, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 py-5 bg-black border border-white/10 rounded-md hover:bg-white/5 transition"
                    >
                        <div className="flex items-center gap-5">
                            <img src={res.image} alt={res.name} className="w-8 h-8" />
                            <div>
                                <p className="text-white text-sm font-semibold">{res.name}</p>
                                <p className="text-white/50 text-xs">{res.size}</p>
                            </div>
                        </div>
                        <a
                            href={res.link}
                            download
                            className="p-2 bg-black border border-white/5 rounded hover:scale-105 transition"
                        >
                            <HiOutlineDownload className="text-white text-xl" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
