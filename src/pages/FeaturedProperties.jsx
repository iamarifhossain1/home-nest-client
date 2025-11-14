import React, { use } from 'react';
import { motion } from 'framer-motion';
import Properties from './Properties';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 } // প্রতি কার্ড 0.08 সেকেন্ড পর animate হবে
    }
};

const FeaturedProperties = ({ getFeaturedProperties }) => {
    const featuredPropertiesData = use(getFeaturedProperties);

    return (
        <div className='mt-10 mb-5 lg:mt-20 lg:mb-10'>
            <h1 className='text-2xl lg:text-4xl font-semibold text-center text-primary'>
                Featured Listings
            </h1>
            <p className='text-secondary mt-2 text-center'>
                Your next home is just a few clicks away.
            </p>

            {/* Parent grid with motion */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 md:grid-cols-3 container mx-auto lg:mt-10 gap-10 items-stretch'
            >
                {featuredPropertiesData.map(property => (
                    <Properties key={property._id} property={property} />
                ))}
            </motion.div>
        </div>
    );
};

export default FeaturedProperties;
