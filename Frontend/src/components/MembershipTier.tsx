import { membership_tier } from '../data';
import { motion } from 'framer-motion';

const MembershipTier = () => {
  return (
    <div
      className="flex flex-col items-start justify-center p-4 lg:px-40 py-12 text-white h-fit pb-24"
      style={{
        background: "linear-gradient(200deg, #000 0%, #000 40%, #0a1f0f 80%, #000 95%)"
      }}



    >
      <div className="lg:w-[35%]">
        <h1 className="text-2xl lg:text-5xl font-semibold mb-6">
          Empowering projects and experts to thrive.
        </h1>
        <p className="text-stone-400 lg:text-[16px] text-sm">
          Discover exciting Web3 opportunities, apply for jobs, and grow your network in one place.
        </p>
      </div>

      <div className="w-full flex my-12">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-14 w-full  jub">
          {membership_tier.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-full rounded-xl "
            >
              {/* ROLLING LIGHT EFFECT */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div
                  className="animate-border-roll absolute inset-0 border-[3px] border-transparent rounded-xl"
                  style={{ animationDuration: `${1 + index * 0.3}s` }}
                ></div>
              </div>


              {/* BORDER BACKGROUND */}
              <div className="rounded-xl p-[2px] bg-gradient-to-br from-[#48FF75] to-[#000]">
                <div className="min-h-[300px] rounded-xl bg-black flex flex-col justify-between py-10 gap-8 px-6">
                  <img className="text-[32px] w-32 mb-20 font-bold" src={item.image} alt="" />

                  <div className="text-left">
                    <p className="font-semibold mb-2">{item.heading}</p>
                    <p className="text-[14px] text-stone-500 w-[250px]">{item.desc}</p>
                  </div>
                </div>
              </div>

              <style >{`
    @keyframes border-roll {
      0% {
        border-color: transparent;
        box-shadow: 0 0 0px transparent;
      }
      25% {
        border-top-color: white;
        box-shadow: 0 -2px 10px white;
      }
      50% {
        border-right-color: white;
        box-shadow: 2px 0 10px white;
      }
      75% {
        border-bottom-color: white;
        box-shadow: 0 2px 10px white;
      }
      100% {
        border-left-color: black;
        box-shadow: -2px 0 10px white;
      }
    }

    .animate-border-roll {
      animation: border-roll 3s linear infinite;
    }
  `}</style>
            </motion.div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipTier;
