import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabs from "../components/Tabs";
import SidebarDashboard from "../components/SidebarDashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import NavbarAcad from "../components/NavbarAcad";

const Dashboard: React.FC = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
   

    console.log(user)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const encodedUser = params.get("user");

        // ✅ Case 1: Coming from Twitter redirect
        if (token && encodedUser) {
            try {
                const decodedUser = JSON.parse(atob(decodeURIComponent(encodedUser)));

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(decodedUser));

                setUser(decodedUser);

                // Clean URL
                navigate("/dashboard", { replace: true });
                return;
            } catch (err) {
                console.error("Failed to decode user:", err);
            }
        }

        // ✅ Case 2: Normal page reload → restore from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [location, navigate]);


    let subCurrent: string | undefined;
    const path = location.pathname;
    const isCoursePage = path.includes("/dashboard/course/");

    let section = "Learning";
    let current = "Overview";

    // Detect main dashboard routes
    if (path === "/dashboard") {
        section = "Learning";
        current = "Overview";
    }

    if (path === "/dashboard/purchase") {
        section = "My Purchase";
        current = "Overview";
    }

    if (path === "/dashboard/academy-management") {
        section = "Academy";
        current = "Overview";
    }

    if (path === "/dashboard/sellers") {
        section = "Seller";
        current = "Overview";
    }

    if (path.startsWith("/dashboard/academy")) {
        section = "Academy";
        current = "Overview";
    }
    if (path.startsWith("/dashboard/course-management")) {
        section = "Academy";
        current = "Course Management";
    }

    if (path.startsWith("/dashboard/course-management/create-course")) {
        section = "Academy";
        current = "Course Management";
        subCurrent = "Create Course";
    }

    if (path.startsWith("/dashboard/course-management/submit-course")) {
        section = "Academy";
        current = "Course Management";
        subCurrent = "Propose Course";
    }

    if (isCoursePage) {
        const id = location.pathname.split("/").pop();
        const foundCourse = courses.find((c) => c.id === id);

        if (foundCourse) {
            const title = foundCourse.title;
            current =
                title.length > 12
                    ? title.slice(0, 12) + "..."
                    : title;
        }
    }

    return (
        <div className="relative min-h-[100vh] flex flex-col
        bg-[radial-gradient(circle_at_50%_120%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]"
        >

            <div className="lg:hidden block">

                <Navbar />
            </div>
            <div className="lg:block hidden">

                <NavbarAcad />
            </div>



            <div className="lg:hidden">
                <Tabs
                    section={section}
                    current={current}
                    subCurrent={subCurrent}
                    onSectionClick={() => {
                        if (isCoursePage) {
                            navigate("/dashboard");
                        } else {
                            setOpen(true);
                        }
                    }}
                />c
            </div>

            <div className="flex flex-1">
                <SidebarDashboard open={open} setOpen={setOpen}  />

                
                <div className="flex-1 bg-black min-h-[80vh] px-4 py-6 relative lg:h-[calc(100vh-80px)]  overflow-x-hidden lg:overflow-y-auto">
                    {/* Desktop Tabs */}
                    <div className="hidden lg:block mb-6">
                        <Tabs
                            section={section}
                            current={current}
                            subCurrent={subCurrent}
                            onSectionClick={() => {
                                if (isCoursePage) {
                                    navigate("/dashboard");
                                } else {
                                    setOpen(true);
                                }
                            }}
                        />
                    </div>

                    <Outlet />

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
