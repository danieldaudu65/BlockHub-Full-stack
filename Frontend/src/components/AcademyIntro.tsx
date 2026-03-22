import React from 'react'
import { human } from '../assets'
import { useNavigate } from 'react-router'
import { API_URL } from '../confiq'

const AcademyIntro: React.FC = () => {

    const navigate = useNavigate()

    const handleProtectedNavigation = (
        redirectPath: string,
        state?: any,
        source?: "continueAcademy" | "newAcademy"
    ) => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
            // 🔥 Open Twitter Auth in a new tab with dynamic source
            window.open(
                `${API_URL}/auth/auth/twitter?source=${source || "academy"}`,
                "_blank",
                "noopener,noreferrer"
            );
            return;
        }

        // ✅ If authenticated
        navigate(redirectPath, { state });
    };

    return (
        <div className='text-white px-4 h-[90vh] text-center md:text-left md:h-auto'>
            <div className='md:max-w-6xl md:mx-auto md:flex md:items-center md:gap-12'>

                <div className='md:flex-1'>
                    <div className='text-3xl font-bold my-4 md:text-5xl md:leading-tight'>
                        <p>Master Web3 Skills.</p>
                        <p>Land Real Opportunities</p>
                    </div>

                    <p className='text-white/50 mb-3 md:text-lg md:max-w-md'>
                        Guided Day 1–Day 100 roadmap, curated courses, and real projects.
                    </p>

                    <div className='space-y-1 md:space-y-0 md:flex md:gap-4 md:mt-8'>

                        {/* Continue */}
                        <button
                            onClick={() =>
                                handleProtectedNavigation("/dashboard", {
                                    fromIntro: true,
                                    new: false,
                                }, "continueAcademy")
                            }
                            className='flex cursor-pointer bg-[#151515] rounded-3xl mt-10 w-full py-3 justify-center text-center md:mt-0 md:w-44'
                        >
                            Continue
                        </button>

                        {/* Start Learning */}
                        <button
                            onClick={() =>
                                handleProtectedNavigation("/academy/courses", {
                                    fromIntro: true,
                                    new: true,
                                }, "newAcademy")
                            }
                            className='flex cursor-pointer w-full py-3 justify-center text-center bg-white text-black rounded-3xl font-bold my-2 md:my-0 md:w-44'
                        >
                            Start Learning
                        </button>

                    </div>
                </div>

                <div className='mt-12 md:mt-0 md:flex-1 md:flex md:justify-end'>
                    <img
                        src={human}
                        alt=""
                        className='w-full md:max-w-md'
                    />
                </div>

            </div>
        </div>
    )
}

export default AcademyIntro