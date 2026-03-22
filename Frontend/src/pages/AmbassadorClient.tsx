import { useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import Board from "../components/Board";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../confiq";
import { homedot } from "../assets";

interface DecodedToken {
  id: string;
  username: string;
  img: string;
  exp: number;
}

export default function AmbassadorClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"Task" | "Leaderboard">("Task");
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    if (user) {
      console.log("User has been set:", user);
    }
  }, [user]);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const username = searchParams.get("username");
    const img = searchParams.get("img");
    const id = searchParams.get("id");

    // If token exists in URL, save it
    if (urlToken && username && img && id) {
      localStorage.setItem("ambassador_token", urlToken);
      localStorage.setItem("ambassador_img", img);
      setUser({ username, img, id, token: urlToken });
      setIsConnected(true);
      // console.log(user);

      window.history.replaceState({}, document.title, "/ambassador");
      return;
    }
    // Else check if token exists in localStorage
    const storedToken = localStorage.getItem("ambassador_token");
    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);

        // Token expiry check
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("ambassador_token");
          setIsConnected(false);
        } else {
          setUser({
            username: decoded.username,
            img: decoded.img,
            id: decoded.id,
            token: storedToken,
          });
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("ambassador_token");
      }
    }
  }, [searchParams]);

  const tabs = ["Task", "Leaderboard"];

  return (
    <div className="bg-[linear-gradient(180deg,_#160057_0%,_#181A1D_100%)]  text-white">
      <Navbar />

      <div className="flex flex-col justify- min-h-[80vh] itc mt-10 z-10 gap-4 items-center">
        <img src={homedot} className="absolute -z-0 left-12 md:left-12 w-18 md:w-20 top-0" alt="" />
        <img src={homedot} className="absolute right-12 md:right-12 top-0 w-18 md:w-20" alt="" />
        <h2 className="text-[42px] lg:mt-8 lg:text-7xl text-center text- heading-color font-bold self-center">
          Become An Ambassador
        </h2>

        <p className="text-[14px]  lg:text-2xl text-gray-400 text-center w-[60%]">
          Top the ambassador table by performing tasks and earning points
        </p>

        {!isConnected ? (
          <>
            <button
              className="bg-blue-main cursor-pointer text-white p-3 px-6 rounded-md"
              onClick={() => {
                window.location.href = `${API_URL}/auth/auth/twitter`;
              }}
            >
              Connect with X (Twitter)
            </button>

            <div className="mt-8 opacity-60">
              <Tasks preview={true} />
            </div>
          </>
        ) : (
          <>
            <div className="flex p-2 border   gap-3 border-gray-700 rounded-lg mt-6">
              {tabs.map((tab) => (
                <p
                  key={tab}
                  className={`cursor-pointer text-sm px-4 py-2 rounded-lg ${selectedTab === tab
                    ? "bg-blue-main text-gray-300"
                    : "text-gray-500"
                    }`}
                  onClick={() => setSelectedTab(tab as "Task" | "Leaderboard")}
                >
                  {tab}
                </p>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full -mt-8 mb-8"
              >
                {selectedTab === "Task" ? <Tasks /> : <Board />}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
