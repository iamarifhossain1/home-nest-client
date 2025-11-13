import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useMatches } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Root = () => {
    const matches = useMatches();
    const hideLayout = matches.some(match => match.handle && match.handle.hideLayout);

    return (
        <div className='bg-primary text-primary flex flex-col min-h-screen transition-colors duration-300'>
            {!hideLayout && <Navbar />}

            <main className='flex-grow'>
                <Outlet />
            </main>

            {!hideLayout && <Footer />}
        </div>
    );
};

export default Root;
