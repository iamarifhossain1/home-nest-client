import React from "react";
import logo from "../../assets/icon.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const links = (
        <>
            <nav className="flex flex-col lg:flex-row">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/allProperties">All Properties</NavLink></li>
                <li><NavLink to="/addProperties">Add Properties</NavLink></li>
                <li><NavLink to="/myProperties">My Properties</NavLink></li>
                <li><NavLink to="/myRatings">My Ratings</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </nav>
        </>
    );

    return (
        <header className="absolute top-0 left-0 w-full z-20 bg-transparent text-white">
            <div className="navbar max-w-[900px] mx-auto px-4 bg-transparent">


                <div className="navbar-start lg:hidden">
                    <div className="dropdown dropdown-start">
                        <label tabIndex={0} className="btn btn-ghost text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box w-52 text-gray-800">
                            {links}
                        </ul>
                    </div>
                </div>


                <div className="navbar-end lg:hidden">
                    <img src={logo} alt="" className="w-10" />
                </div>


                <div className="navbar-start hidden lg:flex">
                    <Link to='/'>< img src={logo} alt="" className="w-10" /></Link>
                </div>


                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5 font-light">
                        {links}
                    </ul>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
