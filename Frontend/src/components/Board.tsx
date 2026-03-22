import { one, score, three, two, x } from '../assets';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../confiq';
import Pagination from './Pagination';





const Board: React.FC = () => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);


  const [currentAmbassadorPage, setCurrentAmbassadorPage] = useState(1);


  const itemsPerPage = 10;



  const paginatedAmbassadors = ambassadors.slice(
    (currentAmbassadorPage - 1) * itemsPerPage,
    currentAmbassadorPage * itemsPerPage
  );
  useEffect(() => {
    const fetchAmbassadors = async () => {
      const token = localStorage.getItem("ambassador_token");

      try {
        const res = await fetch(`${API_URL}/tasks/get_ambassadors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        setAmbassadors(data);
        // console.log(data);

      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
      finally {
        setLoading(false)
      }
    };

    fetchAmbassadors();
  }, []);


  return (
    <div className='text-gray-400 lg:px-65  text-xs mt-16 m-5'>

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {paginatedAmbassadors.map((board: any, index: number) => (
            <div
              className='flex lg:px-12 lg:py-8 px-[6px] my-4  py-3 rounded-2xl border border-blue-main items-center justify-between'
              key={`${board.twitter_handle || board.username}-${index}`}
            >
              <div className='flex lg:gap-8 items-center gap-2'>
                {/* Rank */}
                <p className='text-white w-7 lg:w-12 flex justify-center'>
                  {(currentAmbassadorPage - 1) * itemsPerPage + index + 1 === 1 ? (
                    <img src={one} alt='1st' className='w-6 lg:w-12' />
                  ) : (currentAmbassadorPage - 1) * itemsPerPage + index + 1 === 2 ? (
                    <img src={two} alt='2nd' className='w-7 lg:w-12' />
                  ) : (currentAmbassadorPage - 1) * itemsPerPage + index + 1 === 3 ? (
                    <img src={three} alt='3rd' className='w-6 lg:w-12' />
                  ) : (
                    (currentAmbassadorPage - 1) * itemsPerPage + index + 1
                  )}
                </p>
                <img src={board.img} className='rounded-full w-10  lg:w-24' alt='user' />
                <div className='flex gap-2  flex-col items-start'>
                  <div className='flex gap-2 items-center'>
                    <p className='text-white truncate max-w-[50px] lg:text-[22px]'>{board.name}</p>
                    <span>&bull;</span>
                    <a target='_blank' href={`https://x.com/${board.twitter_handle}`} className='underline  truncate max-w-[50px] lg:text-[22px] cursor-pointer'>@{board.twitter_handle || board.username}</a>
                  </div>
                  <div className='flex lg:text-[22px] gap-4 items-center'>
                    <div className='flex items-center'>
                      <img src={score} alt='score' />
                      <p>Total Score : {board.total_points || 0}</p>
                    </div>
                    <div className='flex items-center'>
                      <img src={x} alt='tweet' />
                      <p>Tweets : {board.total_tweets || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Points */}
              <p className='text-white text-[14px] lg:text-[26px] '>{board.points || 0} pts</p>
            </div>
          ))}
          <Pagination
            currentPage={currentAmbassadorPage}
            totalItems={ambassadors.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentAmbassadorPage(page)}
          />
        </>
      )}

    </div >
  );
};

export default Board;
