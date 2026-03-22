import interestData from '../../data/interestData'
import { Img as Image } from 'react-image';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '../../confiq';
import { ClipLoader } from 'react-spinners';
import { FaArrowLeft } from 'react-icons/fa';


export default function SelectInterest() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromProfile = location.state && location.state.from === 'profile';

  const handleInterestClick = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  }

  const submitInterests = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/user_onboard/add-interesr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          interests: selectedInterests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Interests saved successfully!');
      navigate('/upload-portfolio');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save interests.');
    } finally {
      setLoading(false);
    }
  };


  const handleEditInterest = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/user_profile/edit_interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          interest: selectedInterests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Interests saved successfully!');
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save interests.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col">

      {/* Header */}
      {!cameFromProfile ?
        (
          <div className="flex justify-between items-center p-4">
            <Link to="/welcome">
              <FaArrowLeft className="text-xl transition-colors ease-in-out duration-150 hover:text-blue-main" />
            </Link>
            <div className="flex gap-2">
              <div className="w-6 h-1 bg-blue-main rounded-full"></div>
              <div className="w-6 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        ) : (

          // Conditional header when the user visits from their profile page by clicking the edit button
          <div className="text-sm flex justify-between items-center p-5">
            <div
              onClick={() => navigate(-1)}
              className="flex gap-2 items-center cursor-pointer hover:text-secondary-main"
            >
              <FaArrowLeft
                className="transition-colors ease-in-out duration-150"
              />
              <span>Back</span>
            </div>
            <span
              onClick={handleEditInterest} /* for now,will use a robust function later */
              className='text-secondary-main cursor-pointer'
            >
              Save
            </span>

          </div>
        )}


      {/* Main content */}
      <div className="flex flex-col w-full p-4">
        <div className='mb-5'>
          <h2 className='text-2xl font-semibold mb-2'>Select what interests you</h2>
          <p className='text-gray-400 text-sm'>
            Select what Best describes what you are <br />
            looking for.
          </p>
        </div>

        <div className='flex-grow'>
          {
            interestData.map((item, index) => (
              <div key={index} className='bg-zinc-900 mb-3 rounded-2xl'>
                <div className='flex items-center gap-1 mb-5'>
                  <Image
                    src={item.categoryIcon}
                    alt="Verified check"
                    className="w-6"
                  />
                  <h4>{item.category}</h4>
                </div>
                <div className='flex-wrap flex items-center gap-3'>
                  {
                    item.subItems.map((role, ind) => (
                      <button
                        key={ind}
                        onClick={() => handleInterestClick(role.label)}
                        className={` cursor-pointer transition-colors ease-in-out duration-200
                                  p-3 text-sm rounded-xl ${selectedInterests.includes(role.label)
                            ? 'bg-blue-main'
                            : 'bg-zinc-800 hover:bg-blue-700'
                          }`}
                      >
                        {role.label}
                      </button>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/* Sticky Bottom button */}
      {!cameFromProfile &&
        // Conditional Sticky Bottom button only applies in onboarding
        <div>
          <button
            onClick={submitInterests}
            className="bg-blue-main w-full p-2 text-center rounded-lg text-white font-medium hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Get Started'}
          </button>
        </div>
      }


    </div >
  );
}
