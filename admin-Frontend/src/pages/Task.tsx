import React from 'react';
import { Outlet } from 'react-router-dom';

const Task:React.FC = () => {
  return (
    <div className="text-white p-2">
      <Outlet /> 
    </div>
  );
};

export default Task;
