// import blockchainBuzzwords from "../data/blockchainBuzzwords";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const BuzzwordFloat = () => {
//   const [positions, setPositions] = useState<number[][]>([]);

//   useEffect(() => {
//     const randomPositions = blockchainBuzzwords.map(() => [
//       Math.random() * 100, // left%
//       Math.random() * 100, // top% within 20vh container
//     ]);
//     setPositions(randomPositions);
//   }, []);

//   return (
//     <div className="relative w-full h-[40vh] overflow-visible">
//       {blockchainBuzzwords.map((word, i) => (
//         <motion.div
//           key={i}
//           initial={{ y: 0, rotate: Math.random() * 20 -20 }}
//           animate={{ y: [0, -5, 5, 0]}}
//           transition={{
//             repeat: Infinity,
//             duration: 4 + Math.random() * 2,
//             ease: "easeInOut",
//           }}
//           className="absolute px-4 py-2 text-sm cursor-pointer hover:bg-white
//            hover:text-black duration-200 ease-in-out transiion 
//            font-medium text-gray-300 bg-[#1e1e1e] rounded-full 
//            shadow-md shadow-blue-main"
//           style={{
//             top: `${positions[i]?.[1]}%`,
//             left: `${positions[i]?.[0]}%`,
//           }}
//         >
//           {word}
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default BuzzwordFloat;


import blockchainBuzzwords from "../data/blockchainBuzzwords";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface BuzzwordOffset {
    x: number; 
    y: number;
    rotate: number;
}

const BuzzwordFloat = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const [gridConfig, setGridConfig] = useState<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
    const [wordOffsets, setWordOffsets] = useState<{ [key: string]: BuzzwordOffset }>({});

    // 1. Measure Container Dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // 2. Determine Grid Configuration and Random Initial Offsets for each word
    useEffect(() => {
        if (containerDimensions.width === 0 || containerDimensions.height === 0) return;

        const numBuzzwords = blockchainBuzzwords.length;
        const containerWidth = containerDimensions.width;
        // const containerHeight = containerDimensions.height;


        const avgItemWidth = 120; 
        // const avgItemHeight = 50; 

        const cols = Math.max(1, Math.min(Math.floor(containerWidth / avgItemWidth), numBuzzwords));
        const rows = Math.max(1, Math.ceil(numBuzzwords / cols));

        setGridConfig({ cols, rows });

        // Generate random offsets and rotations for each word
        const newOffsets: { [key: string]: BuzzwordOffset } = {};
        blockchainBuzzwords.forEach(word => {
           
            const initialOffsetX = Math.random() * 50 - 25; // -25% to +25%
            const initialOffsetY = Math.random() * 50 - 25; // -25% to +25%
            const initialRotate = Math.random() * 40 - 20;   // -20 to +20 degrees

            newOffsets[word] = {
                x: initialOffsetX,
                y: initialOffsetY,
                rotate: initialRotate,
            };
        });
        setWordOffsets(newOffsets);

    }, [containerDimensions, blockchainBuzzwords.length]);


    const floatVariant = {
        animate: (offset: BuzzwordOffset) => ({
            // Animate X and Y relative to their initial offsets
            x: [offset.x, offset.x + (Math.random() * 10 - 5), offset.x - (Math.random() * 10 - 5), offset.x],
            y: [offset.y, offset.y - (Math.random() * 10 - 5), offset.y + (Math.random() * 10 - 5), offset.y],
            // Animate rotation subtly
            rotate: [offset.rotate, offset.rotate + (Math.random() * 5 - 2.5), offset.rotate],
            transition: {
                x: {
                    repeat: Infinity,
                    duration: 5 + Math.random() * 3, 
                    ease: "easeInOut",
                    repeatType: "reverse",
                },
                y: {
                    repeat: Infinity,
                    duration: 5 + Math.random() * 3, 
                    ease: "easeInOut",
                    repeatType: "reverse",
                },
                rotate: {
                    repeat: Infinity,
                    duration: 10 + Math.random() * 5, 
                    ease: "linear",
                    repeatType: "reverse",
                },
                delay: Math.random() * 2 
            }
        })
    };


    return (
        <div
            ref={containerRef}
            className="relative w-full h-[40vh]"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridConfig.rows}, minmax(0, 1fr))`,
         
                visibility: gridConfig.cols === 0 || gridConfig.rows === 0 ? 'hidden' : 'visible'
            }}
        >
            
            {gridConfig.cols > 0 && gridConfig.rows > 0 && blockchainBuzzwords.map((word, i) => {
                const offset = wordOffsets[word];
                if (!offset) return null; 

                return (
                 
                    <motion.div
                        key={word}
                        className="relative flex items-center justify-center p-1" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: i * 0.05 }} 
                    >
                        <motion.button
                            className="absolute px-4 py-2 text-sm cursor-pointer
                                       hover:bg-white hover:text-black duration-200 ease-in-out transition
                                       font-medium text-gray-300 bg-[#1e1e1e] rounded-full
                                       backdrop-blur-sm shadow-md shadow-blue-main whitespace-nowrap"
                          
                            initial={{
                                x: `${offset.x}%`,
                                y: `${offset.y}%`,
                                rotate: offset.rotate,
                            }}
                          
                            variants={floatVariant}
                            custom={offset} 
                            animate="animate"
                            whileHover={{ scale: 1.05 }}
                        >
                            {word}
                        </motion.button>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BuzzwordFloat;