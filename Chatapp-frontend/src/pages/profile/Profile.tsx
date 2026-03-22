import React, { useState } from 'react';
import Downbar from '../../components/Downbar';
// import interestData from '../../data/interestData'
import ProfileNav from './components/ProfileNav';
import ProfileContent from './components/ProfileContent';
import EditPortfolioModal from './components/EditPortfolioModal';



const Profile:React.FC = () => {

const [isEditPortfolioOpen, setIsEditPortfolioOpen] = useState<boolean>(false);
  const handleEditPortfolioOpen = () => {
    setIsEditPortfolioOpen(prev => !prev);
  }

  // Placeholder user data for the EditPortfolioModal
  const currentUser = {
      cvs: [ 
        { name: 'my_cv_blockchain_architect.pdf', id: 1, url: 'http://example.com/cv1.pdf' },
        { name: 'my_cv_web_developer.pdf', id: 2, url: 'http://example.com/cv2.pdf' }, 
      ], 
  };

  return (
    <div className="bg-neutral-900 py-14 min-h-screen">
      <ProfileNav />
      <ProfileContent user={currentUser} handleEditPortfolio={handleEditPortfolioOpen} />
      {isEditPortfolioOpen && <EditPortfolioModal onClose={() => setIsEditPortfolioOpen(false)} user={currentUser}/>}
      <Downbar />
    </div>
  )    
};

export default Profile;
