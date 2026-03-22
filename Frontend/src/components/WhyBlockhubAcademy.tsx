import React, { useEffect, useState } from "react";
import { wba } from "../data/WhyBlockhub";
import { eclip2 } from "../assets";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WhyBlockhubAcademy: React.FC = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    infinite: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                },
            },
        ],
    };
    const Card = ({ item }: any) => (
        <div className="px-2">
            <div className="bg-gradient-to-b rounded-xl relative p-3.5 from-[#00ff0052] to-black">
                <img
                    src={eclip2}
                    className="absolute top-0 left-0 rounded-tl-xl rounded-tr-xl -z-10"
                    alt=""
                />

                <div className="bg-black rounded-xl min-h-[400px] border border-white/10 p-5 flex flex-col justify-between hover:shadow-lg hover:scale-[1.03] transition-transform duration-300">

                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full mb-4 rounded-md"
                    />

                    <div className="mt-3 text-left">
                        <h4 className="font-semibold text-xl mb-2">
                            {item.title}
                        </h4>

                        <p className="text-white/40 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );

    return (
        <div className="text-white text-center px-4 py-16 bg-black">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
                Why Blockhub Academy?
            </h3>

            <p className="text-gray-400 mb-12 max-w-2xl mx-auto md:text-lg">
                Discover exciting Web3 opportunities, apply for jobs, and grow your network in one place.
            </p>

            <div className="max-w-7xl mx-auto">

                {/* ✅ Desktop → Flex/Grid */}
                {isDesktop ? (
                    <div className="grid grid-cols-3 xl:grid-cols-4 gap-2">
                        {wba.map((item, index) => (
                            <Card key={index} item={item} />
                        ))}
                    </div>
                ) : (
                    /* ✅ Mobile → Slider */
                    <Slider {...settings}>
                        {wba.map((item, index) => (
                            <Card key={index} item={item} />
                        ))}
                    </Slider>
                )}

            </div>
        </div>
    );
};

export default WhyBlockhubAcademy;