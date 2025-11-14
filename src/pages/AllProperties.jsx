import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Properties from './Properties';

const AllProperties = () => {

    const totalProperties = useLoaderData();
    console.log(totalProperties);

    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-center text-2xl lg:text-4xl text-gray-700 mt-10'>All Properties</h1>

            <div className='flex items-center justify-between mt-20'>
                {/* Use the length of the array for the count */}
                <h1 className='text-xl font-semibold'>Total Properties: {totalProperties.length}</h1>

                {/* Search Input */}
                <label className="input flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                    <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                    <input type="search" required placeholder="Search" className="outline-none" />
                </label>
            </div>


            <div className='container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20'>
                {
                    totalProperties.map((pro) => (
                        <Properties
                            key={pro._id}
                            properties={pro}
                        />
                    ))
                }
            </div>

        </div>
    );
};

export default AllProperties;