import React from 'react'
import { diploma2 } from '../assets'
import { FiShare2 } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";



const Certificate: React.FC = () => {
    return (
        <div className='border border-white/5 rounded-md'>

            <div className=' w-full s flex justify-center items-center h-52 '>
                <img src={diploma2} alt="" />
            </div>
            <div className='flex bg-[#151515] p-2 justify-between items-end'>
                <div>
                    <h3 className='text'>Smart Contract Security</h3>
                    <p className='text-[#AAAAAA] text-sm mt-1'>12 of 12 Completed </p>
                    <p className='text-[#AAAAAA] text-sm mt-1'> Issues on <span className='text-white'> Mar 24 , 2026</span></p>
                </div>
                <div className='flex gap-2 '>
                    <div className='rounded-md bg-black p-2 border border-white/5'>
                        < FiShare2 className='text-xl' />
                    </div>
                    <div className='rounded-md p-2 bg-[#009C00] border border-white/5'>
                        <HiOutlineDownload className='text-xl' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Certificate