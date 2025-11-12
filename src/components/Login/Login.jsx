import React from 'react';
import bg from '../../assets/login-bg.jpg'
import logo from '../../assets/icon.png'
import { Link } from 'react-router';
import { FaEye } from 'react-icons/fa';
const Login = () => {
    return (
        <div className=''>
            <div className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className='flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-52'>
                    <div className=''>
                        <img src={logo} alt="" className='w-14 lg:w-24 mx-auto mt-5 lg:mt-0' />
                        <h1 className='text-white text-2xl lg:text-4xl mt-4 font-medium'>Home Nest</h1>
                    </div>
                    <div>
                        <div className="hero-content flex-col lg:flex-row-reverse" >
                            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                                <div className="card-body lg:p-10">
                                    <div className='lg:py-8 space-y-3'>
                                        <h1 className='text-2xl lg:text-4xl'>Log in</h1>
                                        <p className='text-gray-700'>Enter your credentials and get ready to explore!</p>
                                    </div>
                                    <form className=''>
                                        <fieldset className="fieldset">
                                            <label className="label text-base">Email</label>
                                            <input type="email" className="input" placeholder="Email" name="email" />
                                            <label className="label mt-4 text-base">Password</label>
                                            <div className='flex items-center relative'>
                                                <input type="password" className="input mb-3" placeholder="Password" name="password" />
                                                <FaEye className='absolute top-3.5 right-4' size={15}></FaEye>
                                            </div>
                                            <div><a className="link link-hover">Forgot password?</a></div>
                                            <button className="btn btn-neutral mt-4">Login</button>
                                        </fieldset>
                                    </form>
                                    <button className="btn bg-white text-black border-[#e5e5e5]">
                                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                        Login with Google
                                    </button>
                                    <Link to='/register' className='text-gray-700 mt-3 pb-10 text-center'>Doesn't have an account? <span className='text-blue-600 underline'>Register Now</span></Link>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Login;