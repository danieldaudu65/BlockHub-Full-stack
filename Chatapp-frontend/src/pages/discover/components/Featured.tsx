import { featured_oppurtunity } from '../../../data/Feaured';
import { Img as Image } from 'react-image';
// import React from 'react';
import Slider from 'react-slick';

const Featured:React.FC = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
  };

  return (
    <div className="m-6 mx-3 mt-6 p-2">
      <h2 className="text-white text font-semibold mb-4">🔥 Featured Opportunity</h2>

      <Slider {...settings}>
        {featured_oppurtunity.map((card, index) => (
          <div key={index}>
            <div className="min-h-[240px] h-[280px] w-full flex flex-col justify-between rounded-lg p-4 border border-neutral-800 text-white bg-[#1e1e1e]">
              <p className={`${
                card.type === 'Project' ? 'bg-blue-main' : 'bg-secondary-main'
              } text-xs text-white px-3 py-1 rounded-md w-fit mb-3`}>
                {card.type}
              </p>

              <div className="flex items-center space-x-4 mb-2">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{card.name}</p>
                  <p className="text-xs text-gray-400">{card.handle}</p>
                </div>
              </div>

              <div className="flex mt-5 flex-col flex-1">
                <p className="font-medium text-sm mb-1">{card.title}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {card.description.split(" ").slice(0, 20).join(" ")}...
                </p>
                <button className="mt-auto w-full bg-blue-main hover:bg-blue-700 transition text-white py-2 rounded-md text-sm font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Featured;
