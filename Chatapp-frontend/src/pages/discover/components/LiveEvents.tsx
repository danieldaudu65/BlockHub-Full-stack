// import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { placeholderEvents } from '../../../data/DownBarEvents';
import { Img as Image } from 'react-image';
// import { Autoplay } from "keen-slider/plugins"; // import Autoplay plugin



const LiveEvents: React.FC = () => {

  // const autoplay = useRef(null);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: {
        perView: 1.2,
        spacing: 10,
      },
      created: (slider) => {
        slider.container.addEventListener("mouseover", () => {
          (slider as any).pause();
        });
        slider.container.addEventListener("mouseout", () => {
          (slider as any).play();

        });
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2500);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );


  return (
    <div className="m-6 mx-3 mt-6 p-2 text-white">
      <div className="flex mb-4">
        <h2 className="bg-gradient-to-r from-violet-800 via-violet-600 to-violet-500 text-transparent bg-clip-text font-bold">Live events</h2>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {placeholderEvents.map((event) => (
          <div key={event.id} className="keen-slider__slide flex items-center  bg-blue-main p-2 rounded-full">

            <div className="flex -space-x-5 mr-4">
              {event.hosts.slice(0, 3).map((host, hostIndex) => (
                <Image
                  key={hostIndex}
                  src={host.avatar}
                  alt="Host"
                  className="w-13 h-13 rounded-2xl border-1 border-[#181A1D]"
                />
              ))}
            </div>

            <div className="flex flex-col ">
              <h3 className="text-white text">
                Web3 Careers Networking
              </h3>
              <span className="text-gray-400 text-sm">
                +{event.listenerCount} people
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEvents;