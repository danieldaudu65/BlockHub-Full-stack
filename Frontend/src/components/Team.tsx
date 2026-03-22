import { derik, jesusBabe, precious, rosie, x } from '../assets';
import React from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const team = [
    {
      image: derik,
      name: 'Captain BlockHub',
      position: 'Strategic Overlord',
      p2: 'Team Lead',
      x: 'https://x.com/derikwebx'
    },
    {
      image: precious,
      name: 'Miss BlockHub',
      position: 'Chaos Coordinator',
      p2: 'Task Slayer',
      x: 'https://x.com/precious'
    },
    {
      image: jesusBabe,
      name: 'Jesus Babe',
      position: 'Ambassador Extraordinaire',
      p2: 'Hype Captain',
      x: 'https://x.com/jesusbabe'
    },
    {
      image: rosie,
      name: 'Rosie Drift',
      position: 'Mouth of BlockHub',
      p2: 'Vibe Controller',
      x: 'https://x.com/rosie'
    },
  ];





  return (
    <div className='py-12 px-4 w-full lg:px-40 text-white bg-black flex flex-col lg:flex-row items-start lg:items-start gap-12 lg:gap-20'>

      {/* Left Content */}
      <div className='flex flex-col lg:w-[80%] gap-4'>
        <h1 className='lg:text-5xl md:text-4xl text-xl font-semibold'>
          Meet the experts shaping the blockchain innovation.
        </h1>
        <p className='text-stone-400 text-sm md:text-base'>
          The great minds behind our work
        </p>
      </div>



      {/* Right Team Members */}
      <div className='flex flex-wrap lg:justify-end justify-center gap-8 lg:gap-10 lg:w-2/3 w-full'>
        {team.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className='flex flex-col items-center justify-center gap-2 w-40 sm:w-44 md:w-48 lg:w-56'
          >
            <img
              src={t.image}
              alt={t.name}
              className='rounded-xl w-28 lg:w-full h-28 lg:h-full object-cover'
            />
            <div className="flex items-center gap-2">

              <a
                href={t.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white font-semibold text-lg md:text-xl  transition"
              >
                <p className='text-sm lg:text-[16px]'>{t.name}</p>


                <img
                  src={x}
                  alt="X profile"
                  className="w-2 h-2 lg:w-4 lg:h-4 invert brightness-0 contrast-200 hover:scale-110 transition"
                />

              </a>

            </div>
            <p className='text-stone-400 text-sm md:text-base text-center'>
              {t.position}
            </p>
            <p className='text-stone-400 text-sm md:text-base text-center'>
              {t.p2}
            </p>
          </motion.div>

        ))}
      </div>
    </div>
  );
};

export default Team;
