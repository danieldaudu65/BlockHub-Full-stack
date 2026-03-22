import React, { useState } from "react";
import { Arrow__ } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { ProjectList } from "../../../data/Projects";
import Pagination from "../../../components/Pagination";
// import Pagination from "../../components/Pagination"; // adjust import path

const ProjectsList: React.FC = () => {
    const navigate = useNavigate();

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // adjust how many projects per page

    const totalItems = ProjectList.length;

    // figure out slice range
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ProjectList.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p bg-[#141414] rounded min-h-screen">
            {/* Back button */}
            <div
                onClick={() => navigate(-1)}
                className="flex bg-[#181819] p-4 py-8 items-center gap-1.5 mb-6 cursor-pointer"
            >
                <img src={Arrow__} alt="arrow" />
                <h2 className="text-white font-semibold">Back</h2>
            </div>

            {/* Heading */}
            <h2 className="text-white p-4 text-3xl font-semibold mb-6">
                2000+ early listing Projects you can pitch to.
            </h2>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-[#1D1C1F]">
                <table className="min-w-full text-xs text-left text-gray-300">
                    <thead className="bg-[#181819] text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-4  py-3">S/N</th>
                            <th className="px-4 py-3">Info</th>
                            {/* <th className="px-4 py-3">Name</th> */}
                            <th className="px-4 py-3">X Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((project, index) => {
                            const handle = project.twitter
                                .replace("https://x.com/", "")
                                .replace("?s=21", "");

                            return (
                                <tr
                                    key={project.id}
                                    className="border-b border-[#1D1C1F] hover:bg-[#1f1f1f]"
                                >
                                    <td className="bg-[#181819] py-3 px-6">
                                        {indexOfFirstItem + index + 1}
                                    </td>                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <img
                                            src={`https://unavatar.io/x/${handle}`}
                                            alt={project.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <p>

                                            {project.name}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={project.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#fff] underline hover:text-blue-300"
                                        >
                                            @{handle}
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mb-6 px-3">

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default ProjectsList;
