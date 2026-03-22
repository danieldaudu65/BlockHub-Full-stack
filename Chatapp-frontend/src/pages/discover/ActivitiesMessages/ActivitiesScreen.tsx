import React, { useEffect, useState } from 'react';
import { PiArrowLeftFill } from 'react-icons/pi';
// import NotificationList from './components/NotificationList';
import JobList from './components/JobList';
import DirectMessageList from './components/DirectMessageList';
import { useNavigate } from 'react-router-dom';
import NotificationHandler from './components/NotificationHandlier';
import { API_URL } from '../../../confiq';
import CLiploader from '../../../components/CLiploader';

type ActiveTab = 'Notification' | 'Jobs' | 'Direct message';

interface ActivitiesData {
  hasJobs: boolean;
  hasNotifications: boolean;
}

const ActivitiesScreen: React.FC = () => {
  const [hasJobs, setHasJobs] = useState<boolean>(false);
  // const [hasNotifications, setHasNotifications] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('Notification');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    fetch(`${API_URL}/user_activity/check_activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data: ActivitiesData = await res.json();
        if (!res.ok) {
          throw new Error(data ? JSON.stringify(data) : 'Failed to fetch activities');
        }
        if (isMounted) {
          setHasJobs(data.hasJobs);
          // setHasNotifications(data.hasNotifications);

          // If user has no jobs and active tab is Jobs, switch to Notification
          setActiveTab((prevTab) => (data.hasJobs ? prevTab : 'Notification'));
        }
      })
      .catch((err) => {
        console.error('Failed to check activities:', err);
        // Optionally: toast.error('Failed to load activities');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
    
      <CLiploader />
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      {/* Header */}
      <div onClick={() => navigate(-1)} className="flex items-center p-4 py-6 bg-[#181A1D] cursor-pointer">
        <PiArrowLeftFill size={24} className="text-white mr-4" />
        <h1 className="text-xl">Activities</h1>
      </div>

      {/* Tabs */}
      <div className="space-x-6 px-4 mt-2 border-gray-700 ">
        <button
          onClick={() => setActiveTab('Notification')}
          className={`flex-1 text-center py-3 text-md font-medium relative transition-colors duration-200 ${
            activeTab === 'Notification' ? 'text-secondary-main' : 'text-gray-500'
          }`}
        >
          Notification
          {activeTab === 'Notification' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full"></div>
          )}
        </button>

        {hasJobs && (
          <button
            onClick={() => setActiveTab('Jobs')}
            className={`flex-1 text-center py-3 text-md font-medium relative transition-colors duration-200 ${
              activeTab === 'Jobs' ? 'text-secondary-main' : 'text-gray-500'
            }`}
          >
            Jobs
            {activeTab === 'Jobs' && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full"></div>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab('Direct message')}
          className={`flex-1 text-center py-3 text-sm font-medium relative transition-colors duration-200 ${
            activeTab === 'Direct message' ? 'text-secondary-main' : 'text-gray-500'
          }`}
        >
          Direct message
          {activeTab === 'Direct message' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full"></div>
          )}
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="p-4">
        {activeTab === 'Notification' && <NotificationHandler />}
        {activeTab === 'Jobs' && <JobList />}
        {activeTab === 'Direct message' && <DirectMessageList />}
      </div>
    </div>
  );
};

export default ActivitiesScreen;
