import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

import slide1 from "../../assets/slider1.jpg";
import slide2 from "../../assets/slider2.jpg";
import slide3 from "../../assets/slider3.jpg";
import slide4 from "../../assets/slider4.jpg";
import slide5 from "../../assets/slider5.jpg";
import slide6 from "../../assets/slider6.jpg";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6];

export default function HeroSlider() {
    const [active, setActive] = useState(0);

    return (
        <div className="relative">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                className="w-full h-[65vh] md:h-[85vh] lg:h-screen"
                onSlideChange={(swiper) => setActive(swiper.realIndex)}
            >
                {slides.map((src, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-[65vh] md:h-[85vh] lg:h-screen">
                            <img src={src} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40"></div>

                            <div className="relative z-10 h-full flex items-center px-6 md:px-12">
                                <div className={`max-w-xl text-white transition-all duration-700 ${active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                                    <h1 className="text-2xl lg:text-3xl md:text-6xl font-bold leading-tight">
                                        <Typewriter
                                            words={["Find Your Dream Home", "Live Where Comfort Meets Style", "Your Perfect Space Awaits"]}
                                            loop={true}
                                            cursor
                                            cursorStyle="|"
                                            typeSpeed={70}
                                            deleteSpeed={50}
                                            delaySpeed={2000}
                                        />
                                    </h1>

                                    <p className="mt-4 text-base text-white/85 text-justify">
                                        Step into a world of refined living - where every space is thoughtfully shaped to inspire, embrace your
                                        comfort, and feel beautifully your own.
                                    </p>

                                    <div className="mt-6 flex gap-4">
                                        <Link to="/allProperties" className="px-4 lg:px-6 py-3 bg-white text-gray-900 rounded-lg shadow hover:bg-gray-100 transition">
                                            Browse Listings
                                        </Link>
                                        <a href='#footer' className="px-4 lg:px-6 py-3 border border-white text-white rounded-lg hover:bg-white/20 transition">
                                            Contact Agent
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
