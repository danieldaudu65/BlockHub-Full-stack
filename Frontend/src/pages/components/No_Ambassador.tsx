import React from 'react';
import { noAmb } from '../../assets';

const No_Ambassador:React.FC = () => {
  return (
 <div className='flex flex-col items-center justify-center m-8 mb-24'>
      <img src= {noAmb} alt="" />
      <h3 className='font-semibold'>No ambassador</h3>
      <p className='text-white/40 text-sm'>You would find list of ambassador here</p>

      {/* <button className='bg-blue-800 p-3 rounded-lg py-1.5 my-4'>Create new task</button> */}
    </div>
  );
}

export default No_Ambassador;
