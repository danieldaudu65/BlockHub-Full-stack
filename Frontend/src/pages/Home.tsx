import { photo } from "../assets";
import FeaturedJobs from "../components/FeaturedJobs";
import Footer from "../components/Footer";
import HIW from "../components/HIW";
import MembershipTier from "../components/MembershipTier";
import Navbar from "../components/Navbar";
import Skill from "../components/Skill";
import Team from "../components/Team";
import Question from "../components/Question";
import { VscArrowRight } from "react-icons/vsc";
import FloatingTagsCircle from "../components/FloatingTags";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../confiq";
import { useEffect, useState } from "react";

// import FloatingTags from "../components/FloatingTags";

export default function Home() {

  const navigate = useNavigate()

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  return (
    <div className=" bg-black overflow-hidden">
      <div className="
  relative
  min-h-[100vh]
  flex flex-col
  lg:bg-[radial-gradient(circle_at_100%_50%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]
  bg-[radial-gradient(circle_at_50%_120%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]
">

        <Navbar />
        <div className=" lg:px-40 flex lg:flex-row md:flex-col     text-center text-white h-[80vh] w-full ">

          <FloatingTagsCircle />

          <div className="lg:w-1/2 flex flex-col lg:mt-20 md:mt-auto   gap-4 items-start  h-full  ">
            <div className="lg:block mt-16 lg:w-fit lg:mt-0 flex w-full justify-center items-center">
              <div className="flex gap-2 bg-[#151515] p-1 rounded-lg justify-center items-center">

                <img className="lg:w-18 w-12" src={photo} sizes="18" alt="" />
                <p className="text-[14px] text-stone-400">Join the Community</p>
                <VscArrowRight />
              </div>
            </div>
            <h2 className="lg:text-7xl text-4xl text-center  text-white font-bold lg:text-left     ">
              Find Web3 Jobs and  Projects easily.
            </h2>
            <p className=" text-sm  px-4 lg:p-0 lg:text-xl text-center lg:pr-24 mt-2 text-stone-400 lg:text-left indent-0">
              Discover exciting Web3 opportunities, apply for jobs, and
              grow your network in one place.
            </p>
            <div className="flex items-center w-full justify-center mt-4 lg:hidden gap-4">
              <button
                onClick={() => navigate('/documentations')}
                className="bg-[#151515] cursor-pointer  text-[12px] rounded-3xl px-8  py-3.5 font-bond ">
                Explore Docs
              </button>
              {token ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-white cursor-pointer py-3 px-8 rounded-3xl text-black font-bold text-sm"
                >
                  Hub Dashboard
                </button>
              ) : (
                <button
                  className="bg-white cursor-pointer py-3 px-8 rounded-3xl text-black font-bold text-sm"
                  onClick={() => {
                    window.location.href = `${API_URL}/auth/auth/twitter?source=website`;
                  }}
                >
                  Join with X
                </button>
              )}


            </div>
            <div className="lg:flex w-f hidden gap-4">
              <button
                onClick={() => navigate('/documentations')}
                className="bg-[#151515] cursor-pointer  text-sm rounded-3xl px-12  py-3 font-bond ">
                Explore Docs
              </button>
              {token ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-white cursor-pointer py-3 px-8 rounded-3xl text-black font-bold text-sm"
                >
                  Hub Dashboard
                </button>
              ) : (
                <button
                  className="bg-white cursor-pointer py-3 px-8 rounded-3xl text-black font-bold text-sm"
                  onClick={() => {
                    window.location.href = `${API_URL}/auth/auth/twitter?source=website`;
                  }}
                >
                  Join with X
                </button>
              )}

            </div>
          </div>

        </div>
        {/* <div className="top-0 right-0 absolute ">
          <img className=" " src={green} alt="" />
          <img
            className="  right-0  "
            src={lightgreen}
            alt=""
          />

        </div> */}
      </div>
      <HIW />
      <MembershipTier />
      <Skill />
      <FeaturedJobs />
      <Team />
      <Question />
      <Footer />
    </div>
  );
}
