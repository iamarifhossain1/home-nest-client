import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

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
            <section className="bg-white h-52">
                <div>

                </div>
            </section>
        </>
    );
};

export default Home;
