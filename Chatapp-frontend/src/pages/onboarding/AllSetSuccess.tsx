import { verifiedCheck, wave } from "../../assets";
import { Img as Image } from 'react-image';
import { Link } from "react-router-dom";

export default function AllSetSuccess() {

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-end justify-center">

      <Image
        src={wave}
        alt="Welcome Background"
        className="absolute w-full object-cover z-0"
      />
      <Image
      src={verifiedCheck}
      alt="Verified check"
      className="w-40 absolute top-15 z-4 mx-[1px]"
      />

      {/* Main content */}
      <div className="z-20 flex flex-col items-center text-center px-4 pb-27">
        <div>
            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-1 leading-tight">
                You are all set
            </h3>
        <p className="text-center mb-3 text-gray-300">
          You can now find job, project and see different 
          event to set you on your web3  journey.
        </p>
      </div>
      {/* Sticky Bottom button */}
      <div className='w-full border-t-1 border-neutral-800 bg-neutral-950 absolute left-0 right-0 bottom-0 flex items-center justify-center p-4'>
          <Link
            to="/discover"
            className="bg-blue-main w-full p-4 text-center rounded-2xl text-white font-medium hover:bg-blue-700 transition"
          >
            Continue
          </Link>
      </div>
    </div>
  </div>
  );
}
