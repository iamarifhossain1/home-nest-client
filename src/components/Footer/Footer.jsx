import React from "react";
import { FaHome, FaFacebookF, FaInstagram, FaLinkedinIn, FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGoogleplay } from "react-icons/si";
import logo from '../../assets/icon.png'

export default function Footer() {
    return (
        <footer className="bg-[#181A20] text-white" id="footer">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-4 pt-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Subscribe Our Newsletter
                    </h2>
                    <p className="mt-2 opacity-80">
                        We don’t send spam so don’t worry.
                    </p>

                    {/* Email + Subscribe */}
                    <div className="mt-6 join join-vertical sm:join-horizontal w-full max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Your email"
                            aria-label="Email address"
                            className="input join-item w-full bg-white text-black placeholder-black/60 border border-white/20"
                        />
                        <button
                            type="button"
                            className="btn join-item w-full sm:w-auto bg-[#ff6b57] text-white border-0 hover:bg-[#ff6b57] no-animation"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Content grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand + contact */}
                    <aside>
                        <div className="flex items-center gap-3">
                            <div className="bg-[#303137] p-2 rounded-lg">
                                <img src={logo} alt="" className="w-8 " />
                            </div>
                            <h3 className="text-lg font-light">Home Nest</h3>
                        </div>

                        <div className="mt-4 space-y-3 text-sm">
                            <div>
                                <div className="font-medium">Address</div>
                                <p className="opacity-80">
                                    789 Dhaka, Gulshan
                                    <br /> Bangladesh.
                                </p>
                            </div>

                            <div>
                                <div className="font-medium">Total Free Customer Care</div>
                                <a href="tel:+088123456789" className="link link-hover text-white">
                                    +(088) 123 456 789
                                </a>
                            </div>

                            <div>
                                <div className="font-medium">Live Support?</div>
                                <a href="mailto:hi@homenest.com" className="link link-hover text-white">
                                    hi@homenest.com
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Popular Search */}
                    <nav>
                        <h4 className="footer-title text-white">Popular Search</h4>
                        <ul className="flex flex-col gap-2">
                            <li><a className="link link-hover text-white">Apartment for Sale</a></li>
                            <li><a className="link link-hover text-white">Apartment for Rent</a></li>
                            <li><a className="link link-hover text-white">Offices for Sale</a></li>
                            <li><a className="link link-hover text-white">Offices for Rent</a></li>
                        </ul>
                    </nav>

                    {/* Quick Links */}
                    <nav>
                        <h4 className="footer-title text-white">Quick Links</h4>
                        <ul className="flex flex-col gap-2">
                            <li><a className="link link-hover text-white">Terms of Use</a></li>
                            <li><a className="link link-hover text-white">Privacy Policy</a></li>
                            <li><a className="link link-hover text-white">Pricing Plans</a></li>
                            <li><a className="link link-hover text-white">Our Services</a></li>
                            <li><a className="link link-hover text-white">Contact</a></li>
                            <li><a className="link link-hover text-white">Careers</a></li>
                            <li><a className="link link-hover text-white">FAQs</a></li>
                        </ul>
                    </nav>

                    {/* Apps */}
                    <div>
                        <h4 className="footer-title text-white">Apps</h4>

                        {/* Apple Store button */}
                        <a
                            className="w-52 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-4 no-animation hover:bg-white/10 cursor-pointer"
                        >
                            <FaApple className="w-7 h-7 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs opacity-80 leading-tight">Download on the</span>
                                <span className="text-sm font-semibold leading-tight">Apple Store</span>
                            </div>
                        </a>

                        {/* Google Play button */}
                        <a
                            className="w-52 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-4 no-animation hover:bg-white/10 cursor-pointer mt-3"
                        >
                            <SiGoogleplay className="w-7 h-7 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs opacity-80 leading-tight">Get it on</span>
                                <span className="text-sm font-semibold leading-tight">Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar with extra py gap */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-white text-center md:text-left">
                        © Home Nest — All rights reserved
                    </p>

                    <div className="flex items-center gap-1">
                        <button className="btn btn-ghost btn-circle no-animation" aria-label="X (Twitter)">
                            <FaXTwitter className="w-5 h-5" />
                        </button>
                        <button className="btn btn-ghost btn-circle no-animation" aria-label="Facebook">
                            <FaFacebookF className="w-5 h-5" />
                        </button>
                        <button className="btn btn-ghost btn-circle no-animation" aria-label="Instagram">
                            <FaInstagram className="w-5 h-5" />
                        </button>
                        <button className="btn btn-ghost btn-circle no-animation" aria-label="LinkedIn">
                            <FaLinkedinIn className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
