import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../confiq";
// import   Projects  from "../data/UserProjects"; // ✅ singular Project
import Pagination from "./components/Pagination";
import { bolt, pp } from "../assets";
import CLiploader from "../components/CLiploader";

interface DecodedToken {
  id: string;
  username: string;
  img: string;
  exp: number;
}

export interface Projects {
  id: string;
  name: string;
  profile: string;
  hashtags: string;
  desc: string;
  participants: number;
  active_tasks: number;
  participant_icon: string;
  task_icon: string;
  compensation: string
}

export default function UserProjects() {
  const [isConnected, setIsConnected] = useState(false);
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Projects[]>([]); // ✅ Project[], not Projects[]
  const [loading, setLoading] = useState(true);

  const [currentProjectsPage, setCurrentProjectsPage] = useState(1);

  const itemsPerPage = 9;

  const paginatedProjects = projects.slice(
    (currentProjectsPage - 1) * itemsPerPage,
    currentProjectsPage * itemsPerPage
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/ambassador_dashboard/get_projects`);
        const data = await res.json();
        console.log(data);

        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
      window.history.replaceState({}, document.title, "/projects");
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


  return (
    <div className="bg-neutral-900 text-white">
      <Navbar />
      <div className="flex flex-col justify- min-h-[80vh] z-10 gap-4 items-center">
        <div className="w-full p-6 lg:flex lg:justify-between lg:items-center">
          <div>
            <h2 className="text-[32px] mb-1 lg:mb-4 lg:mt-8 lg:text-5xl text- heading-color font-bold">
              GrindFi Hub
            </h2>
            <p className="text-[14px] mb-4 lg:text-lg text-gray-400">
              Professional pathways to turn consistency into rewards
            </p>
          </div>

          {
            !isConnected ? <button
              className="bg-blue-main cursor-pointer text-white p-3 px-6 rounded-md"
              onClick={() => {
                navigate("register");
              }}
            >
              Create your project
            </button>
              :
              <></>
          }

        </div>


        <>
          {loading ? (
            <CLiploader />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 p-6 pt-0 gap-5 lg:gap-7 rounded-lg text-gray-300">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    navigate(`/grindfi/${project.id}`, { state: { projectParticipant: project.participants }});
                  }}
                  className="flex flex-col space-y-4 bg-zinc-900 border border-gray-600 p-5 rounded-2xl cursor-pointer hover:opacity-70"
                >
                  <div className="flex justify-between items-center gap-1 text-gray-100">
                    <div className="flex gap-2 items-center">
                      <img src={project.profile} className="w-12 h-12  rounded-full mr-2" alt={project.name} />
                      <h3>{project.name}</h3>
                    </div>
                    <p className="text-sm text-gray-300">
                      💰 {project.compensation || "0"}

                    </p>
                  </div>
                  <p>{project.desc}</p>
                  <div className="flex gap-3 text-xs justify-between">
                    <button className="bg-zinc-800 flex rounded-lg w-1/2 px-3 py-2 te items-center">
                      <img
                        className="w-5 mt-1 mr-1"
                        src={pp}
                        alt={project.name}
                      />{" "}
                      {project.participants} participants
                    </button>
                    <button className="flex bg-zinc-800 w-1/2 rounded-lg px-3 py-2 m items-center">
                      <img
                        className="w-4 mr-1"
                        src={bolt}
                        alt={project.name}
                      />
                      {project.hashtags} hashtags
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>

        <Pagination
          currentPage={currentProjectsPage}
          totalItems={projects.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentProjectsPage(page)}
        />
      </div>
      <Footer />
    </div>
  );
}
