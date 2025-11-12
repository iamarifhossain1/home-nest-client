import React from 'react';

const AllProperties = () => {
    return (
        <div className='container mx-auto '>
            <h1 className='text-center mt-10'>Heading</h1>
            <div className='flex items-center justify-between mt-20'>
                <h1>All Propertise: 20</h1>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" required placeholder="Search" />
                </label>
            </div>

        </div>
    );
};

export default AllProperties;