import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        // সমস্ত অ্যাপ্লিকেশন কন্টেন্টকে আপনার কাস্টম থিম ভ্যারিয়েবল দ্বারা 
        // তৈরি ব্যাকগ্রাউন্ড এবং টেক্সট ক্লাসে র‍্যাপ করা হলো। 
        // `transition-colors duration-300` যোগ করা হলো smooth transitioning-এর জন্য।
        <div className='bg-primary text-primary flex flex-col min-h-screen transition-colors duration-300'>
            <Navbar></Navbar>
            <main className='flex-grow'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Root;