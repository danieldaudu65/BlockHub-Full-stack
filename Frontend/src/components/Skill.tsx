import React from "react";
import { purchases } from "../data";

const Skill: React.FC = () => {
  return (
    <div className="w-full bg-black text-white flex flex-col lg:flex-row md:p-12 p-4 lg:px-40 gap-12">

      {/* LEFT TEXT SECTION */}
      <div className="flex flex-col gap-6 lg:w-[30%]">
        <h1 className="text-3xl lg:text-4xl font-semibold">
          Market Place
        </h1>

        <p className="text-[15px] text-stone-400 leading-relaxed lg:w-[300px]">
          Access carefully crafted templates, scripts, and assets to help you
          stand out, pitch yourself better, and apply like a pro.
        </p>

        <button className="hidden sm:block bg-[#00BF3F] hover:bg-[#02a136] transition-all rounded-full py-2 px-6 font-bold text-white w-fit">
          Explore more
        </button>
      </div>

      {/* RIGHT – ITEMS */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-12 w-full">

        {purchases.map((item, index) => (
          <div
            key={index}
            className="w-full group rounded-xl border border-white/10 p-4 hover:border-[#00FF75]/40 transition-all duration-300 bg-black hover:bg-white/[0.03]"
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-lg">
              <img
                className="rounded-md w-full group-hover:scale-105 transition-all duration-500"
                src={item.image}
                alt=""
              />
            </div>

            {/* TEXT */}
            <h3 className="text-lg font-semibold mt-4">{item.heading}</h3>

            <ul className="text-xs text-stone-400 list-disc pl-4 my-2 mb-12 space-y-1">
              <li>{item.list1}</li>
              <li>{item.list2}</li>
              <li>{item.list3}</li>
            </ul>

            {/* FOOTER */}
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-xs">File Type: {item.file_type} + {item.file_type2}</p>
                {/* <p className="text-xs flex items-center">
                  Price: {item.price}
                  <span className="px-2 text-red-500 line-through">{item.oldprice}</span>
                </p> */}
              </div>

              <button className="text-xs bg-white py-2 px-4 text-black font-bold rounded-full hover:bg-white/80 transition-all">
                Access Is Free
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Skill;
