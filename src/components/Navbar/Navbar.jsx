// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon.png';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';
import light from '../../assets/light.png'
import light2 from '../../assets/light2.png'


const Navbar = () => {
    const { user, logoutUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 🌙 থিম স্টেট এবং টগল লজিক
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    useEffect(() => {
        const html = document.querySelector('html');
        // DaisyUI এবং আপনার কাস্টম CSS, দুটির জন্যই লজিক:
        html.setAttribute("data-theme", theme); // DaisyUI এর জন্য

        if (theme === 'dark') {
            html.classList.add('dark-theme'); // আপনার কাস্টম Dark Theme ক্লাস
        } else {
            html.classList.remove('dark-theme');
        }

        localStorage.setItem("theme", theme);
    }, [theme])

    const handleThemeToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    // 🌙 থিম লজিক শেষ

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/');
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Successfully Logout',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
        }
    };

    // আপনার নাম ফরম্যাটিং ফাংশনটি অপরিবর্তিত রাখা হলো
    const formatName = (rawName) => {
        if (!rawName) return 'User';
        const name = rawName.toLowerCase();

        if (name.includes('.')) {
            return name
                .split('.')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
        }

        const surnames = [
            'ahmed', 'hossain', 'hasan', 'khan', 'islam', 'rahman', 'rahim', 'hasan', 'hassan',
            'tanvir', 'sarker', 'miah', 'mia', 'karim', 'nazmul', 'shakil', 'sultana', 'sultan', 'tanvirhasan'
        ];
        surnames.sort((a, b) => b.length - a.length);
        for (const s of surnames) {
            const idx = name.indexOf(s);
            if (idx > 0) {
                const first = name.slice(0, idx);
                const last = name.slice(idx);
                const cap = (str) => str.split(/[\.\-_]/).map(w => w ? w.charAt(0).toUpperCase() + w.slice(1) : '').join(' ');
                return `${cap(first)} ${cap(last)}`.trim();
            }
        }


        const vowels = ['a', 'e', 'i', 'o', 'u'];
        let splitIndex = -1;
        for (let i = 3; i < Math.min(name.length - 2, 8); i++) {
            if (vowels.includes(name[i])) { splitIndex = i; break; }
        }
        if (splitIndex === -1) splitIndex = Math.floor(name.length / 2);
        const first = name.slice(0, splitIndex);
        const last = name.slice(splitIndex);
        const capWord = (w) => w.charAt(0).toUpperCase() + w.slice(1);
        return `${capWord(first)} ${capWord(last)}`.trim();
    };


    const navLinks = (
        <>
            <nav className="flex flex-col lg:flex-row">
                {/* NavLink গুলি স্বয়ংক্রিয়ভাবে text-primary কালার পাবে root থেকে */}
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/allProperties">All Properties</NavLink></li>
                <li><NavLink to="/addProperties">Add Properties</NavLink></li>
                <li><NavLink to="/myProperties">My Properties</NavLink></li>
                <li><NavLink to="/myRatings">My Ratings</NavLink></li>
                {!user && (<li><NavLink to="/register">Register</NavLink></li>)}
            </nav>

        </>
    );

    return (
        // 👇 Navbar ব্যাকগ্রাউন্ড এবং টেক্সট কালার পরিবর্তন করা হয়েছে
        <div className="navbar bg-secondary-section text-primary lg:px-40 transition-colors duration-300 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">

                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>


                    <ul
                        tabIndex={0}
                        // 👇 ড্রপডাউন মেনু ব্যাকগ্রাউন্ড এবং টেক্সট কালার পরিবর্তন করা হয়েছে
                        className="menu menu-sm dropdown-content card-bg text-primary rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>

                <div className="flex items-center gap-3">
                    <a href="/" className="text-xl"><img src={logo} alt="" className="w-14" /></a>
                    <h1 className="sm:block hidden">Home Nest</h1>
                </div>
            </div>



            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>

            </div>



            <div className="navbar-end flex gap-10">

                <button
                    // 👇 onClick ফাংশনটি handleThemeToggle ব্যবহার করবে
                    onClick={handleThemeToggle}
                    className="p-2 rounded-md cursor-pointer sm:block hidden"
                    title="Toggle Theme"
                >
                    {theme === "light" ? (
                        <img src={light2} alt="light" className="w-6 h-6" />
                    ) : (
                        // Dark mode-এ আইকনের রং উজ্জ্বল করার জন্য
                        <img src={light} alt="dark" className="w-6 h-6 brightness-150" />
                    )}
                </button>

                {loading ? (

                    <div className="w-40 h-10 rounded-md bg-transparent" />
                ) : (
                    <>
                        {user ? (

                            <div className="relative bg-transparent" ref={dropdownRef}>
                                <img
                                    src={user.photoURL || `https://i.ibb.co.com/4RHM1zLq/avatar.png${encodeURIComponent(user.displayName || user.email || "User")}`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-400"
                                    onClick={() => setOpen(!open)}
                                />

                                {open && (
                                    // 👇 ইউজার ড্রপডাউন ব্যাকগ্রাউন্ড এবং টেক্সট কালার পরিবর্তন করা হয়েছে
                                    <div className="absolute right-0 mt-2 w-80 lg:w-96 card-bg text-primary rounded-md shadow-lg z-50">
                                        <div className="p-4 border-b border-[var(--color-text-secondary)]">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.photoURL || `https://i.ibb.co.com/4RHM1zLq/avatar.png${encodeURIComponent(user.displayName || user.email || "User")}`}
                                                    alt="avatar"
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="font-semibold">
                                                        {user.displayName || formatName(user.email?.split("@")[0])}
                                                    </div>
                                                    {/* text-secondary ব্যবহার করা হয়েছে */}
                                                    <div className="text-sm text-secondary">{user.email || "No email"}</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="p-2">
                                            <button
                                                onClick={() => { setOpen(false); handleLogout(); }}
                                                // Dark mode-এ hover কালার ঠিক করা হয়েছে
                                                className="w-full text-left px-3 py-2 mt-1 rounded hover:bg-secondary-section"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>


                        ) : (
                            <Link to="/login" className="btn bg-[#FA6509] shadow-none border-none text-white px-4 lg:px-8 lg:py-4 text-base">Login</Link>
                        )}

                    </>
                )}


            </div>
        </div>
    );
};

export default Navbar;