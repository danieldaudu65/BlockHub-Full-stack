// components/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  FaBars } from "react-icons/fa";
import { useState } from "react";
import { adminpfp, arrow, home, logo, tasks } from "../assets";

export default function Sidebar() {

  const navigate = useNavigate()
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);


  const SIDEBAR_LINKS = [
    {
      label: "Dashboard",
      href: "/home",
      icon: home,
    },
    {
      label: "Task management",
      href: "/home/task",
      icon: tasks,
      children: [
        { label: "Tasks overview", href: "/home/task/overview" },
        { label: "Completed Tasks", href: "/home/task/submitted" }
      ]
    },
  ];


  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden w-[100vw]  text-white flex py-1 justify-between items-center p-4">
        <div className="flex gap-3 items-center">

          <button onClick={() => setOpen(!open)}>
            <FaBars className="w-6 h-6" />
          </button>
          <img src={logo} className="w-" alt="Logo" />
        </div>
        <div className="flex items-center">
          <img src={adminpfp} className="-mr-4" alt="" />

          <p className="text-xs hidden lg:block">Ahm 334@88</p>
          <img src={arrow} alt="" />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`z-50 bg-[#161616] text-white fixed lg:static top-0 left-0 h-full w-[80%] lg:w-fit transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col items-start gap-10 p-6">
          <Link to="/">
            <img alt="App Logo" className="" src={logo} />
          </Link>

          <nav className="flex flex-col items- w-full justify-center gap-2">
            {SIDEBAR_LINKS.map((link, index) => {
              const isActive = location.pathname.endsWith(link.href);
              const isExpanded = expandedNav === link.label;

              return (
                <div key={link.href} className="w-full">
                  <button
                    onClick={() => {
                      if (index === 0) {
                        navigate(link.href); // Navigate directly for the first item
                        setOpen(false); // optional: close sidebar on mobile
                      } else {
                        setExpandedNav(isExpanded ? null : link.label); // Toggle submenu
                      }
                    }}
                    className={`group w-full text-left ${isActive ? "bg-blue-main" : ""} hover:bg-blue-main py-5 rounded-lg px-4 flex items-center gap-2 transition-all duration-300`}
                  >
                    <div className="relative flex w-7 h-7">
                      <img src={link.icon} alt="" />
                    </div>
                    <span className="text-md font-light capitalize flex-1">
                      {link.label}
                    </span>
                    {link.children && (
                      <span className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <img src={arrow} alt="" />
                      </span>
                    )}
                  </button>

                  {/* Sub-links */}
                  {isExpanded && link.children && (
                    <div className="ml-10 mt-2 flex flex-col gap-2">
                      {link.children.map((child) => {
                        const isChildActive = location.pathname.includes(child.href);
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`text-sm px-2 py-1 rounded-md hover:bg-blue-main ${isChildActive ? "bg-blue-main" : ""}`}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}


          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-[] backdrop-blur-xs bg-opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
