import React, { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io";
import { API_URL } from "../confiq";
import { user } from "../assets";

interface Project {
  id: string;
  name: string;
  desc: string;
  compensation: string;
  profile: string;
  participants: number;
  hashtags: number;
}

const FeaturedJobs: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/ambassador_dashboard/get_projects`);
        // ⚠️ Replace with your production URL when deploying

        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-black relative px-4 lg:px-40 pr-4 lg:pr-8 py-8">

      <div className="md:block lg:flex justify-between text-white items-center ">
        <div>
          <h1 className="lg:text-5xl text-2xl font-semibold mb-2 text-white">
            Featured Projects
          </h1>
          <p className="text-[#ffffffa3] text[10px]">
            Discover the projects with ambassador programs!
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-white mt-10">Loading projects...</p>
      ) : (
        <div className="lg:pt-12 pt-2 grid lg:grid-cols-3 sm:grid-cols-1 gap-6 lg:gap-20 mt-12">
          {projects.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white/5 rounded-xl p-4 
                         transition-all duration-300 
                         hover:scale-[1.03] hover:bg-white/10 
                         hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              <div className="flex text-white gap-2 items-center">
                <img
                  src={item.profile || user}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = "/img/default-project.png";
                  }}
                />
                <h2 className="text-xl">{item.name}</h2>
              </div>

              <p className="text-stone-400 text-sm py-4">
                {item.desc}
              </p>

              <div className="text-stone-400 flex gap-4">
                <button className="flex items-center text-sm bg-white/15 rounded-xl font-medium p-2 gap-[4px]">
                  <IoMdContact size={20} />
                  <p>{item.participants}</p>
                </button>

                <button className="flex items-center text-sm bg-white/15 rounded-xl font-medium p-2 gap-[4px]">
                  <p>{item.hashtags}</p>
                  <span>Hashtag Tasks</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedJobs;