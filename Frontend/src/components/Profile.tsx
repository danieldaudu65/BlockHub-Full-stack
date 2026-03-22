import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile:React.FC = () => {

    const navigate = useNavigate()
    return (
        <div>
            <button className='' onClick={() => navigate('/ambassador')}>Leaserboard</button>
        </div>
    );
}

export default Profile;
