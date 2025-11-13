import React, { useState, useEffect } from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import whyBg from "../../assets/why-banner.png";
import { FaRegHandshake } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import buy from "../../assets/buy.png";
import sell from "../../assets/sell.png";
import rent from "../../assets/rent.png";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import houses from '../../assets/houses.png'
import apartment from '../../assets/apatments.png'
import office from '../../assets/office.png'
import villa from '../../assets/villa.png'
import townhome from '../../assets/townhome.png'


const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const floatCard = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
    hover: { y: -4, scale: 1.01, transition: { duration: 0.18 } },
};

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const handleLoaded = () => {
            setLoading(false);
        };


        const fallback = setTimeout(() => {
            setLoading(false);
        }, 3000); // 

        if (document.readyState === "complete") {

            setLoading(false);
        } else {
            window.addEventListener("load", handleLoaded);
        }

        return () => {
            window.removeEventListener("load", handleLoaded);
            clearTimeout(fallback);
        };
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <HeroSlider />

            {/* Featured Listing */}

            <section className="bg-secondary-section z-0">
                <div className="container mx-auto px-4 py-16">
                    <motion.h2

                        className="text-2xl lg:text-4xl font-semibold text-center text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6 }}
                    >
                        Featured Listings
                    </motion.h2>
                    <motion.p

                        className="text-secondary mt-2 text-center"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                    >
                        Your next home is just a few clicks away.
                    </motion.p>
                </div>
            </section>

            {/* Why Choose Us */}

            <section className="bg-primary py-10 lg:py-40 container mx-auto">
                <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-center gap-5 lg:gap-20 ">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img src={whyBg} alt="why" className="w-full lg:w-96 h-full lg:h-[500px] px-4 flex justify-center lg:px-0 mx-auto rounded-2xl shadow" />
                    </motion.div>

                    <motion.div className="px-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>

                        <motion.h1 variants={fadeUp} className="text-4xl font-semibold text-primary">Why Choose Us?</motion.h1>

                        <motion.p variants={fadeUp} className="mt-4 text-secondary">Your dream home deserves honest guidance.</motion.p>

                        <motion.div variants={fadeUp} className="flex items-center mt-5 lg:mt-10 gap-3">

                            <div className="bg-icon-circle p-3 rounded-full text-primary"><FaRegHandshake size={20} /></div>
                            <p className="text-secondary">Transparent Deals</p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex items-center mt-5 gap-3">
                            <div className="bg-icon-circle p-3 rounded-full text-primary"><CiLocationOn size={20} /></div>
                            <p className="text-secondary">Prime Locations</p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex items-center mt-5 gap-3">
                            <div className="bg-icon-circle p-3 rounded-full text-primary"><AiOutlineSafetyCertificate size={20} /></div>
                            <p className="text-secondary">Trust & Support</p>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-52 text-center mt-5 lg:mt-20"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                >
                    {[{ n: "4M", t: "Award Winning" }, { n: "18K", t: "Property Ready" }, { n: "23M", t: "Happy Customer" }].map((s, i) => (
                        <motion.div key={i} variants={fadeUp} className="space-y-2">

                            <h1 className="text-4xl font-bold text-primary">{s.n}</h1>

                            <p className="text-secondary">{s.t}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Explore Types */}
            <section className="container mx-auto mb-10 lg:mb-28">
                <motion.h1

                    className="text-center text-primary text-2xl lg:text-4xl font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6 }}
                >
                    Explore Apartment Types
                </motion.h1>

                <motion.div
                    className="flex flex-col lg:flex-row justify-center gap-10 mt-5 lg:mt-14 items-center"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                >

                    {[
                        { title: "Houses", properties: 7, image: houses },
                        { title: "Apartments", properties: 3, image: apartment },
                        { title: "Office", properties: 4, image: office },
                        { title: "Villa", properties: 4, image: villa },
                        { title: "Town Home", properties: 2, image: townhome },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
                            className="cursor-pointer"
                        >

                            <div className="card card-bg w-60 shadow-lg">
                                <figure>
                                    <img className="w-72" src={item.image} alt="" />
                                </figure>
                                <div className="card-body">

                                    <h2 className="card-title text-primary">{item.title}</h2>

                                    <p className="text-secondary">{item.properties} Properties</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>


            {/* How Home Nest Help */}
            <section>
                <div className="mb-20">
                    <motion.h1
                        className="text-2xl lg:text-4xl text-center font-semibold text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.6 }}
                    >
                        See how <span className="text-[#FA6509]">Home Nest</span> can help
                    </motion.h1>

                    <div className="flex flex-col lg:flex-row items-center justify-center mt-5 lg:mt-20 gap-5 lg:gap-28">

                        <motion.div className="card-bg rounded-xl space-y-3 p-10 shadow-lg shadow-[var(--color-shadow-light)]" variants={floatCard} initial="hidden" whileInView="show" whileHover="hover" viewport={{ once: true, amount: 0.35 }}>

                            <img src={buy} alt="buy" className="w-16 mx-auto dark:filter dark:brightness-[2]" />
                            <h3 className="font-semibold text-lg text-center text-primary">Buy a property</h3>
                            <p className="text-secondary text-center">Explore trusted homes and choose the <br /> one that fits your lifestyle.</p>
                            <div className="text-center mt-5">
                                <Link to='/allProperties'>
                                    <button className="border rounded-xl py-3 px-6 border-amber-500 bg-transparent hover:bg-amber-50 dark:hover:bg-[#333333] transition text-primary">
                                        Find a home <GoArrowUpRight size={18} className="inline -mt-1" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>


                        <motion.div className="card-bg shadow-xl shadow-[var(--color-shadow-light)] rounded-xl space-y-3 p-10" variants={floatCard} initial="hidden" whileInView="show" whileHover="hover" viewport={{ once: true, amount: 0.35 }}>

                            <img src={sell} alt="sell" className="w-16 mx-auto dark:filter dark:brightness-[2]" />
                            <h3 className="font-semibold text-lg text-center text-primary">Sell a property</h3>
                            <p className="text-secondary text-center">List your property with confidence and <br /> connect with genuine buyers easily.</p>
                            <div className="text-center mt-5">
                                <Link to='/addProperties'>
                                    <button className="rounded-xl py-3 px-6 bg-[#FA6509] text-white hover:brightness-95 transition">
                                        Place an ad <GoArrowUpRight size={18} className="inline -mt-1" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>


                        <motion.div className="card-bg rounded-xl space-y-3 p-10 shadow-lg shadow-[var(--color-shadow-light)]" variants={floatCard} initial="hidden" whileInView="show" whileHover="hover" viewport={{ once: true, amount: 0.35 }}>

                            <img src={rent} alt="rent" className="w-16 mx-auto dark:filter dark:brightness-[2]" />
                            <h3 className="font-semibold text-lg text-center text-primary">Rent a property</h3>
                            <p className="text-secondary text-center">Explore trusted homes and choose the <br /> one that fits your lifestyle.</p>
                            <div className="text-center mt-5">
                                <Link to='/allProperties'>
                                    <button className="border rounded-xl py-3 px-6 border-amber-500 bg-transparent hover:bg-amber-50 dark:hover:bg-[#333333] transition text-primary">
                                        Find a home <GoArrowUpRight size={18} className="inline -mt-1" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;