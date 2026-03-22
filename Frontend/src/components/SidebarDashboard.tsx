import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { academy, learning2, logo, purchase2, sellet } from '../assets'
import { FaChevronDown } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useUser } from '../Context/UserContext'

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SidebarDashboard: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [academyOpen, setAcademyOpen] = useState(false)
  const navigate = useNavigate()

  const { isAdmin } = useUser();

  console.log('Admin status in SidebarDashboard:', isAdmin); // Debug log to check admin status
  

  // console.log(isAdmin)
  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard/academy") ||
      location.pathname.startsWith("/dashboard/course-management")
    ) {
      setAcademyOpen(true);
    }
  }, [location.pathname]);

  const handleAcademyClick = (target: string) => {
    const tutorId = localStorage.getItem('tutorToken');
    setOpen(false)

    if (tutorId) {
      // If tutorId exists, navigate to academy-management or course-management
      if (target === 'overview') navigate('/dashboard/academy-management')
      if (target === 'course') navigate('/dashboard/course-management')
      if (target === 'submit') navigate('/dashboard/submitted-courses')
    } else {
      // If tutorId doesn't exist, go to signup
      navigate('/signup-tutor')
    }
  }


  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
  fixed lg:static top-0 left-0 border-r border-white/5 h-full w-64 lg:w-fit lg:h-[100vh] bg-black text-white z-50
  transform lg:translate-x-0 transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="p-6 space-y-2">
          <img src={logo} className='lg:hidden block' alt="" />

          {/* Learning */}
          <NavLink
            to="/dashboard"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition flex items-center mb-2 gap-2 
    ${isActive ? 'bg-green-500 text-black font-semibold' : 'hover:bg-[#009C00]'}`}
          >
            <img src={learning2} alt="" /> Learning
          </NavLink>

          {/* Academy */}
          <div>
            <button
              onClick={() => setAcademyOpen(!academyOpen)}
              className="w-full px-4 py-2 rounded-md transition flex items-center justify-between mb-2 hover:bg-[#009C00]"
            >
              <div className="flex items-center gap-2">
                <img src={academy} alt="" />
                Academy
              </div>

              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${academyOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Submenu */}
            <div
              className={`overflow-hidden transition-all duration-300 ${academyOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <button
                onClick={() => handleAcademyClick('overview')}
                className="block ml-10 py-2 text-sm rounded-md w-full text-left text-white/70 hover:text-white"
              >
                Academy Overview
              </button>

              <button
                onClick={() => handleAcademyClick('course')}
                className="block ml-10 py-2 text-sm rounded-md w-full text-left text-white/70 hover:text-white"
              >
                Course Management
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleAcademyClick('submit')}
                  className="block ml-10 py-2 text-sm rounded-md w-full text-left text-white/70 hover:text-white"
                >
                  Course Submission
                </button>
              )}
            </div>
          </div>

          {/* My Purchase */}
          <NavLink
            to="#"
            onClick={(e) => {
              e.preventDefault();
              toast("Coming Soon 🚀", { icon: "⏳" });
              setOpen(false);
            }}
            className="block px-4 py-2 rounded-md transition flex items-center mb-2 gap-2 hover:bg-[#009C00]"
          >
            <img src={purchase2} alt="" /> My Purchase
          </NavLink>

          {/* Seller */}
          <NavLink
            to="#"
            onClick={(e) => {
              e.preventDefault();
              toast("Coming Soon 🚀", { icon: "⏳" });
              setOpen(false);
            }}
            className="block px-4 py-2 rounded-md transition flex items-center mb-2 gap-2 hover:bg-[#009C00]"
          >
            <img src={sellet} alt="" /> Seller
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default SidebarDashboard