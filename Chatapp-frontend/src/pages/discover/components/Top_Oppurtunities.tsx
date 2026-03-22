import React, { useEffect, useRef, useState } from 'react';
import { Img as Image } from 'react-image';
import Slider from 'react-slick';
import Button from '../../../components/Button';
import { top_opp_cards } from '../../../data/top_oppurtunities';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiArrowLeftFill } from "react-icons/pi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { API_URL } from '../../../confiq';
import CLiploader from '../../../components/CLiploader';

interface TopOppCardType {
  _id: string;
  type: 'Job' | string;
  jobTitle: string;
  jobType?: string;
  companyDescription?: string;
  tags?: string[];
  avatar?: string;
  name?: string;
  handle?: string;
  func?: string[];
}

const Top_Oppurtunities: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const location = useLocation();
  const pathname = location.pathname;
  const top_opp_loca = pathname.includes('top-opp');
  const navigate = useNavigate();

  const [topOppCards, setTopOppCards] = useState<TopOppCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleOpportunities, setVisibleOpportunities] = useState(6);

  useEffect(() => {
    const fetchTopJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${API_URL}/user_discover/top_opportunities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTopOppCards(data.topJobs || []);
      } catch (err) {
        console.error('Error fetching top jobs:', err);
        setTopOppCards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopJobs();
  }, []);

  const handleLoadMore = () => {
    setVisibleOpportunities(prev => prev + 6);
  };

  const settings = {
    infinite: false,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 1200,
    pauseOnHover: true,
    arrows: false,
    afterChange: (current: number) => {
      const visibleCount = 1.5;
      if (current >= Math.floor(top_opp_cards.length - visibleCount)) {
        setTimeout(() => {
          sliderRef.current?.slickGoTo(0);
        }, 7000);
      }
    },
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1.5, centerMode: false },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerMode: false },
      },
    ],
  };

  if (loading) {
    return (
      <CLiploader />
    )
  }

  return (
    <>
      {top_opp_loca ? (
        <div className="p-3 relative pt-33">
          <div className='absolute top-0 left-0 w-full space-y-2'>
            <div className='flex space-x-4 h-[80px] px-3  text-xl items-center bg-[#181A1D]'>
              <PiArrowLeftFill className='text-gray-300 cursor-pointer' onClick={() => navigate(-1)} />
              <h2>Top opportunities</h2>
            </div>

            <div className='flex justify-between px-4 items-center text-gray-00'>
              <p>{topOppCards.length} results</p>
              <span className='flex justify-center items-center mx-3 bg-[#181A1D] rounded-xl'>
                <p className='pl-3'>All</p> <RiArrowDropDownFill className='text-5xl m-[-6px]' />
              </span>
            </div>
          </div>

          {topOppCards.slice(0, visibleOpportunities).map((card, index) => (
            <Link to={`/discover/top-opp/${card._id}`} key={index}>
              <div className="px-2 mb-4  cursor-pointer">
                <div className={`${card.type === 'Job' ? "min-h-[50px]" : "h-fit"} w-full flex flex-col justify-between rounded-lg p-4 border border-neutral-800 text-white bg-[#181A1D]`}>
                  <div className='flex flex-row-reverse justify-between  items-baseline-last'>
                    <p className={`${card.jobType === 'Project' ? 'bg-blue-main' : 'bg-[#3401CC]'} text-xs px-2 py-1 text-white rounded-full`}>
                      Job
                    </p>
                    {card.avatar ? (
                      <div className="flex items-center space-x-3 mb-2">
                        {/* <Image src={card.avatar} alt={card.name || ''} width={40} height={40} className="rounded-full" /> */}
                        <div>
                          <p className="font-medium text-lg">{card.jobTitle}</p>
                          <p className="text-sm text-gray-400">{card.handle}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-bold text-lg max-w-[250px] truncate">{card.jobTitle}</p>
                        {/* <p className="text-sm text-gray-400">{card.handle}</p> */}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mt-1 mb-4 justify- space-y-24 flex-1">
                    <p className="text-md mt-2  text-gray-400 line-clamp-6">
                      {card.companyDescription || card.companyDescription || ""}
                    </p>
                  </div>

                  {card.func && card.func.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {card.func.map((f, i) => (
                        <span key={i} className="text-sm bg-gray-700 text-white px-3 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                  )}

                  <div className='flex text-sm flex-wrap gap-2 mt-3'>
                    {(card.tags ?? []).map((f, i) => (
                      <p key={i} className='bg-[#34384080] p-3 rounded-xl text-gray-300'>{f}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {visibleOpportunities < topOppCards.length && (
            <div onClick={handleLoadMore} className='flex justify-center mb-4'>
              <button className="transition-colors ease-in duration-150 text-gray-300 text-md bg-zinc-900 p-2 px-6 hover:bg-blue-main rounded-lg cursor-pointer">
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="m-3 mx-3 mt-10 p-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-300">Top Opportunities</h2>
            <Link to={'/discover/top-opp'}>
              <Button text="View all" bg={false} />
            </Link>
          </div>

          <Slider ref={sliderRef} {...settings}>
            {topOppCards.map((card, index) => (
              <div key={index} className="pr-">
                <div className="min- w-full min-h-[100px] flex flex-col justify-between rounded-lg p-4 border border-neutral-800 text-white bg-[#1e1e1e]">
                  <p className={`${card.type === 'Project' ? 'bg-blue-main' : 'bg-secondary-main'} text-xs text-white px-3 py-1 rounded-full w-fit mb-3`}>
                    Job
                  </p>

                  <div className="flex items-cente space-x-5 mb-2">
                    <Image src={card.avatar || ''} alt={card.name || ''} width={40} height={40} className="rounded-full" />
                    <div>
                      <p className="text-sm font-semibold">{card.name}</p>
                      <p className="text-xs text-gray-400">{card.handle}</p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-1 justify-between flex-1">
                    <p className="font-medium  truncate max-w-[150px] text-sm mb-1">{card.jobTitle}</p>
                    <p className="text-xs truncate max-w-[200px] text-gray-400">
                      {card.companyDescription ? card.companyDescription.split(" ").slice(0, 150).join(" ") : "No description available"}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Top_Oppurtunities;
