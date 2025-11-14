import React, { use } from 'react';
import { motion } from 'framer-motion';
import Properties from './Properties';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 }
    }
};

const API_BASE_URL = 'https://home-nest-server-fp6l8gc6y-arif-hossains-projects-a41d4c7a.vercel.app';

const FeaturedProperties = ({ getFeaturedProperties }) => {
    const propertiesData = use(getFeaturedProperties);
    console.log(propertiesData);


    return (
        <div className='mt-10 mb-5 lg:mt-20 lg:mb-10'>
            <h1 className='text-2xl lg:text-4xl font-semibold text-center text-primary'>
                Featured Listings
            </h1>
            <p className='text-secondary mt-2 text-center mb-5 lg:mb-0'>
                Your next home is just a few clicks away.
            </p>

            {/* Parent grid with motion */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 md:grid-cols-3 justify-center container mx-auto lg:mt-10 gap-10  px-4 lg:px-0'
            >
                {
                    propertiesData.map(properties => <Properties key={properties._id} properties={properties}></Properties>)
                }
            </motion.div>
        </div>
    );
};

export default FeaturedProperties;
