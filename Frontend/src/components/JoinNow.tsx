import React from 'react'
import { telegram2, whatsapp } from '../assets'

const JoinNow: React.FC = () => {
    return (
        <div className='bg-linear-to-b from-[black] to-[#014001] px-4'>
            
            {/* Centered Container */}
            <div className='max-w-6xl mx-auto'>
                
                {/* Text Section */}
                <div className='text-center py-16 text-white'>
                    <h4 className='text-3xl md:text-4xl font-bold pt-6'>
                        Join 500+ learners already active
                    </h4>

                    <p className='text-lg md:text-xl mt-4 max-w-2xl mx-auto text-white/80'>
                        Guided Day 1–Day 100 roadmap, curated courses, and real projects.
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row justify-center gap-4 pb-16 max-w-xl mx-auto'>
                    
                    <button className='bg-white flex-1 flex gap-2 justify-center items-center py-4 rounded-2xl hover:scale-[1.03] transition'>
                        <img src={whatsapp} alt="" />
                        <p>WhatsApp</p>
                    </button>

                    <button className='bg-white flex-1 flex gap-2 justify-center items-center py-4 rounded-2xl hover:scale-[1.03] transition'>
                        <img src={telegram2} alt="" />
                        <p>Telegram</p>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default JoinNow