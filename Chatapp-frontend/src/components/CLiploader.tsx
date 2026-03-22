import React from 'react';
import { ClipLoader } from 'react-spinners';

const CLiploader:React.FC = () => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-150px)]">
            <ClipLoader size={32} color="#4F46E5" />
        </div>
    );
}

export default CLiploader;
