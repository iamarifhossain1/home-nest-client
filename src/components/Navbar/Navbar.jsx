import React, { use } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../../assets/icon.png'
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logoutUser, loading } = use(AuthContext);
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/')
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Logout",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);

        }
    }
    if (loading) return null;

    const navLinks = <>
        <nav className="flex flex-col lg:flex-row">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allProperties">All Properties</NavLink></li>
            <li><NavLink to="/addProperties">Add Properties</NavLink></li>
            <li><NavLink to="/myProperties">My Properties</NavLink></li>
            <li><NavLink to="/myRatings">My Ratings</NavLink></li>
            {!user && (
                <li><NavLink to="/register">Register</NavLink></li>
            )}
        </nav>

    </>

    return (
        <div className="navbar bg-[#181A20] text-white lg:px-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>

                <div className='flex items-center gap-3'>
                    <a href='/' className="text-xl"><img src={logo} alt="" className='w-14' /></a>
                    <h1 className='sm:block hidden'>Home Nest</h1>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <button onClick={handleLogout} className="btn bg-[#FA6509] shadow-none border-none text-white px-8 py-4 text-base">Logout</button>
                ) : (

                    <Link to='/login' className="btn bg-[#FA6509] shadow-none border-none text-white px-8 py-4 text-base">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;