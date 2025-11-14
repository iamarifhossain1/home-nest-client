import React from 'react';
import { FaBangladeshiTakaSign, FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Properties = ({ properties }) => {
    const { _id, propertyName, category, shortDescription, location, price, thumbnail } = properties;

    return (

        <Link to={`/propertiesDetails/${_id}`} className="w-96">
            <motion.article
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}

                whileHover={{ scale: 1.04, y: -6, boxShadow: '0 15px 30px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
                <div
                    className="
                        card bg-base-100 w-full h-full shadow-sm
                        rounded-lg overflow-hidden
                        cursor-pointer
                        flex flex-col
                    "
                    style={{ minHeight: 360 }}
                >
                    <figure className="h-52 w-full overflow-hidden flex-shrink-0">
                        <img
                            src={thumbnail || '/placeholder-property.jpg'}
                            alt={propertyName || 'Property'}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = '/placeholder-property.jpg')}
                        />
                    </figure>

                    <div className="card-body flex-1 p-4 flex flex-col justify-between gap-3">
                        <div>
                            <h2 className="card-title text-lg font-medium truncate">{propertyName}</h2>

                            <p
                                className="text-sm text-gray-600 mt-2 overflow-hidden"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {shortDescription || 'No description provided.'}
                            </p>

                            <div className="mt-3 text-xs text-gray-500 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <FaLocationDot />
                                    <span className="truncate max-w-[10rem]">{location}</span>
                                </div>
                                <div className="text-right px-2 py-0.5 rounded-md bg-orange-50 text-orange-600">
                                    {category}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 text-sm font-semibold">
                                <FaBangladeshiTakaSign />
                                <span>{formatPrice(price)}</span>
                            </div>

                            <Link to={`/propertiesDetails/${_id}`}
                                className="btn px-3 py-1 rounded-md bg-[#FA6509] text-white hover:bg-[#e85b00] transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>

                </div>
            </motion.article>
        </Link>
    );
};

export default Properties;

function formatPrice(price) {
    if (price == null) return 'Price on request';
    if (typeof price === 'number') return price.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ৳';
    return price;
}