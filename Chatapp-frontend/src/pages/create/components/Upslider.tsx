import {  post, share } from '../../../assets';
import { Img as Image } from 'react-image';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UpsliderProps {
    onClose: () => void;
}

const Upslider: React.FC<UpsliderProps> = ({ onClose }) => {

    const _create = [
        {
            link: 'post',
            label: "Post Job",
            image: post,
            desc: "Post freelance gigs, bounties, or full-time roles."
        },
        // {
        //     link: 'host',
        //     label: "Host an event",
        //     image: host,
        //     desc: "Share meetups, X Spaces, or community calls."
        // },
        {
            link: 'share',
            label: "Share a Project",
            image: share,
            desc: "Show what you’re building or need contributors for your latest idea."
        },
    ]

    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end">
            <div
                className="absolute inset-0 bg-[#0000003d] backdrop-blur-[5px]  bg-opacity-50"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-[#1F2227] p-6 rounded-t-3xl z-50 transition-all duration-300 animate-slideUp">
                <div className='mb-6'>

                    <h2 className='text-[20px] font-semibold'>Create Your Post</h2>
                    <p className='text-[14px] text-[#A4A6AA]'>Share a job , idea , or opinion</p>
                </div>
                <div className="text-white space-y-4">
                    {
                        _create.map((c, index) => (
                            <button 
                            key={index} 
                            className="w-full px-8 py-6 spac text-left h-[1 bg-[#181A1D] p-3 rounded-2xl cursor-pointer"
                            onClick={ () => navigate(`/create/${c.link}`)}
                            >
                                <Image src={c.image} className='w-10 mb-3' alt='' />
                                <h2 className='font-semibold text-[#EBECED]'>{c.label}</h2>
                                <p className='text-[#A4A6AA] text-sm'>{c.desc}</p>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Upslider;
