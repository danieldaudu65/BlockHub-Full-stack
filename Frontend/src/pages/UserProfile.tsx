import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { arrow2, backarr, bolt2, cup, ellipse, twitterH } from "../assets";
import { profileLink } from "../data/profileLink";
import Footer from "../components/Footer";
import { FiLogOut } from "react-icons/fi";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get("token");
    const encodedUser = params.get("user");

    // ✅ Case 1: User coming from Twitter redirect
    if (token && encodedUser) {
      try {
        const decodedUser = JSON.parse(
          atob(decodeURIComponent(encodedUser))
        );

        // ✅ Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decodedUser));

        // ✅ Set state
        setUser(decodedUser);

        // ✅ Clean URL
        navigate("/profile", { replace: true });
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


  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear(); // remove everything
    setShowLogoutModal(false);
    navigate("/"); // redirect to home
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };


  // Helper function
  const displayHandle = (handle: string) => {
    if (!handle) return "";

    // If it's a LinkedIn URL, extract the username part
    if (handle.includes("linkedin.com/in/")) {
      const parts = handle.split("linkedin.com/in/");
      return parts[1]?.split("/")[0] || handle;
    }

    // Otherwise return as-is
    return handle;
  };


  return (
    <div className=" bg-black overflow-hidden"> <div className=" relative min-h-[100vh] flex flex-col lg:bg-[radial-gradient(circle_at_100%_50%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)] bg-[radial-gradient(circle_at_50%_120%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)] ">      <Navbar />

      <div className="p-4 lg:px-60 text-white">
        <div className="flex text-sm justify-between">
          <div className="flex gap-2 items-center cursor-pointer">
            <img src={backarr} alt="back" />
            <p>Back</p>
          </div>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 font-semibold"
          >
            Logout
          </button>
        </div>

        {user && (
          <>

            <div className="border hidden items-center lg:flex border-[#1818195e] rounded-xl px-2 relative mt-2 py-8">

              <img src={ellipse} className="absolute rounded-br-xl right-0 bottom-0" alt="" />
              <img
                src={user.profileImage || "https://robohash.org/random-user.png?size=200x200"}
                alt={user.fullName || "No Profile Image"}
                className="w-40 h-40 mr-12 rounded-full object-cover"
                onError={(e) => {
                  // Fallback in case the image fails to load
                  (e.currentTarget as HTMLImageElement).src = "https://robohash.org/random-user.png?size=200x200";
                }}
              />
              <div className="mt-8 items-start  flex flex-col gap-4">

                <div>
                  <h2 className="text-xl font-bold">{user.fullName}</h2>
                  <p className="text-gray-400">{displayHandle(user.twitterHandle)}</p>
                </div>
                <div className="flex  items-start mt-2 gap-4 ">


                  <div className="flex gap-2 items-center j"><
                    img src={bolt2} alt="" />
                    <p > Score: {user.total_points}</p>
                  </div>
                  <div className="flex gap-2 items-center j"><
                    img src={cup} alt="" />
                    <p > Leaderboard: {user.leaderBoard_no || 0}</p>
                  </div>
                  <div className="flex gap-2 items-center j"><
                    img src={twitterH} alt="" />
                    <p > Tweets: {user.tweetCount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border lg:hidden border-[#1818195e] rounded-xl px-2 relative mt-2 py-2">

              <img src={ellipse} className="absolute rounded-br-xl right-0 bottom-0" alt="" />
              <div className="mt-8 items-start  flex items-center gap-4">
                <img
                  src={user.profileImage || "https://robohash.org/random-user.png?size=200x200"}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://robohash.org/random-user.png?size=200x200";
                  }}
                />

                <div>
                  <h2 className="text-xl font-bold">{user.fullName}</h2>
                  <p className="text-gray-400">{displayHandle(user.twitterHandle)}</p>
                </div>
              </div>
              <div className="flex  items-start mt-2 gap-4 grid-cols-2">

                <div >

                  <div className="flex gap-2 items-center j"><
                    img src={bolt2} alt="" />
                    <p > Score: {user.total_points}</p>
                  </div>
                  <div className="flex gap-2 items-center j"><
                    img src={cup} alt="" />
                    <p > Leaderboard: {user.leaderBoard_no || 0}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center j"><
                  img src={twitterH} alt="" />
                  <p > Tweets: {user.tweetCount}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-3">
          <p> Do more with blockhub </p>
          <p className="flex text-[#aaaaaac2]">Pick a path to discover more.</p>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {profileLink.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.link === "dashboard/academy-management") {
                  const tutorId = localStorage.getItem("tutorToken");
                  if (tutorId) {
                    navigate(`/${item.link}`);
                  } else {
                    navigate("/signup-tutor");
                  }
                } else {
                  navigate(`/${item.link}`);
                }
              }}
              className="flex border lg:py-12 cursor-pointer relative border-[#232323] bg-[#0a0a0a71] items-center gap-4 rounded-xl p-4 py-8 hover:bg-[#0f0f0f] transition"
            >
              <div className="bg-[#00000040] w-fit h-fit p-2 rounded-lg">
                <img src={item.icon} alt={item.label} className="w-7 h-6" />
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold">{item.label}</h3>
                <p className="text-sm text-white/40">{item.disc}</p>
              </div>

              <img src={arrow2} alt="" className="absolute lg:w-fit right-0 opacity-30" />
            </div>
          ))}
        </div>

      </div>

      {/* Logout Modal */}
      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-50 
               animate-fadeIn"
        >
          <div className="bg-black border border-white/5 rounded-lg w-full m-6 text-center text-white space-y-4
                    animate-scaleUp relative overflow-hidden">

            {/* Icon at the top */}
            <div className="flex justify-center mt-4">
              <FiLogOut className="text-4xl text-[#047a04] animat" />
            </div>

            <p className="text-lg font-semibold p-6 pt-3">Are you sure you want to logout?</p>

            <div className="flex w-full justify-around mt-2">
              <button
                onClick={confirmLogout}
                className="bg-[#047a04] w-full hover:bg-red-400 px-6 py-4 rounded-bl-lg font-semibold transition-transform transform hover:scale-105"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-[#042704] w-full hover:bg-gray-600 px-6 py-4 rounded-br-lg font-semibold transition-transform transform hover:scale-105"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
