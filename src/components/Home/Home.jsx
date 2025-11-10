import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import whyBg from '../../assets/why-banner.png'
import { FaRegHandshake } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

const Home = () => {
    return (
        <>
            <HeroSlider />
            {/* Featured Listing */}
            <section className="bg-[#F7F7F7] z-0">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-2xl lg:text-4xl font-semibold text-center">Featured Listings</h2>
                    <p className="text-base-content/70 mt-2 text-center">
                        Your next home is just a few clicks away.
                    </p>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-10 lg:py-40 container mx-auto">
                <div className="flex flex-col-reverse lg:flex-row lg:items-start justify-center gap-5 lg:gap-20 ">
                    <div>
                        <img src={whyBg} alt="" className="w-full lg:w-96 h-full lg:h-[500px] px-4 flex justify-center lg:px-0 mx-auto" />
                    </div>
                    <div className="px-4">
                        <h1 className="text-4xl font-semibold">Why Choose Us?</h1>
                        <p className="mt-4 text-gray-700">Your dream home deserves honest guidance.</p>

                        <div className="flex items-center mt-5 lg:mt-10 gap-3">
                            <div className="bg-[#F7F7F7] p-3 rounded-full">
                                <FaRegHandshake size={20}></FaRegHandshake>
                            </div>
                            <p className="text-gray-700">Transparent Deals</p>
                        </div>

                        <div className="flex items-center mt-5 gap-3">
                            <div className="bg-[#F7F7F7] p-3 rounded-full">
                                <CiLocationOn size={20}></CiLocationOn>
                            </div>
                            <p className="text-gray-700">Prime Locations</p>
                        </div>

                        <div className="flex items-center mt-5 gap-3">
                            <div className="bg-[#F7F7F7] p-3 rounded-full">
                                <AiOutlineSafetyCertificate size={20}></AiOutlineSafetyCertificate>
                            </div>
                            <p className="text-gray-700">Trust & Support</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-52 text-center mt-5 lg:mt-20">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">4M</h1>
                        <p>Award Winning</p>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">18K</h1>
                        <p>Property Ready</p>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">23M</h1>
                        <p>Happy Customer</p>
                    </div>
                </div>
            </section>

            {/* Help */}
            <section>
                <div>
                    <div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
