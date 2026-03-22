import React, { useEffect, useState } from "react";
import { arrow, logo } from "../assets";
import { useNavigate } from "react-router";

const NavbarAcad: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Failed to parse user", err);
            }
        }
    }, []);

    return (
        <div className="flex items-center border-b border-white/5 justify-between text-white px-6 py-4 bg-black">

            {/* Left */}
            <div className="flex items-center gap-8">
                <img src={logo} onClick={() => navigate('/')} alt="logo" className="w-38" />

                {/* Center */}
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                    <p className="text-sm text-white/80">Back to Profile</p>
                    <img src={arrow} alt="" className="w-3 rotate-180" />
                </div>

                {user && (
                    <div className="flex items-center gap-2">
                        <img
                            src={user.profile_image || user.profileImage || "/default-avatar.png"}
                            alt="user"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <p className="text-sm font-medium">
                            {user.name || `${user.firstName || ""} ${user.lastName || ""}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarAcad;