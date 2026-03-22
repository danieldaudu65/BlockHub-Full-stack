import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
  return (

    <section className="flex lg:flex-row flex-col text-gray-200 h-screen w-full  bg-[#181819] overflow-hidden">

      <div className=''>
        <Sidebar />
      </div>
      <main className="flex p-4 flex-col flex-1 overflow-hidden">
        <section className="flex-1 lg:px-10 py-4 slim-scrollbar overflow-y-auto">
          <Outlet />
        </section>

      </main>
    </section>

  )
}

export default Home;
