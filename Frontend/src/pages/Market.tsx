import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { purchases } from '../data';

const Market: React.FC = () => {
  return (
    <>
      <div className="bg-black min-h-[80vh] flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-col py-8 items-center px-4 lg:px-16">
          {/* Page Title */}
          <div className="flex flex-col items-center text-center max-w-[400px] lg:max-w-[800px]">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
              Practical Job Tools for Web3 Careers
            </h1>
            <p className="text-stone-400 text-sm sm:text-base lg:text-lg pt-2 pb-6 max-w-[350px] sm:max-w-[400px] lg:max-w-[700px]">
              Access carefully crafted templates, scripts, and assets to help you stand out, pitch yourself better, and apply like a pro.
            </p>
          </div>

          {/* Grid of Purchases */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  gap-6 md:gap-8 lg:gap-6 justify-items-center mt-6">
            {purchases.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-[280px]  md:w-full flex flex-col justify-between bg-[#111111] p-4 rounded-xl border border-[#232323]"
              >
                <img
                  className="rounded-md pb-2 w-full object-cover"
                  src={item.image}
                  alt={item.heading}
                />
                <h3 className="text-md font-medium pl-0 text-white">{item.heading}</h3>
                <ul className="text-xs text-stone-400 list-disc list-outside pl-4 py-2 space-y-1">
                  <li>{item.list1}</li>
                  <li>{item.list2}</li>
                  <li>{item.list3}</li>
                </ul>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <p className="text-xs text-white">
                      File Type: {item.file_type} + {item.file_type2}
                    </p>
                    {/* <p className="text-xs flex items-center gap-2">
                      Price: {item.price}
                      <span className="text-red-500 line-through">{item.oldprice}</span>
                    </p> */}
                  </div>
                  <button className="text-xs bg-white py-2 px-4 text-black font-bold rounded-full hover:bg-gray-200 transition">
                    FREE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Market;