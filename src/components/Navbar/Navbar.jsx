import React from "react";
import logo from '../../assets/icon.png';
import { NavLink } from "react-router";


const Navbar = () => {

    const links = <>
        <nav className="flex flex-col lg:flex-row lg:gap-5 font-light">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/allProperties'>All Properties</NavLink></li>
            <li><NavLink to='/addProperties'>Add Properties</NavLink></li>
            <li><NavLink to='/myProperties'>My Properties</NavLink></li>
            <li><NavLink to='/myRatings'>My Ratings</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
        </nav>
    </>

    return (
        <header className="fixed top-0 inset-x-0 z-50">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 to-transparent"></div>

            <div className="navbar bg-transparent relative text-white max-w-[1000px] mx-auto px-4">

                {/* LEFT: LOGO */}
                <div className="navbar-start flex items-center gap-2">
                    <img src={logo} alt="" className="w-10" />
                </div>

                {/* CENTER: Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white/90 gap-4">
                        {links}
                    </ul>
                </div>

                {/* RIGHT: Mobile Dropdown */}
                <div className="navbar-end lg:hidden">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box w-52 text-gray-800">
                            {links}
                        </ul>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
