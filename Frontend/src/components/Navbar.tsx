import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { logo, discord, times, lock, bar, twitter, telegram, youtube, arrow } from '../assets/index';
import { logo, times, lock, bar, arrow } from '../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, getToken } from '../confiq';
import ModalWrapper from './modalParent';
import Profile from './Profile';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate()
  const navLinks: { label: string; path: string; external?: boolean }[] = [
    // { label: "Jobs", path: "https://app.blockhubglobal.xyz/", external: true },
    { label: "Academy", path: "/academy" },
    { label: "Marketplace", path: "/market" },
    { label: "Documentation", path: "/documentations" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];


  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user in localStorage");
        localStorage.removeItem("user");
      }
    }
  }, []);
  const userImage = user?.profileImage || user?.image || null;

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };

    // Update on mount
    updateUser();

    // Update if localStorage changes (rare for same-tab)
    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {

      const token = getToken();

      if (!token) {
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) throw new Error(data.message || "Error fetching tasks");
        // setTasks(data);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, []);

  return (
    <nav className="w-full bg-transparent jusb p-4 lg:px-40 z-50">
      <div className="flex items-center justify-between">
        <div className='flex items-center w-full justify-between '>

          <div className=' flex gap-22 '>
            <div className='flex gap-2'>
              {userImage && (
                <button onClick={() => setIsOpen(true)}>
                  <img
                    src={bar}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
              )}

              <img src={logo} alt="Logo" className="lg:w-52   w-36" />

            </div>
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center  gap-3  text-sm text-white  ">
              <div className="md:flex gap-6  text-white  ">
                {navLinks.map((item, index) =>
                  item.external ? (
                    <a key={index} href={item.path} target="_blank" rel="noopener noreferrer" className=" hover:text-[#03a003]  text-lg transition ">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={index} to={item.path} className="hover:text-[#03a003] text-lg transition">
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className='lg:flex hidden  items-center gap-12'>

            {
              !user && <button className=" bg-[#282C32] text-gray-300 flex items-center space-x-2  border-white px-8 py-3 rounded-3xl text-xs">
                {/* <img src={lock} alt="Lock" className="opacity-50" width={18} height={18} /> */}
                <p> Connect with X( twitter )</p>
              </button>
            }


            {user ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setModal(false); navigate('/profile') }}>
                <img
                  src={userImage}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <img src={arrow} alt="arrow" />
              </div>
            ) : (<></>)}

          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex gap-2">

          {
            user ?
              <>
                <div className="flex items-center cursor-pointer" onClick={() => { setModal(false); navigate('/profile') }}>
                  <img src={userImage} className="rounded-full z-30" alt="" />
                  <img src={arrow} alt="arrow" />
                </div>

              </>
              :
              // <Link className='rounded-md bg-blue-main text-white text-xs py-2.5 px-3' to={'/project/68a334efcce805962c7cf90d'}>
              //   {/* Connect with X(Twitter) */}
              // </Link>
              <></>
          }
          {
            user ? <></>
              :
              <button onClick={() => setIsOpen(true)}>
                <img src={bar} alt="Menu" width={30} height={30} />
              </button>
          }
        </div>
      </div>
      {/* Sidebar Menu for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { x: '-100%' },
              show: {
                x: 0,
                transition: {
                  type: 'tween',
                  ease: 'easeInOut',
                  duration: 0.4,
                  when: 'beforeChildren',
                  staggerChildren: 0.15,
                },
              },
              exit: { x: '-100%' },
            }}
            className="fixed top-0 left-0 z-50 w-full h-full bg-black text-white flex flex-col justify-between"
          >
            <div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="flex justify-between p-6"
              >
                <img src={logo} alt="Logo" className="lg:w-52   w-36" />
                <button onClick={() => setIsOpen(false)}>
                  <img src={times} alt="Close" width={30} height={30} />
                </button>
              </motion.div>

              <div className="flex flex-col mt-12 px-6 space-y-6 text-lg text-[#ffffff92]">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    {item.external ? (
                      <a href={item.path} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.path} onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  className='w-full flex justify-center flex-col gap-6'
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <button className="flex items-center space-x-2 w-full bg-[#282C32] text-center justify-center font-bold  rounded-4xl px-4 py-2 ">
                    <img src={lock} alt="Lock" className="opacity-50" width={20} height={20} />
                    <p>Connect Wallet (Soon)</p>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Social Icons */}
            {/* <motion.div
              className="flex justify-center mb-10 gap-6"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[twitter, telegram, youtube, discord].map((icon, index) => (
                <motion.div
                  key={index}
                  className="bg-[#9277FF26] p-4 rounded-2xl"
                  variants={{
                    hidden: { scale: 0.6, opacity: 0 },
                    show: { scale: 1, opacity: 1 },
                  }}
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src={icon} alt={`icon-${index}`} />
                  </a>
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>
      <ModalWrapper onClose={() => setModal(false)} isOpen={modal === true} >
        <Profile />
      </ModalWrapper>
    </nav>
  );
};

export default Navbar;
