import { wave } from "../../assets";
import { top_opp_cards } from '../../data/top_oppurtunities'
import { Img as Image } from 'react-image';
import { logoWhite } from '../../assets/';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();

  const image = localStorage.getItem("user_image");
  // const paidbundle = localStorage.getItem("TB");
  // const token = localStorage.getItem("token"); 
  const username = localStorage.getItem("user_username"); // ✅ retrieve user image
  // const name = localStorage.getItem("user_name"); 

  const loggin = localStorage.getItem('logged_in')

    
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const name = queryParams.get("name");
    const username = queryParams.get("username");
    const image = queryParams.get("image");
    const loggin = queryParams.get("firstLogin")
    const id = queryParams.get("id")
    const paidbundle = queryParams.get("paidbundle")
    const paidportfolio = queryParams.get("paidportfolio")

    if (loggin) {
      localStorage.setItem('logged_in', loggin)

    }
    if (token) {
      localStorage.setItem("token", token);
    }
    if (name) {
      localStorage.setItem("user_name", name);
    }
    if (username) {
      localStorage.setItem("user_username", username);
    }
    if (image) {
      localStorage.setItem("user_image", image);
    }
    if (id) {
      localStorage.setItem("user_id", id);
    }
    if (paidbundle) {
      localStorage.setItem("paidbundle", paidbundle);
    }
    if (paidportfolio) {
      localStorage.setItem("paidportfolio", paidportfolio);
    }

    // Clean the URL (remove query params) without reloading
    if (location.search) {
      navigate("/welcome", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center gap-38 justify-end py-10">
      <Image
        src={wave}
        alt="Welcome Background"
        className="absolute w-full object-cover z-0"
      />
      <div className='z-4 flex '>
        <Image
          src={logoWhite}
          alt="Onboarding Background"
          className="w-5 mx-[1px]"
        />
        <span className="font-semibold">lockHub</span>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <div>
          <p className="text-4xl md:text-5xl font-semibold text-white mb-1 leading-tight">
            Welcome
          </p>
          <div className="flex justify-center items-center space-x-1 mb-2">
            <Image src={image || top_opp_cards[0].avatar} alt={top_opp_cards[0].name} width={25} height={25} className="rounded-full" />
            <p className="text-xs text-center text-gray-400">{username || top_opp_cards[0].handle}</p>
          </div>
        </div>

        <p className="text-center mb-3 text-gray-300">
          Let's  know   what  interest  you, so we can provide <br />
          the  best experience  for  you.
        </p>

        <Link
          to={loggin ? "/discover" : "/select-interest"}
          className="bg-blue-main w-full p-3 text-sm py-2.5 px-6 rounded-md text-white font-medium hover:bg-blue-700 transition"
        >
          Continue
        </Link>

      </div>
    </div>
  );
}
