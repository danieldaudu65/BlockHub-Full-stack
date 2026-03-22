import { useEffect, useState } from "react";
import UserTasks from "./components/UserTasks";
import UserBoard from "./components/UserBoard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../confiq";
import { FaArrowLeft } from "react-icons/fa";
import UserProjectDetialsHeader from "./components/UserProjectDetailsHeader";
import type { Task } from "../types/Task";
import { useLocation } from 'react-router-dom';


interface DecodedToken {
  id: string;
  username: string;
  img: string;
  exp: number;
}


// interface ProjectTask {
//   _id: string;
//   title: string;
//   description: string;
//   status: string;
//   expires_at?: string;
// }

// interface LeaderboardItem {
//   _id: string;
//   completed: number;
// }

interface LeaderboardEntry {
  _id: string;
  ambassadorId: {
    _id: string;
    username: string;
    img?: string;
  };
  projectId: string;
  totalPoints: number;
  totalTasks: number;
  joinedAt: string;
  points: number
}


interface Project {
  name?: string;
  profile?: string;
  desc?: string;
  participants?: number;
  participant_icon?: string;
  active_tasks?: number;
  task_icon?: string;
  completed_tasks?: number;
  completed_icon?: string;
}

export default function UserProjectsDetails() {
  const { id: projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"Task" | "Leaderboard">("Task");
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);

  const location = useLocation();

  const { projectParticipant } = location.state || {};

  const navigate = useNavigate();
  const tabs = ["Task", "Leaderboard"];

  // Handle URL token & localStorage
  useEffect(() => {
    const urlToken = searchParams.get("token");
    const username = searchParams.get("username");
    const img = searchParams.get("img");
    const id = searchParams.get("id");

    if (urlToken && username && img && id) {
      localStorage.setItem("ambassador_token", urlToken);
      localStorage.setItem("ambassador_img", img);
      setUser({ username, img, id, token: urlToken });
      setIsConnected(true);
      window.history.replaceState({}, document.title, "/ambassador");
      return;
    }

    const storedToken = localStorage.getItem("ambassador_token");
    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);

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
      } catch {
        localStorage.removeItem("ambassador_token");
      }
    }
  }, [searchParams]);

  const fetchProjectData = () => {
    if (projectId && user?.token) {
      fetch(`${API_URL}/ambassador_tasks/pending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token, projectId }),
      })
        .then((res) => res.json())
        .then((data) => {
          const mappedTasks: Task[] = (data.tasks || []).map((t: any) => ({
            _id: t._id,
            title: t.title,
            hashtags: t.hashtags,
            description: t.description,
            status: (t.status as Task["status"]) || "not_submitted",
            points: t.points || 0,
            important: t.important || false,
            createdAt: t.createdAt || new Date().toISOString(),
            expires_at: t.expires_at,
          }));

          setProject(data.Iproject || null);
          setTasks(mappedTasks);

          const mapped: LeaderboardEntry[] = (data.leaderboard || []).map((item: any) => ({
            _id: item._id,
            ambassadorId: {
              _id: item.ambassadorId?._id || "",
              username: item.ambassadorId?.name || "unknown",
              img: item.ambassadorId?.img || "",
              twitter_handle: item.ambassadorId?.twitter_handle || "",
            },
            projectId: item.projectId || "",
            points: item.points || 0, // use points instead of totalPoints
            totalTasks: item.totalTasks || 0,
            totalPoints: item.totalPoints || 0,
            joinedAt: item.joinedAt || new Date().toISOString(),
          }));

          // Sort again on frontend just in case
          const sortedLeaderboard: LeaderboardEntry[] = mapped.sort((a, b) => b.points - a.points);

          setLeaderboard(sortedLeaderboard);
        })
        .catch((err) => console.error("❌ Error fetching tasks:", err));
    }
  };

  useEffect(() => {
    // console.log("🚀 projectId:", projectId, " user.token:", user?.token);
    fetchProjectData();

    // Set interval to fetch every 30 minutes (30 * 60 * 1000 ms)
    const interval = setInterval(() => {
      fetchProjectData();
    }, 10 * 60 * 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [projectId, user]);

  if (!projectId) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="bg-neutral-900 text-white">
      <Navbar />
      <div
        onClick={() => navigate(-1)}
        className="flex gap-2 m-5 items-center text-gray-300 cursor-pointer hover:text-secondary-main"
      >
        <FaArrowLeft />
        <span>Back</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-7 p-5">
        <UserProjectDetialsHeader project={project || undefined} projectParticipant={projectParticipant} />

        <div className="w-full flex flex-col min-h-[80vh] z-10 gap-4 items-center lg:-mt-3">

          {
            !isConnected ? <></> : <div className="w-full flex justify-between items-center">
              <h2 className="text-[16px] lg:text-2xl font-bold">
                {selectedTab === "Task" ? "Active Tasks" : "Top Ambassadors"}
              </h2>
              <div className="flex p-2 border gap-3 border-gray-700 rounded-lg">
                {tabs.map((tab) => (
                  <p
                    key={tab}
                    className={`cursor-pointer text-sm px-4 py-1 rounded-lg ${selectedTab === tab ? "bg-blue-main text-gray-300" : "text-gray-500"
                      }`}
                    onClick={() => setSelectedTab(tab as "Task" | "Leaderboard")}
                  >
                    {tab}
                  </p>
                ))}
              </div>
            </div>
          }


          {!isConnected ? (
            <>
              <button
                className="bg-blue-main mt-4 cursor-pointer text-white p-3 px-6 rounded-md"
                onClick={() => {
                  window.location.href = `${API_URL}/auth/auth/twitter`;
                }}
              >
                Connect with X (Twitter)
              </button>

              <div className="mt-8 opacity-60">
                <UserTasks projectId="" tasks={[]} preview={true} />
              </div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full -mt-8 mb-8"
              >
                {selectedTab === "Task" ? (
                  <UserTasks projectId={projectId} onTaskSubmitted={fetchProjectData} tasks={tasks} />
                ) : (
                  <UserBoard leaderboard={leaderboard} />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
