import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

const Home = () => {
    return (
        <div className="relative">
            {/* Transparent fixed Navbar (top overlay) */}
            <Navbar />

            {/* Hero slider পুরো স্ক্রিন জুড়ে; navbar উপরে ভাসবে */}
            <HeroSlider />

            {/* নিচে বাকি সেকশনগুলো */}
            <section className="relative z-10 bg-base-100">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-2xl font-semibold">Featured Listings</h2>
                    <p className="text-base-content/70 mt-2">
                        Your next home is just a few clicks away.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
