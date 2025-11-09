import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// assets (ensure: src/assets/slider1.jpg ... slider6.jpg)
import slide1 from "../../assets/slider1.jpg";
import slide2 from "../../assets/slider2.jpg";
import slide3 from "../../assets/slider3.jpg";
import slide4 from "../../assets/slider4.jpg";
import slide5 from "../../assets/slider5.jpg";
import slide6 from "../../assets/slider6.jpg";
import { Link } from "react-router";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6];

export default function HeroSlider() {
    return (
        <div className="relative">
            {/* Swiper container */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                className="w-full h-screen"
            >
                {slides.map((src, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-screen">
                            {/* Background Image */}
                            <img
                                src={src}
                                alt={`Slide ${i + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex  items-center px-6 md:px-12">
                                <div className="max-w-xl text-white">
                                    <h1 className="text-4xl mx-auto md:text-6xl font-bold leading-tight">
                                        Find Your Dream Home
                                    </h1>
                                    <p className="mt-4 text-lg text-white/85">
                                        Discover homes, apartments and luxury villas in prime areas.
                                    </p>

                                    <div className="mt-6 flex gap-4">

                                        <Link to='/allProperties' className="px-6 py-3 bg-white text-gray-900 rounded-lg shadow hover:bg-gray-100 transition hover:bg-[]">
                                            Browse Listings
                                        </Link>
                                        <button className="px-6 py-3 border border-white text-white rounded-lg cursor-pointer hover:bg-white/20 transition">
                                            Contact Agent
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
    );
}
