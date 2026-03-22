import { one,  score, three, two, x } from '../../assets';
import React, { useState } from 'react';
import Pagination from './Pagination';

interface LeaderboardEntry {
  _id: string;
  ambassadorId: {
    _id: string;
    username: string;
    img?: string;
    twitter_handle?: string;
  };
  projectId: string;
  totalPoints: number;
  points?: number; // <-- optional now
  totalTasks: number;
  joinedAt: string;
}

interface UserBoardProps {
  leaderboard?: LeaderboardEntry[];
}

const UserBoard: React.FC<UserBoardProps> = ({ leaderboard = [] }) => {
  const [currentAmbassadorPage, setCurrentAmbassadorPage] = useState(1);
  const itemsPerPage = 10;

  // Split top 3 and others
  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  // Paginate only the "others"
  const paginatedOthers = others.slice(
    (currentAmbassadorPage - 1) * itemsPerPage,
    currentAmbassadorPage * itemsPerPage
  );

  return (
    <div className="text-gray-400 lg:px-65 text-xs mt-16">
      {leaderboard.length === 0 ? (
        <div className="flex justify-center mt-10 text-gray-500">
          No ambassadors found
        </div>
      ) : (
        <>

          {/* 🏆 Top 3 Podium */}
          <div className="flex justify-center items-end gap-6 relative">
            {topThree.map((user, index) => {
              // Set order for podium positions
              let order = "";
              if (index === 0) order = "order-2"; // center
              if (index === 1) order = "order-3"; // right
              if (index === 2) order = "order-1"; // left

              // Set heights
              let heightClass = index === 0 ? "h-58" : index === 1 ? "h-54" : "h-50";
              let zIndexClass = index === 0 ? "z-20" : "z-10";

              // Overlap margins
              let marginStyle = {};
              if (index === 1) marginStyle = { marginLeft: "-20px" };
              if (index === 2) marginStyle = { marginRight: "-20px" };

              return (
                <div
                  key={user._id}
                  className={`flex flex-col items-center p-4 rounded-2xl shadow-lg bg-gradient-to-b from-black to-blue-900 ${heightClass} ${zIndexClass} ${order}`}
                  style={marginStyle}
                >
                  {/* Avatar and rank */}
                  <div className="relative spac">
                    <img
                      src={user.ambassadorId?.img || '/default-avatar.png'}
                      alt={user.ambassadorId?.username}
                      className="w-12 h-12  rounded-xl"
                    />
                    <img
                      src={index === 0 ? one : index === 1 ? two : three}
                      alt={`Rank ${index + 1}`}
                      className="w-8 absolute -right-3 -bottom-3 h-8"
                    />
                  </div>

                  {/* Names */}
                  <div className="mb-4 mt-2 text-center max-w-[80px] truncate">
                    <p className="font-bold text-white truncate">{user.ambassadorId?.username}</p>
                    <p className="font-bold text-gray-400 truncate">{user.ambassadorId?.twitter_handle}</p>
                  </div>

                  {/* Points / tasks */}
                  <div className="text-center flex flex-col justify-center items-center text-[8px]">
                    <p className="text-[14px] text-white mb-2">{user.points || 0} pts</p>
                    <div className="flex text-[8px] text-center">
                      <img src={score} alt="score" />
                      <p>Total Score : {user.totalPoints || 0}</p>
                    </div>
                    <div className="flex gap-1 my-1 text-center">
                      <img src={x} alt="tweet" />
                      <p>Total Tasks : {user.totalTasks || 0}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          {/* 👥 Other Ambassadors (Paginated) */}
          {paginatedOthers.map((board, index) => {
            const rank = 4 + (currentAmbassadorPage - 1) * itemsPerPage + index; // rank starts from 4
            return (
              <div
                className="flex lg:px-12 lg:py-8 px-[10px] my-4 py-3 rounded-2xl border border-blue-main items-center justify-between"
                key={`${board.ambassadorId?._id}-${index}`}
              >
                <div className="flex lg:gap-8 items-center gap-2">
                  {/* Rank */}
                  <p className="text-white w-7 lg:w-12 flex justify-center">
                    {rank}
                  </p>

                  {/* Avatar */}
                  <img
                    src={board.ambassadorId?.img || '/default-avatar.png'}
                    className="rounded-full w-10 lg:w-24"
                    alt={board.ambassadorId?.username || 'User'}
                  />

                  {/* User Info */}
                  <div className="flex gap-2 flex-col items-start">
                    <div className="flex gap-2 items-center">
                      <p className="text-white truncate max-w-[50px] lg:text-[22px]">
                        {board.ambassadorId?.username}
                      </p>
                      <span>&bull;</span>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://x.com/${board.ambassadorId?.twitter_handle || ''}`}
                        className="underline truncate max-w-[50px] lg:text-[22px] cursor-pointer"
                      >
                        {board.ambassadorId?.twitter_handle || 'unknown'}
                      </a>
                    </div>

                    <div className="flex lg:text-[22px] text-[10px] gap-4 items-center">
                      <div className="flex items-center">
                        <img src={score} alt="score" />
                        <p>Total Score : {board.totalPoints || 0}</p>
                      </div>
                      <div className="flex items-center">
                        <img src={x} alt="tweet" />
                        <p>Tasks : {board.totalTasks || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-white text-[14px] lg:text-[26px]">
                  {board.points || 0} pts
                </p>
              </div>
            );
          })}

          {/* Pagination controls for others */}
          <Pagination
            currentPage={currentAmbassadorPage}
            totalItems={others.length} // paginate only "others"
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentAmbassadorPage(page)}
          />
        </>
      )
      }
    </div >
  );
};

export default UserBoard;
