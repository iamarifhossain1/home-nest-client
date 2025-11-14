import React, { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import Properties from './Properties';

const AllProperties = () => {

    const totalProperties = useLoaderData() || [];

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const handleSortChange = (event) => {
        const sortValue = event.target.value;

        if (sortValue) {
            searchParams.set('sort', sortValue);
        } else {
            searchParams.delete('sort');
        }

        setSearchParams(searchParams);
    };

    const handleSearch = (event) => {
        event.preventDefault();

        const term = searchTerm.trim();
        if (term) {

            searchParams.set('search', term);
        } else {

            searchParams.delete('search');
        }


        setSearchParams(searchParams);
    };

    const normalizedSearchTerm = searchParams.get('search')?.toLowerCase() || '';

    const filteredProperties = totalProperties.filter(pro => {
        if (!normalizedSearchTerm) return true;

        const nameMatch = pro.propertyName?.toLowerCase().includes(normalizedSearchTerm);
        const locationMatch = pro.location?.toLowerCase().includes(normalizedSearchTerm);
        const typeMatch = pro.type?.toLowerCase().includes(normalizedSearchTerm);

        return nameMatch || locationMatch || typeMatch;
    });

    const currentSort = searchParams.get('sort');
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        switch (currentSort) {
            case 'price-asc':
                return (a.price || 0) - (b.price || 0);
            case 'price-desc':
                return (b.price || 0) - (a.price || 0);
            case 'date-recent':
                return (b._id || '').localeCompare(a._id || '');
            case 'date-old':
                return (a._id || '').localeCompare(b._id || '');
            default:
                return 0;
        }
    });

    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-center text-2xl lg:text-4xl text-gray-700 mt-10'>All Properties</h1>


            <div className='flex flex-col lg:flex-row items-center justify-between mt-12 gap-4'>
                <h1 className='text-xl font-semibold w-full lg:w-auto text-center lg:text-left'>Total Properties: {Array.isArray(sortedProperties) ? sortedProperties.length : 0}</h1>


                <div className='flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start'>
                    <label htmlFor="sort-select" className='font-medium text-gray-700 whitespace-nowrap'>Sort By:</label>
                    <select
                        id="sort-select"
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-[#FA6509] focus:border-[#FA6509] w-full lg:w-auto"
                        onChange={handleSortChange}
                        value={searchParams.get('sort') || ''}
                    >
                        <option value="">Default (Newest)</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="date-recent">Date: Recent to Old</option>
                        <option value="date-old">Date: Old to Recent</option>
                    </select>
                </div>



                <form onSubmit={handleSearch} className='w-full lg:w-auto '>
                    <label className="input flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full">
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
                        <input
                            type="search"
                            required

                            placeholder="Property name, location, or type..."
                            className="outline-none flex-grow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button type="submit" className="hidden"></button>
                    </label>
                </form>
            </div>

            <div className='container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20'>
                {
                    Array.isArray(sortedProperties) && sortedProperties.map((pro) => (
                        <Properties
                            key={pro._id}
                            properties={pro}
                        />
                    ))
                }
                {sortedProperties.length === 0 && normalizedSearchTerm && (
                    <p className="text-center text-xl text-gray-500 col-span-full py-10">
                        No properties found matching "{searchParams.get('search')}"
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllProperties;