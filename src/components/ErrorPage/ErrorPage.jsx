import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                <h1 className="text-7xl font-bold text-gray-800">404</h1>
                <p className="text-gray-600 mt-3">The page you are looking for does not exist.</p>

                <Link
                    to="/"
                    className="mt-6 px-6 py-3 bg-[#FA6509] text-white rounded-xl hover:brightness-95 transition">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;